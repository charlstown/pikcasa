import json
import traceback
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def safe_float(value, default=0.0) -> float:
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def filter_is_kpick(columns: list, rows: list) -> tuple[dict, list]:
    """
    Filtra las columnas que tienen isKpick en true y weight > 0
    """
    # Filtralos campos que tienen isKpick en true y weight > 0
    kpick_columns = [col for col in columns if col.get("isKpick", True) and col.get("weight", 0) > 0]

    # Genera un diccionario: clave=field
    kpick_columns = {col['field']: {k: v for k, v in col.items() if k != 'field'} for col in kpick_columns}

    # Filtrar los campos de las filas que tienen isKpick en true y weight > 0
    kpick_fields = kpick_columns.keys()
    kpick_rows = [
        {k: v for k, v in row.items() if k in kpick_fields or k == "id"}
        for row in rows
    ]
    return kpick_columns, kpick_rows

def format_input(rows: list, columns: dict) -> list:
    """
    Formatea los campos numéricos de las filas y convierte todas las variables a numericas.
    Convierte a float si dataType=numeric, y int si dataType=category.
    """
    for row in rows:
        for k, v in row.items():
            if k in columns:
                col = columns[k]
                if col.get("dataType") == "numeric":
                    try:
                        row[k] = float(v)
                    except (TypeError, ValueError):
                        row[k] = 0.0  # o None según convenga
    return rows

def get_kpick(kpick_columns: dict, normalized_rows: list) -> dict:
    """
    Calcula el KPI ponderado para cada fila usando los valores ya normalizados (entre 0 y 1).
    Devuelve un diccionario {id: kpi} donde el kpi es un entero entre 0 y 100.
    """
    kpi_dict = {}
    for row in normalized_rows:
        weighted_sum = 0.0
        weight_sum = 0.0
        for col, props in kpick_columns.items():
            weight = props.get("weight", 0)
            if weight == 0:
                continue
            val = row.get(col)
            if val is None:
                continue
            try:
                val = float(val)
            except (TypeError, ValueError):
                continue
            weighted_sum += val * weight
            weight_sum += weight
        kpi_normalized = weighted_sum / weight_sum if weight_sum > 0 else 0.0
        kpi_int = int(round(kpi_normalized * 100))
        row_id = row.get("id")
        if row_id is not None:
            kpi_dict[row_id] = kpi_int
    return kpi_dict

def normalization(kpickColumns: dict, kpickRows: list) -> list:
    """
    Normaliza todos los campos de las filas entre 0 y 1 según su tipo y el campo ascending.
    - Para 'category': distribuye los valores entre 0 y 1 según el orden de la lista de opciones y ascending.
    - Para 'numeric': normaliza min-max entre 0 y 1, considerando ascending (si False, invierte la escala).
    Devuelve una nueva lista de filas con los valores normalizados.
    """
    # Preparar normalización para cada campo
    normalization_info = {}
    for field, col in kpickColumns.items():
        data_type = col.get("dataType")
        ascending = col.get("ascending", True)
        if ascending is None:
            ascending = True
        if data_type == "category" and "options" in col:
            options = col["options"]
            n = len(options)
            if n > 1:
                if ascending:
                    value_map = {opt: i / (n - 1) for i, opt in enumerate(options)}
                else:
                    value_map = {opt: 1 - (i / (n - 1)) for i, opt in enumerate(options)}
            else:
                value_map = {opt: 0.0 for opt in options}
            normalization_info[field] = ("category", value_map)
        elif data_type == "numeric":
            values = [row[field] for row in kpickRows if field in row and isinstance(row[field], (int, float))]
            if values:
                min_val = min(values)
                max_val = max(values)
                normalization_info[field] = ("numeric", min_val, max_val, ascending)
    # Normalizar filas
    normalized_rows = []
    for row in kpickRows:
        new_row = row.copy()
        for field, info in normalization_info.items():
            if field in new_row:
                if info[0] == "category":
                    value_map = info[1]
                    new_row[field] = value_map.get(new_row[field], 0.0)
                elif info[0] == "numeric":
                    min_val, max_val, ascending = info[1], info[2], info[3]
                    if ascending is None:
                        ascending = True
                    val = new_row[field]
                    if max_val > min_val:
                        norm = (val - min_val) / (max_val - min_val)
                    else:
                        norm = 0.0
                    if not ascending:
                        norm = 1.0 - norm
                    new_row[field] = norm
        normalized_rows.append(new_row)
    return normalized_rows

def category_to_numeric(kpickColumns: dict, kpickRows: list) -> list:
    """
    Convierte los valores categóricos de las filas a valores numéricos según las opciones y el orden.
    - kpickColumns: diccionario de columnas (field -> propiedades).
    - kpickRows: lista de diccionarios, cada uno representa una fila de datos.
    Devuelve una nueva lista de filas con los valores categóricos convertidos a numéricos.
    """
    # Construir un mapa de field -> (options, ascending)
    category_map = {}
    for field, col in kpickColumns.items():
        if col.get("dataType") == "category" and "options" in col:
            options = col["options"]
            ascending = col.get("ascending", True)
            if ascending:
                value_map = {opt: idx for idx, opt in enumerate(options)}
            else:
                value_map = {opt: idx for idx, opt in enumerate(reversed(options))}
            category_map[field] = value_map

    # Transformar las filas
    transformed_rows = []
    for row in kpickRows:
        new_row = row.copy()
        for field, value_map in category_map.items():
            if field in new_row:
                new_row[field] = value_map.get(new_row[field], 0)  # Si no está, poner 0 por defecto
        transformed_rows.append(new_row)

    return transformed_rows

def lambda_handler(event: dict, context) -> dict:
    logger.info("Lambda iniciada")
    try:
        if "body" in event:
            data = json.loads(event["body"])
        else:
            # Evento directo (por ejemplo test en consola Lambda)
            data = event

        rows = data.get("rows", [])
        columns = data.get("columns", [])
        logger.info(f"Datos recibidos: {rows}, {columns}")

        # Selecciona solo los campos que tienen isKpick en true y weight > 0
        kpick_columns, kpick_rows = filter_is_kpick(columns=columns, rows=rows)

        # Convertir campos numéricos para evitar errores
        kpick_rows = format_input(rows=kpick_rows, columns=kpick_columns)

        # Convierte los campos categóricos a valores numéricos
        numeric_rows = normalization(kpick_columns, kpick_rows)

        # Añadir nueva función aqui
        kpi_dict = get_kpick(kpick_columns=kpick_columns, normalized_rows=numeric_rows)
        # Asignar el KPI a cada fila de rows usando el id
        for row in rows:
            row_id = row.get("id")
            if row_id in kpi_dict:
                row["kpi"] = kpi_dict[row_id]

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            "body": json.dumps({
                "message": "Lambda ejecutada correctamente.",
                "rows": rows
            }),
        }
    except Exception as e:
        logger.error("Error en la lambda: %s", e)
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "error": str(e),
                "trace": traceback.format_exc(),
                "message": "Error en la ejecución de la lambda."
            }),
        }

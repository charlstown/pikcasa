import json
import traceback
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def safe_float(value, default=0.0):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def filter_is_kpick(columns: list, rows:list):
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

def get_boundaries(rows, columns):
    pass

def format_input(rows, columns):
    """
    Formatea los campos numéricos de las filasy convierte todas las variables a numericas.
    Convierte a float si dataType=numeric, boolean si dataType=boolean y int si dataType=category.
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

def get_kpick(kpick_columns, numeric_rows):
    """
    Calcula el KPI compuesto normalizado y ponderado para cada fila.
    Devuelve un diccionario {id: kpi} donde el kpi es un entero entre 0 y 100.
    """
    # Precalcular min, max y pesos de columnas válidas
    col_stats = {}
    for col, props in kpick_columns.items():
        weight = props.get("weight", 0)
        if weight == 0:
            continue
        values = [row[col] for row in numeric_rows if col in row and isinstance(row[col], (int, float))]
        if not values:
            continue
        min_val = min(values)
        max_val = max(values)
        col_stats[col] = {
            "min": min_val,
            "max": max_val,
            "weight": weight
        }

    kpi_dict = {}
    # Calcular KPI para cada fila
    for row in numeric_rows:
        weighted_sum = 0.0
        weight_sum = 0.0
        for col, stats in col_stats.items():
            val = row.get(col)
            if val is None:
                continue
            min_val = stats["min"]
            max_val = stats["max"]
            weight = stats["weight"]
            # Normalización min-max
            if max_val > min_val:
                norm = (val - min_val) / (max_val - min_val)
            else:
                norm = 0.0  # Si todos los valores son iguales
            weighted_sum += norm * weight
            weight_sum += weight
        kpi_normalized = weighted_sum / weight_sum if weight_sum > 0 else 0.0
        kpi_int = int(round(kpi_normalized * 100))
        row_id = row.get("id")
        if row_id is not None:
            kpi_dict[row_id] = kpi_int
    return kpi_dict

def category_to_numeric(kpickColumns, kpickRows):
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

def lambda_handler(event, context):
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
        numeric_rows = category_to_numeric(kpick_columns, kpick_rows)

        # Añadir nueva función aqui
        kpi_dict = get_kpick(kpick_columns=kpick_columns, numeric_rows=numeric_rows)
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

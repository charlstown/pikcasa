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

    # Filtrar los campos de las filas que tienen isKpick en true y weight > 0
    kpick_fields = set(col["field"] for col in kpick_columns)
    kpick_rows = [
        {k: v for k, v in row.items() if k in kpick_fields}
        for row in rows
    ]
    return kpick_fields, kpick_rows



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

        kpick_fields, kpick_rows = filter_is_kpick(columns=columns, rows=rows)

        for row in kpick_rows:
            print(row, "\n")
        quit()


        # Crear mapa de pesos por campo
        weight_map = {col["field"]: col.get("weight", 1) for col in columns}

        # Convertir campos numéricos para evitar errores
        for row in rows:
            row["precio"] = safe_float(row.get("precio", 0))
            row["superficie"] = safe_float(row.get("superficie", 0))
            row["habitaciones"] = safe_float(row.get("habitaciones", 0))
            row["baños"] = safe_float(row.get("baños", 0))

        # Cálculo de máximos para normalizar
        max_values = {
            "precio": max((r.get("precio", 0) for r in rows), default=1),
            "superficie": max((r.get("superficie", 1) for r in rows), default=1),
            "habitaciones": max((r.get("habitaciones", 1) for r in rows), default=1),
            "baños": max((r.get("baños", 1) for r in rows), default=1),
        }

        planta_mapping = {
            "Semisótano": 0,
            "Baja": 0.25,
            "Intermedia": 0.75,
            "Ático": 1
        }
        bool_mapping = {"No": 0, "Sí": 1}
        fachada_mapping = {"Interior": 0, "Exterior": 1}

        # Define los factores y su campo asociado
        factor_definitions = [
            ("precio", lambda row: 1 - (row.get("precio", 0) / max_values["precio"])),
            ("superficie", lambda row: row.get("superficie", 0) / max_values["superficie"]),
            ("planta", lambda row: planta_mapping.get(row.get("planta", "Intermedia"), 0.75)),
            ("ascensor", lambda row: bool_mapping.get(row.get("ascensor", "Sí"), 1)),
            ("habitaciones", lambda row: row.get("habitaciones", 0) / max_values["habitaciones"]),
            ("baños", lambda row: row.get("baños", 0) / max_values["baños"]),
            ("calefaccion", lambda row: bool_mapping.get(row.get("calefaccion", "Sí"), 1)),
            ("fachada", lambda row: fachada_mapping.get(row.get("fachada", "Exterior"), 1)),
            ("terraza", lambda row: bool_mapping.get(row.get("terraza", "No"), 0)),
            ("garaje", lambda row: bool_mapping.get(row.get("garaje", "No"), 0)),
        ]

        for row in rows:
            weighted_factors = []
            total_weight = 0
            for field, func in factor_definitions:
                if field in active_fields:
                    weight = weight_map.get(field, 1)
                    if weight > 0:
                        factor_value = func(row)
                        weighted_factors.append(factor_value * weight)
                        total_weight += weight
            if total_weight > 0:
                kpi = sum(weighted_factors) / total_weight * 100
            else:
                kpi = 0
            row["kpi"] = int(kpi)
            logger.info(row)

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

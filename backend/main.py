
from fastapi.middleware.cors import CORSMiddleware

from database import get_connection, initialize_database

from fastapi import FastAPI

app = FastAPI(
    title="LandFair API",
    description="Backend foundation for the LandFair project",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"]
)

initialize_database()


@app.get("/")
def home():
    return {
        "application": "LandFair",
        "message": "LandFair backend is running",
        "compensation_estimation": "Not available yet"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/database-status")
def database_status():
    connection = get_connection()

    try:
        result = connection.execute("""
            SELECT COUNT(*) AS total
            FROM market_values
        """).fetchone()

        return {
            "database": "connected",
            "table": "market_values",
            "record_count": result["total"]
        }

    finally:
        connection.close()


from fastapi import Query


@app.get("/market-value")
def get_market_value(
    district: str = Query(min_length=1),
    mandal: str = Query(min_length=1),
    village: str = Query(min_length=1),
    land_category: str = Query(min_length=1)
):
    connection = get_connection()

    try:
        records = connection.execute("""
            SELECT
                id,
                state,
                district,
                mandal,
                village,
                land_category,
                land_classification,
                rate,
                unit,
                effective_from,
                effective_to,
                source_reference,
                verification_status
            FROM market_values
            WHERE LOWER(TRIM(state)) = LOWER(?)
              AND LOWER(TRIM(district)) = LOWER(TRIM(?))
              AND LOWER(TRIM(mandal)) = LOWER(TRIM(?))
              AND LOWER(TRIM(village)) = LOWER(TRIM(?))
              AND LOWER(TRIM(land_category)) =
                  LOWER(TRIM(?))
              AND verification_status = 'verified'
              AND rate IS NOT NULL
              AND rate > 0
              AND unit IS NOT NULL
              AND TRIM(unit) != ''
              AND source_reference IS NOT NULL
              AND TRIM(source_reference) != ''
        """, (
            "Andhra Pradesh",
            district,
            mandal,
            village,
            land_category
        )).fetchall()

        if not records:
            return {
                "status": "unavailable",
                "message": (
                    "No suitable verified market-value "
                    "record is available."
                ),
                "record": None
            }

        return {
            "status": "verified_record_found",
            "message": (
                "A record matching the verification "
                "checks was found."
            ),
            "records": [dict(record) for record in records]
        }

    finally:
        connection.close()

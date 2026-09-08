from app.database import Base, engine, SessionLocal
from app.models.project import Project


Base.metadata.create_all(bind=engine)


projects = [
    Project(
        project_id="INF-001",
        project_name="National Highway Project",
        sector="Transport",
        ministry="Ministry of Road Transport",
        state="Karnataka",
        original_cost=500,
        current_cost=560,
        expenditure=320,
        physical_progress=58,
        financial_progress=64,
        planned_duration_months=36,
        elapsed_duration_months=28,
        milestone_delay_months=4,
        procurement_delay_months=2,
        land_acquisition_delay_months=1,
        approval_delay_months=0
    ),
    Project(
        project_id="INF-002",
        project_name="Metro Rail Project",
        sector="Railways",
        ministry="Ministry of Railways",
        state="Telangana",
        original_cost=800,
        current_cost=920,
        expenditure=610,
        physical_progress=67,
        financial_progress=72,
        planned_duration_months=48,
        elapsed_duration_months=40,
        milestone_delay_months=6,
        procurement_delay_months=3,
        land_acquisition_delay_months=2,
        approval_delay_months=1
    ),
    Project(
        project_id="INF-003",
        project_name="Irrigation Development Project",
        sector="Water Resources",
        ministry="Ministry of Jal Shakti",
        state="Maharashtra",
        original_cost=350,
        current_cost=390,
        expenditure=210,
        physical_progress=52,
        financial_progress=60,
        planned_duration_months=30,
        elapsed_duration_months=22,
        milestone_delay_months=3,
        procurement_delay_months=1,
        land_acquisition_delay_months=2,
        approval_delay_months=0
    )
]


db = SessionLocal()

try:
    existing_count = db.query(Project).count()

    if existing_count == 0:
        db.add_all(projects)
        db.commit()
        print("Projects inserted successfully.")
    else:
        print("Projects already exist.")

finally:
    db.close()
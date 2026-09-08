from app.database import Base, engine, SessionLocal
from app.models.project_history import ProjectHistory


Base.metadata.create_all(bind=engine)


history_data = [
    # INF-001
    ProjectHistory(
        project_id="INF-001",
        month=6,
        current_cost=505,
        expenditure=60,
        physical_progress=15,
        financial_progress=18,
        milestone_delay_months=0,
        procurement_delay_months=0
    ),
    ProjectHistory(
        project_id="INF-001",
        month=12,
        current_cost=515,
        expenditure=125,
        physical_progress=28,
        financial_progress=30,
        milestone_delay_months=1,
        procurement_delay_months=1
    ),
    ProjectHistory(
        project_id="INF-001",
        month=18,
        current_cost=530,
        expenditure=190,
        physical_progress=40,
        financial_progress=44,
        milestone_delay_months=2,
        procurement_delay_months=1
    ),
    ProjectHistory(
        project_id="INF-001",
        month=24,
        current_cost=545,
        expenditure=255,
        physical_progress=50,
        financial_progress=55,
        milestone_delay_months=3,
        procurement_delay_months=2
    ),
    ProjectHistory(
        project_id="INF-001",
        month=28,
        current_cost=560,
        expenditure=320,
        physical_progress=58,
        financial_progress=64,
        milestone_delay_months=4,
        procurement_delay_months=2
    ),

    # INF-002
    ProjectHistory(
        project_id="INF-002",
        month=10,
        current_cost=820,
        expenditure=120,
        physical_progress=18,
        financial_progress=20,
        milestone_delay_months=1,
        procurement_delay_months=1
    ),
    ProjectHistory(
        project_id="INF-002",
        month=20,
        current_cost=850,
        expenditure=260,
        physical_progress=35,
        financial_progress=38,
        milestone_delay_months=3,
        procurement_delay_months=2
    ),
    ProjectHistory(
        project_id="INF-002",
        month=30,
        current_cost=880,
        expenditure=400,
        physical_progress=50,
        financial_progress=53,
        milestone_delay_months=4,
        procurement_delay_months=2
    ),
    ProjectHistory(
        project_id="INF-002",
        month=40,
        current_cost=920,
        expenditure=610,
        physical_progress=67,
        financial_progress=72,
        milestone_delay_months=6,
        procurement_delay_months=3
    ),

    # INF-003
    ProjectHistory(
        project_id="INF-003",
        month=6,
        current_cost=355,
        expenditure=55,
        physical_progress=14,
        financial_progress=16,
        milestone_delay_months=0,
        procurement_delay_months=0
    ),
    ProjectHistory(
        project_id="INF-003",
        month=12,
        current_cost=365,
        expenditure=110,
        physical_progress=27,
        financial_progress=30,
        milestone_delay_months=1,
        procurement_delay_months=1
    ),
    ProjectHistory(
        project_id="INF-003",
        month=18,
        current_cost=378,
        expenditure=160,
        physical_progress=40,
        financial_progress=45,
        milestone_delay_months=2,
        procurement_delay_months=1
    ),
    ProjectHistory(
        project_id="INF-003",
        month=22,
        current_cost=390,
        expenditure=210,
        physical_progress=52,
        financial_progress=60,
        milestone_delay_months=3,
        procurement_delay_months=1
    ),
]


db = SessionLocal()

try:
    existing_count = db.query(ProjectHistory).count()

    if existing_count == 0:
        db.add_all(history_data)
        db.commit()
        print("Project history inserted successfully.")
    else:
        print("Project history already exists.")

finally:
    db.close()
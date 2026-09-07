from sqlalchemy import String, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    project_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False
    )

    project_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    sector: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    ministry: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    original_cost: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    current_cost: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    expenditure: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    physical_progress: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    financial_progress: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    planned_duration_months: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    elapsed_duration_months: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    milestone_delay_months: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    procurement_delay_months: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    land_acquisition_delay_months: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    approval_delay_months: Mapped[int] = mapped_column(
        Integer,
        default=0
    )
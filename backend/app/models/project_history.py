from sqlalchemy import String, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ProjectHistory(Base):
    __tablename__ = "project_history"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    project_id: Mapped[str] = mapped_column(
        String(50),
        index=True,
        nullable=False
    )

    month: Mapped[int] = mapped_column(
        Integer,
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

    milestone_delay_months: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    procurement_delay_months: Mapped[int] = mapped_column(
        Integer,
        default=0
    )
from pydantic import BaseModel, ConfigDict, Field


class ProjectHistory(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    project_id: str

    month: int = Field(
        ge=1
    )

    current_cost: float = Field(
        ge=0
    )

    expenditure: float = Field(
        ge=0
    )

    physical_progress: float = Field(
        ge=0,
        le=100
    )

    financial_progress: float = Field(
        ge=0,
        le=100
    )

    milestone_delay_months: int = Field(
        ge=0
    )

    procurement_delay_months: int = Field(
        ge=0
    )
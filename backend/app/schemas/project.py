from pydantic import BaseModel, ConfigDict, Field


class Project(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    project_id: str
    project_name: str
    sector: str
    ministry: str
    state: str

    original_cost: float = Field(ge=0)
    current_cost: float = Field(ge=0)
    expenditure: float = Field(ge=0)

    physical_progress: float = Field(
        ge=0,
        le=100
    )

    financial_progress: float = Field(
        ge=0,
        le=100
    )

    planned_duration_months: int
    elapsed_duration_months: int

    milestone_delay_months: int
    procurement_delay_months: int
    land_acquisition_delay_months: int
    approval_delay_months: int
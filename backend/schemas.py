from pydantic import BaseModel
from typing import List, Dict, Any

class PropertiesSchema(BaseModel):
    status: str
    capacity_metric: str
    insight: str
    control: str

class GeometrySchema(BaseModel):
    type: str = "Point"
    coordinates: List[float]

class FeatureSchema(BaseModel):
    type: str = "Feature"
    properties: Dict[str, Any]
    geometry: GeometrySchema

class GeoJSONResponse(BaseModel):
    type: str = "FeatureCollection"
    features: List[FeatureSchema]

class IntelligenceSchema(BaseModel):
    insight_a: str
    insight_b: str

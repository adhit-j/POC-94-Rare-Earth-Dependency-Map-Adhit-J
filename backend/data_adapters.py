import json
import os
from schemas import GeoJSONResponse, FeatureSchema, GeometrySchema

MOCK_FILE = os.path.join(os.path.dirname(__file__), "mock_data.json")

def get_rare_earth_data() -> GeoJSONResponse:
    # Attempt to fetch from an API (simulated here)
    # If it fails, fallback to mock data as per protocol
    try:
        # Simulate API failure to trigger fallback as requested by Protocol
        raise Exception("Simulated API failure to trigger fallback")
    except Exception as e:
        print(f"API failed, falling back to mock: {e}")
        
    # Fallback
    with open(MOCK_FILE, "r") as f:
        data = json.load(f)
    
    features = []
    for node in data.get("nodes", []):
        feature = FeatureSchema(
            type="Feature",
            properties={
                "id": node["id"],
                "name": node["name"],
                "country": node["country"],
                "type": node["type"],
                **node["properties"]
            },
            geometry=GeometrySchema(
                type="Point",
                coordinates=node["coordinates"]
            )
        )
        features.append(feature)
        
    return GeoJSONResponse(type="FeatureCollection", features=features)

def get_intelligence_context():
    return {
        "insight_a": "Good for your future-rails thesis around industrial capacity.",
        "insight_b": "China controls the majority of midstream processing, while Western nations scramble to diversify the extraction layer."
    }

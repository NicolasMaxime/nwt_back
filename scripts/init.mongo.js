db.getCollection('processors').insertMany([
  {
    "designer": "Intel",
    "family": "Core i7",
    "modelName": "720QM",
    "clock": NumberDecimal(1600.0),
    "max_clock": NumberDecimal(2800.0),
    "cache":NumberInt(6144),
    "cores": NumberInt(4),
    "threads": NumberInt(8),
  },
  {
    "designer": "Intel",
    "family": "Core i7",
    "modelName": "860",
    "clock": NumberDecimal(2800.0),
    "max_clock": NumberDecimal(3460.0),
    "cache":NumberInt(6144),
    "cores": NumberInt(4),
    "threads": NumberInt(8),
  }
]);

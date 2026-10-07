export const PAGE_SIZE = 4;

// Vehicle types as stored by the backend (`form` field)
export const VEHICLE_TYPES = [
  { value: "panelTruck", label: "Van" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

// Equipment checkboxes of the filter panel
export const EQUIPMENT_FILTERS = [
  { value: "AC", label: "AC" },
  { value: "automatic", label: "Automatic" },
  { value: "kitchen", label: "Kitchen" },
  { value: "TV", label: "TV" },
  { value: "bathroom", label: "Bathroom" },
];

// Boolean features reported by the API, in display order
export const FEATURE_LABELS = {
  AC: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

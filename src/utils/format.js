import { VEHICLE_TYPES, FEATURE_LABELS } from "../constants";

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// 8000 -> "€8000.00"
export const formatPrice = (price) => `€${Number(price).toFixed(2)}`;

export const formatVehicleType = (form) =>
  VEHICLE_TYPES.find((type) => type.value === form)?.label ?? form;

// Every feature badge a camper has (transmission, engine + available equipment)
export const getFeatureBadges = (camper) => {
  const badges = [];
  if (camper.transmission) badges.push(capitalize(camper.transmission));
  if (camper.engine) badges.push(capitalize(camper.engine));
  Object.entries(FEATURE_LABELS).forEach(([key, label]) => {
    if (camper[key]) badges.push(label);
  });
  return badges;
};

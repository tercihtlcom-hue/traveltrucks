// Turns the filters state into query params understood by the backend.
export const buildParams = ({ location, form, features }) => {
  const params = {};
  const city = location.trim();

  if (city) params.location = city;
  if (form) params.form = form;

  features.forEach((feature) => {
    if (feature === "automatic") params.transmission = "automatic";
    else params[feature] = true;
  });

  return params;
};

import { useState } from "react";
import toast from "react-hot-toast";
import "../styles/bookingForm.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: "", email: "", date: "", comment: "" };

const validate = ({ name, email, date }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email.";
  if (!date) errors.date = "Please choose a booking date.";
  return errors;
};

export default function BookingForm({ camperName }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
    setErrors((prev) => ({ ...prev, [target.name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    toast.success(`Booking request for ${camperName} sent. We will contact you soon!`);
    setValues(EMPTY_FORM);
  };

  return (
    <section className="booking" aria-labelledby="booking-title">
      <h2 id="booking-title" className="booking__title">
        Book your campervan now
      </h2>
      <p className="booking__text">Stay connected! We are always ready to help you.</p>

      <form className="booking__form" onSubmit={handleSubmit} noValidate>
        <Field error={errors.name}>
          <input
            name="name"
            type="text"
            placeholder="Name*"
            aria-label="Name"
            value={values.name}
            onChange={handleChange}
          />
        </Field>
        <Field error={errors.email}>
          <input
            name="email"
            type="email"
            placeholder="Email*"
            aria-label="Email"
            value={values.email}
            onChange={handleChange}
          />
        </Field>
        <Field error={errors.date}>
          <input
            name="date"
            type="date"
            aria-label="Booking date"
            value={values.date}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <textarea
            name="comment"
            rows="4"
            placeholder="Comment"
            aria-label="Comment"
            value={values.comment}
            onChange={handleChange}
          />
        </Field>

        <button type="submit" className="btn btn--primary booking__submit">
          Send
        </button>
      </form>
    </section>
  );
}

function Field({ error, children }) {
  return (
    <div className={error ? "field field--error" : "field"}>
      {children}
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}

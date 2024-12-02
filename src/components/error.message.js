import React from "react";
import { useField } from "formik";

function ErrorMessages({ name }) {
  const [, meta] = useField(name);

  if (!meta.touched || !meta.error) {
    return null;
  }


  let customMessage = "";
  switch (name) {
    case "FirstName":
        customMessage =
        meta.error === "Required"
            ? "First name is required."
            : meta.error === "Must be at least 5 characters"
            ? "Last name must be at least 5 characters."
            : meta.error === "Special characters are not allowed"
            ? "Field cannot contain special characters."
            : "";
        break;

    case "LastName":
        customMessage = 
          meta.error === "Required"
            ? "Last name is required."
            : meta.error === "Must be at least 3 characters"
            ? "Last name must be at least 3 characters."
            : meta.error === "Special characters are not allowed"
            ? "Field cannot contain special characters."
            : "";
        break;

    case "Email":
      customMessage =
        meta.error === "Required"
          ? "Email is required."
          : "Email must end with @gmail.com.";
      break;

    case "Phone":
      customMessage =
        meta.error === "Required"
          ? "Phone number is required."
          : "Phone must be exactly 10 digits.";
      break;

    case "Adress":
      customMessage =
        meta.error === "Required"
          ? "Address is required."
          : "Address must be at least 5 characters.";
      break;

    default:
      customMessage = meta.error;
  }

  return <div className="error-message">{customMessage}</div>;
}

export default ErrorMessages;

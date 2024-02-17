import React from "react";
const AuthForm = ({ formik, fields, buttonText, loading }) => {
  return (
    <form className="forms" onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <div className="SingleCredential" key={fields.name}>
          <input
            className="fields"
            type={field.type}
            name={field.name}
            value={formik.values[field.name]}
            placeholder={field.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div className="error">{formik.errors[field.name]}</div>
          )}
        </div>
      ))}
      <br />
      {buttonText !== "submit" ? (
        <button className="button" type="submit" disabled={loading}>
          {buttonText}
        </button>
      ) : null}
    </form>
  );
};
export default AuthForm;

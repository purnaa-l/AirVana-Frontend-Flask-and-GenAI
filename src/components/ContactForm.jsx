import React, { useState } from "react";
import './ContactForm.css'; // Assuming the updated CSS is in this file

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    query: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "A valid email is required.";
      isValid = false;
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
      isValid = false;
    }

    if (!formData.query) {
      newErrors.query = "Query is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., send data to backend)
      console.log("Form data submitted:", formData);
      setFormData({ name: "", email: "", mobileNumber: "", query: "" });
    }
  };

  return (
    <div className="unique-contact-form-wrapper">
      <h2 className="unique-contact-form-title">Contact Us</h2>
      <form className="unique-contact-form-content" onSubmit={handleSubmit}>
        <div className="unique-form-group-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`unique-input-field ${errors.name ? "unique-error" : ""}`}
          />
          {errors.name && <p className="unique-error-text">{errors.name}</p>}
        </div>

        <div className="unique-form-group-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`unique-input-field ${errors.email ? "unique-error" : ""}`}
          />
          {errors.email && <p className="unique-error-text">{errors.email}</p>}
        </div>

        <div className="unique-form-group-container">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={`unique-input-field ${errors.mobileNumber ? "unique-error" : ""}`}
          />
          {errors.mobileNumber && <p className="unique-error-text">{errors.mobileNumber}</p>}
        </div>

        <div className="unique-form-group-container">
          <label htmlFor="query">Query</label>
          <textarea
            id="query"
            name="query"
            value={formData.query}
            onChange={handleChange}
            className={`unique-input-field ${errors.query ? "unique-error" : ""}`}
          />
          {errors.query && <p className="unique-error-text">{errors.query}</p>}
        </div>

        <button type="submit" className="unique-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

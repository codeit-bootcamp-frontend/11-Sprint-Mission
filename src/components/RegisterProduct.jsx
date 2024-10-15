import React, { useState } from "react";
import FileInput from "./FileInput";

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;
    default:
      return value;
  }
}

const INITIAL_VALUES = {
  images: null,
  tags: [],
  price: "",
  description: "",
  name: "",
};

const RegisterProduct = ({ initialValues = INITIAL_VALUES }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <div>
      <FileInput
        name="images"
        value={{
          images: values.images,
          tags: values.tags,
          price: values.price,
          description: values.description,
          name: values.name,
        }}
        onChange={handleChange}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default RegisterProduct;

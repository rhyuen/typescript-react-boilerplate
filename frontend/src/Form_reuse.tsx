import * as React from "react";
interface Props {}

//THE BELOW DOESN"T WORK.

const Form = (names: Array<string>) => {
  let base = {};
  names.forEach(name => {
    Object.assign(base, { name: "" });
  });
  const [fields, updateFields] = React.useState(base);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFields({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFields(ps => {
      return {
        ...ps,
        [name]: value
      };
    });
  };

  return { fields, handleSubmit, handleChange };
};

export default Form;

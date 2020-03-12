import * as React from "react";
import Header from "../shared/Header"
import SubmitInput from "../shared/SubmitInput"
import TextInput from "../shared/TextInput"
import axios from "axios";
import ContentFrameCenter from "../shared/ContentFrameCenter";
import TwoCol from "../shared/TwoCol";

interface Props { }


const Signup: React.FunctionComponent<{}> = () => {
  const [formValues, updateFormValues] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmation: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormValues(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit for signup done.");

    axios
      .post("/api/signup", {
        email: formValues.email,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        password: formValues.password
      })
      .then(res => {
        console.log(res.data);
        updateFormValues(prev => {
          return {
            ...prev,
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmation: ""
          };
        });
      })
      .catch(e => {
        console.log(e);
        console.log(e.response.data);
      });
  };

  return (
    <ContentFrameCenter>
      <TwoCol>
        <Header>Sign up for an account.</Header>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
            value={formValues.email}
          />
          <br />
          <TextInput
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={handleInputChange}
            value={formValues.first_name}
          />
          <br />
          <TextInput
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={formValues.last_name}
          />
          <br />
          <TextInput
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            value={formValues.password}
          />
          <br />
          <TextInput
            type="password"
            name="confirmation"
            placeholder="password"
            onChange={handleInputChange}
            value={formValues.confirmation}
          /><br />
          <SubmitInput type="submit" value="signup" />
        </form>
      </TwoCol>
      <TwoCol>
        <h1>Be sure to choose an extra long password that you only use for this website!</h1>
      </TwoCol>
    </ContentFrameCenter>
  );
};

export default Signup;

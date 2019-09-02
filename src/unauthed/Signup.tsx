import * as React from "react";
import Grid from "../Grid";
import styled from "styled-components";
import axios from "axios";

interface Props { }

const Container = styled.div`
  grid-column: 2;
`;

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
    <Grid>
      <Container>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
            value={formValues.email}
          />
          <br />
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={handleInputChange}
            value={formValues.first_name}
          />
          <br />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={formValues.last_name}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            value={formValues.password}
          />
          <br />
          <input
            type="password"
            name="confirmation"
            placeholder="password"
            onChange={handleInputChange}
            value={formValues.confirmation}
          />
          <input type="submit" value="signup" />
        </form>
      </Container>
    </Grid>
  );
};

export default Signup;

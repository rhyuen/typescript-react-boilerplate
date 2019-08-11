import * as React from "react";
import Grid from "../Grid";
import styled from "styled-components";
import axios from "axios";

interface Props {}

const Container = styled.div`
  grid-column: 2;
`;

const Signup: React.FunctionComponent<{}> = () => {
  const [formValues, updateFormValues] = React.useState({
    email: "",
    password: "",
    confirmation: ""
  });

  if ((Math.random() * 200) % 2 === 0) {
    throw new Error("I am a cat.");
  }

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
        password: formValues.password
      })
      .then(res => {
        console.log(res.data);
        updateFormValues(prev => {
          return {
            ...prev,
            email: "",
            password: "",
            confirmation: ""
          };
        });
      })
      .catch(e => {
        console.log(e);
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

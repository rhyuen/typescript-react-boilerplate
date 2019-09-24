import * as React from "react";
import axios from "axios";
import Grid from "../Grid";

interface Props {}

const Forgot: React.FunctionComponent<Props> = () => {
  const [email, updateEmail] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/forgot", { email: email })
      .then(res => {
        updateEmail("");
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Grid>
      <div>
        <h1>Email reset</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="email@email.ca"
          />
          <input type="submit" value="Send Email" />
        </form>
      </div>
    </Grid>
  );
};

export default Forgot;
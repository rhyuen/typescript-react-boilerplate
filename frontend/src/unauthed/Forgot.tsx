import * as React from "react";
import axios from "axios";
import SubmitInput from "../shared/SubmitInput";
import TextInput from "../shared/TextInput";
import Header from "../shared/Header";
import TwoCol from "../shared/TwoCol"
import ContentFrameCenter from "../shared/ContentFrameCenter";

interface Props { }

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
    <ContentFrameCenter>
      <TwoCol>
        <Header>Email Reset</Header>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="email@email.ca"
          />
          <SubmitInput type="submit" value="Send Email" />
        </form>
      </TwoCol>
      <TwoCol>
        <h1>So you forgot your password.  It happens to the best of us.  Actually, it happens to all of us that don't use the same password for everything).</h1>
      </TwoCol>
    </ContentFrameCenter>
  );
};


export default Forgot;

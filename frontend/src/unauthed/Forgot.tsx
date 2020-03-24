import * as React from "react";
import axios from "axios";
import SubmitInput from "../shared/SubmitInput";
import TextInput from "../shared/TextInput";
import Header from "../shared/Header";
import GenericCol from "../shared/GenericCol";
import ContentFrameCenter from "../shared/ContentFrameCenter";
import Modal from "../shared/Modal/Modal";

interface Props { }

const Forgot: React.FunctionComponent<Props> = () => {
  const [email, updateEmail] = React.useState("");

  const [isModalVisible, updateModalVisible] = React.useState<boolean>(false);

  const handleModalChange = () => {
    updateModalVisible(!isModalVisible);
  }

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
        handleModalChange();
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ContentFrameCenter>
      {
        isModalVisible ?
          <Modal header="Email Reset Confirmation"
            onClick={handleModalChange}
            confirmation={true}>
            <p>An email to reset the password for the account that you specified has been dispatched.</p>
            <p>It provides instructions on how to regain access to your account.  It expires in 15 mins so don't dilly-dally.</p>
          </Modal> : null
      }
      <GenericCol size={6}>
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
      </GenericCol>
      <GenericCol size={6}>
        <h1>So you forgot your password.  It happens to the best of us.  Actually, it happens to all of us that don't use the same password for everything).</h1>
      </GenericCol>
    </ContentFrameCenter>
  );
};


export default Forgot;

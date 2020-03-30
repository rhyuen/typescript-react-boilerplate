import * as React from "react";
import Header from "../shared/Header"
import SubmitInput from "../shared/SubmitInput"
import TextInput from "../shared/TextInput"
import axios from "axios";
import ContentFrameCenter from "../shared/ContentFrameCenter";
import TwoCol from "../shared/TwoCol";
import RowContainer from "../shared/RowContainer";
import StyledLink from "../shared/StyledLink";
import Loading from "../shared/Modal/LoadingModal";
import Modal from "../shared/Modal/Modal";
import GenericCol from "../shared/GenericCol";
import CenteredSplashText from "../shared/CenteredSplashText";

interface Props { }


const Signup: React.FunctionComponent<{}> = () => {
  const [formValues, updateFormValues] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmation: ""
  });

  const [isCreationLoading, updateCreationLoading] = React.useState<boolean>(false);
  const [isModalVisible, updateModalVisible] = React.useState<boolean>(false);

  const handleModalClose = () => {
    updateModalVisible(false);
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
    updateCreationLoading(true);
    axios
      .post("/api/signup", {
        email: formValues.email,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        password: formValues.password
      })
      .then(res => {
        console.log(res.data);
        updateCreationLoading(false);
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
        updateModalVisible(true);
      })
      .catch(e => {
        console.log(e);
        console.log(e.response.data);
        console.error("it seems we have errored out.");
      });
  };

  return (
    <ContentFrameCenter>
      {
        isCreationLoading ? <Loading>Waiting on your new account to be made...</Loading> : null
      }
      {
        isModalVisible ?
          <Modal header="Account created."
            confirmation={true}
            onClick={handleModalClose}>
            Your account has been created.  Click here to login <StyledLink to="/login">Login</StyledLink>
          </Modal> : null
      }
      <GenericCol size={6}>
        <CenteredSplashText>
          <Header>Sign up for an account.</Header>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formValues.email}
            />
            <br />
            <TextInput
              type="text"
              name="first_name"
              placeholder="First Name"
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
              placeholder="Password (16 char min.)"
              onChange={handleInputChange}
              value={formValues.password}
            />
            <br />
            <TextInput
              type="password"
              name="confirmation"
              placeholder="Password Again (16 char min.)"
              onChange={handleInputChange}
              value={formValues.confirmation}
            /><br />
            <RowContainer>
              <SubmitInput type="submit" value="signup" />
              <StyledLink to="/login">Already have an account?</StyledLink>
            </RowContainer>
          </form>
        </CenteredSplashText>
      </GenericCol>
      <GenericCol size={6}>
        <CenteredSplashText>
          <h1>Be sure to choose an extra long password that you only use for this website!</h1>
        </CenteredSplashText>
      </GenericCol>
    </ContentFrameCenter>
  );
};

export default Signup;

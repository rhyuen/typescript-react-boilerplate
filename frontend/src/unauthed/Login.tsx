import * as React from "react";
import TextInput from "../shared/TextInput";
import SubmitInput from "../shared/SubmitInput"
import axios from "axios";
import Header from "../shared/Header";
import GenericCol from "../shared/GenericCol";
import ContentFrameCenter from "../shared/ContentFrameCenter";
import RowContainer from "../shared/RowContainer";
import StyledLink from "../shared/StyledLink";
import LoadingModal from "../shared/Modal/LoadingModal";
import CenteredSplashText from "../shared/CenteredSplashText";

interface Props {
  handleLogin: () => void;
}
const Login: React.FunctionComponent<Props> = ({ handleLogin }) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: ""
  });

  const [loading, updateLoading] = React.useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(credentials => {
      return {
        ...credentials,
        [name]: value
      };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateLoading(true);

    setCredentials(credentials => {
      const { email, password } = credentials;
      axios
        .post("/api/login", { email, password })
        .then(res => {
          console.log(res.data);
          updateLoading(false);
          handleLogin();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response.data);
        });

      return {
        ...credentials,
        email: "",
        password: ""
      };
    });
  };

  return (
    <ContentFrameCenter>
      {
        loading ? <LoadingModal>Checking your credentials...</LoadingModal> : null
      }
      <GenericCol size={6}>
        <CenteredSplashText>
          <Header>Sign in to your account.</Header>
          <form onSubmit={handleFormSubmit}>
            <TextInput
              type="text"
              name="email"
              placeholder="email@email.ca"
              value={credentials.email}
              onChange={handleFormChange}
            />
            <br />
            <TextInput
              type="password"
              name="password"
              placeholder="password goes here."
              value={credentials.password}
              onChange={handleFormChange}
            /><br />
            <RowContainer>
              <SubmitInput type="submit" value="Login" />
              <StyledLink to="/forgot">Forgot your password?</StyledLink>
            </RowContainer>
          </form>
        </CenteredSplashText>
      </GenericCol>
      <GenericCol size={6}>
        <CenteredSplashText>
          <h1>A picture goes here.</h1>
        </CenteredSplashText>
      </GenericCol>
    </ContentFrameCenter>
  );
};




export default Login;

import * as React from "react";
import { v4 } from "uuid";
import styled from 'styled-components';
import Card, { SubTitle, Header } from "../shared/Card";
import axios from "axios";
import NewPost from "./NewPost";

interface PostResult {
  name: string;
  content: string;
  created_at: Date;
}

interface State {
  loading: boolean;
  payload: Array<PostResult>;
  message: string;
}

interface Props {
  handleLogout: () => void;
}

const Home: React.FunctionComponent<Props> = (props: Props) => {

  const [data, setData] = React.useState<State>({
    loading: true,
    payload: [],
    message: "Loading..."
  });


  //TODO: CREATE CONTEXT FOR USERNAME IN NAV
  React.useEffect(() => {
    axios.get("/api/userDetails").then(res => {
      console.log(res.data);
      setData({
        loading: false,
        payload: res.data.payload,
        message: res.data.message
      });
    }).catch(e => {
      if (e.response.status === 401) {
        console.log("Not authorized because no token. Redirecting to Home.");
        props.handleLogout();
      }
      console.log("Error with GET in Authed/Home.")
    });
  }, []);

  return (
    <div>
      <h1>Things that happened while you were gone.</h1>
      {
        data.loading ?
          <p>stuff's loading.</p> :
          <>
            <div>
              <NewPost />
              {
                data.payload.map((r: PostResult) => {
                  return (
                    <Card key={v4()}>
                      <Header>{r.name}</Header>
                      <SubTitle>{r.created_at}</SubTitle>
                      <p>{r.content}</p>
                    </Card>
                  );
                })
              }
            </div>
          </>
      }
    </div >
  );
};

export default Home;



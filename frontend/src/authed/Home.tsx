import * as React from "react";
import { v4 } from "uuid";
import Card, { SubTitle, Header } from "../shared/Card";
import axios from "axios";
import NewPost from "./NewPost";
import Spinner from "../shared/Spinner";
import ContentFrame from "../shared/ContentFrame";
import List from "../shared/List";
import { PostResult } from "../../types/index";
import PostSingle from "../shared/PostSingle";
import GenericCol from "../shared/GenericCol";
import EmptyDisclaimer from "../shared/EmptyDisclaimer";


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

  //TODO: DE17, ADD function to update State from form submit.

  const updatePosts = (latest: PostResult) => {
    console.log("updating the posts");
    console.log(latest);
    setData(ps => {
      return {
        ...ps, payload: ps.payload.concat(latest)
      }
    });
  }

  return (
    <ContentFrame>
      <GenericCol size={3}>
        <h1>Side One</h1>
      </GenericCol>
      <GenericCol size={6}>
        <NewPost updatePosts={updatePosts} />
        {
          data.loading ?
            <Spinner>Your latest updates are on their way!</Spinner> :
            data.payload.length === 0 ? <EmptyDisclaimer>It seems you don't have any updates from anyone.</EmptyDisclaimer> :
              <List>
                {
                  data.payload.map((r: PostResult) => {
                    return (
                      <PostSingle key={v4()}>
                        <Header>{r.name}</Header>
                        <SubTitle>{r.created_at}</SubTitle>
                        <p>{r.content}</p>
                      </PostSingle>
                    );
                  })
                }
              </List>
        }
      </GenericCol>
      <GenericCol size={3}>
        <h1>Side Two</h1>
      </GenericCol>
    </ContentFrame >
  );
};

export default Home;



import * as React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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

const Home: React.FunctionComponent<{}> = () => {

  const [data, setData] = React.useState<State>({
    loading: true,
    payload: [],
    message: "Loading..."
  });

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
        return <Redirect to="/" />;
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
              {
                data.payload.map((r: PostResult) => {
                  return (
                    <>
                      <div>{r.name}</div>
                      <div>{r.content}</div>
                      <div>{r.created_at}</div>
                    </>
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

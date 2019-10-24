import * as React from "react";
import axios from "axios";
import { v4 } from "uuid";

interface Post {
  name: string;
  content: string;
  created_at: string;
}

interface State {
  isLoading: boolean;
  data: Array<Post>;
}

interface Props {
  handleLogout: () => void;
}

const Posts: React.FunctionComponent<Props> = (props: Props) => {
  const [payload, updatePayload] = React.useState<State>({
    isLoading: true,
    data: []
  });

  React.useEffect(() => {
    const url = "/api/getPosts";
    axios.get(url).then(res => {
      console.log(`data successfully retrieved: ${res.data}`);
      updatePayload({
        isLoading: false,
        data: res.data.payload
      });
    }).catch(err => {
      if (err.response.status === 401) {
        console.log("Unauthorized.");
        props.handleLogout();
      } else {
        console.log(`A non-401 error: ${err}`);
        updatePayload({
          isLoading: false,
          data: []
        });
      }
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <section>
        {
          payload.isLoading ?
            <h2>your created posts are loading</h2> :
            payload.data.map((item: Post) => {
              return (
                <div key={v4()}>
                  <div>{item.name}</div>
                  <div>{item.content}</div>
                  <div>{item.created_at}</div>
                </div>
              );
            })
        }
      </section>
    </div>
  );
};

export default Posts;

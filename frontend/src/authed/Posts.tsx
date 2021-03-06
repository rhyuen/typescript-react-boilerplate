import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import ContentFrame from "../shared/ContentFrame";
import Card, { SubTitle, Header } from "../shared/Card";
import Spinner from "../shared/Spinner";
import NonCardHeader from "../shared/NonCardHeader";
import GenericCol from "../shared/GenericCol";
import EmptyDisclaimer from "../shared/EmptyDisclaimer"

interface Post {
  post_id: string;
  post_name: string;
  post_content: string;
  post_media: string;
  post_created_at: string;
  post_modified_at: string;
  post_comments: Array<Comment>;
}

interface Comment {
  comment_id: string;
  comment_username: string;
  comment_content: string;
  comment_created_at: string;
  comment_modified_at: string;
}

interface State {
  isLoading: boolean;
  data: Array<Post>;
  selectedPostID: string;
}

interface Props {
  handleLogout: () => void;
}

const Posts: React.FunctionComponent<Props> = (props: Props) => {
  const [payload, updatePayload] = React.useState<State>({
    isLoading: true,
    data: [],
    selectedPostID: ""
  });

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.currentTarget;
    console.log(`${name} clicked.`);
    updatePayload((ps: any) => {
      return {
        ...ps,
        selectedPostID: name
      }
    })
  }

  React.useEffect(() => {
    const url = "/api/getPosts";
    axios.get(url).then(res => {
      console.dir(res.data);
      updatePayload({
        isLoading: false,
        data: res.data.payload,
        selectedPostID: "none"
      });
    }).catch(err => {
      if (err.response.status === 401) {
        console.error("Unauthorized to get data from /posts.");
        props.handleLogout();
      } else {
        console.error(`A non-401 error: ${err}`);
        updatePayload({
          isLoading: false,
          data: [],
          selectedPostID: "none"
        });
      }
    });
  }, []);

  return (
    <ContentFrame>
      <GenericCol size={6}>
        <NonCardHeader>Your Created Posts</NonCardHeader>
        <section>
          {
            payload.isLoading ?
              <Spinner>Posts are loading.</Spinner> :
              payload.data.length === 0 ? <p>You haven't made any posts yet.</p> :
                payload.data.map((item: Post) => {
                  return (
                    <Card key={item.post_id}>
                      <Header>{item.post_name}</Header>
                      <SubTitle>{item.post_created_at}</SubTitle>
                      <p>{item.post_content}</p>
                      <CommentsButton name={item.post_id} onClick={handlePostClick}>Comments: {item.post_comments.length}</CommentsButton>
                    </Card>
                  );
                })
          }
        </section>
      </GenericCol>
      <GenericCol size={6}>
        {
          payload.isLoading ?
            <Spinner>Comments go here.</Spinner> :
            payload.selectedPostID === "none" ?
              <EmptyDisclaimer>
                No Post Selected.<br />
                Click a post to show some comments.
              </EmptyDisclaimer> :
              <div>
                {
                  payload.data.filter((post: Post) => (post.post_id === payload.selectedPostID))[0].post_comments.length === 0
                    ? <h1>"add a comment, jerk."</h1>
                    : payload.data.filter((post: Post) => (post.post_id === payload.selectedPostID))[0]
                      .post_comments.map((c: Comment) => {
                        return (
                          <Card key={c.comment_id}>
                            <Header>{c.comment_username}</Header>
                            <SubTitle>{c.comment_created_at}</SubTitle>
                            <p>{c.comment_content}</p>
                          </Card>
                        );
                      })
                }
              </div>
        }
      </GenericCol>
    </ContentFrame>
  );
};

const CommentsButton = styled.button`
  padding: 5px 10px;
  text-transform: uppercase;
  color: black;
  background: white;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid black;

  &:focus{   
    color: black;    
    outline: none;
  }
  &:hover{
    background: papayawhip;
    color: black;
  }
`;




export default Posts;

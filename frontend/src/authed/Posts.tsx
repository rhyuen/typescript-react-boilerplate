import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import ContentFrame from "../shared/ContentFrame";
import Card, { SubTitle, Header } from "../shared/Card";
import TwoCol from "../shared/TwoCol";
import Spinner from "../shared/Spinner";
import NonCardHeader from "../shared/NonCardHeader";

interface Post {
  post_id: string;
  post_name: string;
  post_content: string;
  post_media: string;
  post_create: string;
  post_mod: string;
  post_comments: Array<Comment>;
}

interface Comment {
  comment_id: string;
  comment_user: string;
  comment_content: string;
  comment_create: string;
  comment_mod: string;
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

  // const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   const key = e.currentTarget.getAttribute("key");    
  //   console.log(key);
  //   updatePayload((ps: any) => {
  //     return {
  //       ...ps,
  //       selectedPostID: key
  //     }
  //   })
  // }

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
      <TwoCol>
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
                      <SubTitle>{item.post_create}</SubTitle>
                      <p>{item.post_content}</p>
                      <CommentsButton name={item.post_id} onClick={handlePostClick}>Comments: {item.post_comments.length}</CommentsButton>
                    </Card>
                  );
                })
          }
        </section>
      </TwoCol>
      <TwoCol>
        {
          payload.isLoading ?
            <Spinner>Comments go here.</Spinner> :
            payload.selectedPostID === "none" ?
              <EmptyDisclaimer>
                No Post Selected.<br />
                Click a post to show some comments.
              </EmptyDisclaimer> :
              payload.data.filter((post: Post) => (post.post_id === payload.selectedPostID))[0]
                .post_comments.map((c: Comment) => {
                  return (
                    <Card key={c.comment_id}>
                      <Header>{c.comment_user}</Header>
                      <SubTitle>{c.comment_create}</SubTitle>
                      <p>{c.comment_content}</p>
                    </Card>
                  );
                })
        }
      </TwoCol>
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

const EmptyDisclaimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  font-color: rgba(0,0,0,0.5);
  padding: 40px 20px;
`;



export default Posts;

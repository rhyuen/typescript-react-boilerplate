import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 } from "uuid";
import Spinner from "../shared/Spinner";
import ContentFrameCenter from "../shared/ContentFrameCenter";
import Card, { Header } from "../shared/Card";
import TwoCol from "../shared/TwoCol";
import ClickButton from "../shared/ClickButton";
import EmptyDisclaimer from "../shared/EmptyDisclaimer";
import Modal from "../shared/Modal/Modal";
import GenericCol from "../shared/GenericCol";

interface FriendLink {
  friender_id: string;
  friendee_id: string;
  created_at: string;
  last_modified: string;
  accepted: boolean;
}

interface State {
  isLoading: boolean;
  friends: Array<FriendLink>;
}

interface Props {
  handleLogout: () => void;
}


const Friends: React.FunctionComponent<Props> = (props: Props) => {

  const [friendsList, setFriends] = React.useState<State>({
    isLoading: true,
    friends: []
  });

  const [isModalVisible, updateModalVisible] = React.useState<boolean>(false)

  const handleModalVisible = () => {
    updateModalVisible(!isModalVisible);
  }

  React.useEffect(() => {
    const url = "/api/getFriends";
    axios.get(url).then(res => {
      console.log(res.data.payload);

      setFriends({
        isLoading: false,
        friends: res.data.payload
      });
    }).catch(e => {
      console.log(e);
      if (e.response.status === 401) {
        console.log("Not authorized because no token. Redirecting to Home.");
        return props.handleLogout();
      }
      setFriends({
        isLoading: false,
        friends: []
      });
    });
  }, []);

  return (
    <ContentFrameCenter>
      <GenericCol size={6}>
        <h1>My Friends</h1>
        {
          friendsList.isLoading ? <Spinner>Getting your friends.</Spinner> :
            friendsList.friends.length === 0 ?
              <EmptyDisclaimer>You don't have any friends yet.  You can add some below!</EmptyDisclaimer> :
              <div>
                {
                  friendsList.friends.map((f: FriendLink) => {
                    return (
                      <Card key={v4()}>
                        Friender {f.friender_id}<br />
                        Friendee {f.friendee_id}<br />
                        Created At: {f.created_at}<br />
                        Accepted On: {f.accepted}<br />
                      </Card>
                    );
                  })
                }
              </div>
        }
        <ClickButton onClick={handleModalVisible}>Modal!</ClickButton>
        {
          isModalVisible ? <Modal header="Modal Visible" onClick={handleModalVisible} confirmation={true}>The dialogue box is there.</Modal> : null
        }
      </GenericCol>
      <GenericCol size={6}>
        <h1>Potential Friends</h1>
        <SuggestedFriends />
      </GenericCol>
    </ContentFrameCenter>
  );
};


interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}


const SuggestedFriends: React.FunctionComponent<{}> = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [list, setList] = React.useState<Array<User>>([]);

  React.useEffect(() => {
    axios.get("/api/getUsers", { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setLoading(false);
        setList(res.data.payload);
      }).catch(e => {
        console.error(`Error with getting SuggestedFriends.`);
        console.log(e);
        setLoading(false);
        setList([]);
      });
  }, []);

  return (
    <>
      {
        loading ? <Spinner>Your friend suggestions are coming.</Spinner> :
          <SuggestionGrid>
            {
              list.map((user: User) => {
                return (
                  <Suggestion><SuggestionHeader>{user.first_name} {user.last_name}</SuggestionHeader><AddFriendButton>Add</AddFriendButton></Suggestion>
                )
              })
            }
          </SuggestionGrid>
      }
    </>
  )
}
export default Friends;

const SuggestionGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-auto-rows: auto;
  grid-gap: 20px;
  
`;

const Suggestion = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
`;

const SuggestionHeader = styled.h1`
  text-transform: uppercase;
  font-size: 16px;  
  border-bottom: 2px solid transparent;

  &:hover{
    border-bottom-color: black;
  }
`;

const AddFriendButton = styled.button`
  color: black;
  border: 2px solid black;  
  padding: 2px 4px;
  background: white;
  letter-spacing: 2px;
  font-size: 16px;
  border-radius 40%;
  font-weight: bold;
  text-transform: uppercase;

  &:hover{
    background: rgba(0,0,0,0.1);
  }

  &:focus{
    outline: none;
  }
`;
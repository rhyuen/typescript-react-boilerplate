import * as React from "react";
import axios from "axios";
import { v4 } from "uuid";
import { checkPropTypes } from "prop-types";

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

  React.useEffect(() => {
    console.log("Using effect, yes again.");
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

    <div>
      <h1>My Friends</h1>
      {
        friendsList.isLoading ? <div>friendslist is loading...</div> :
          <div>
            {
              friendsList.friends.map((f: FriendLink) => {
                return (
                  <div key={v4()}>
                    {f.friender_id}<br />
                    {f.friendee_id}<br />
                    {f.created_at}<br />
                    {f.last_modified}<br />
                    {f.accepted}<br />
                  </div>
                );
              })
            }
          </div>
      }

    </div>
  );
};

export default Friends;

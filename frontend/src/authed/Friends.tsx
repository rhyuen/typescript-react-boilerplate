import * as React from "react";
import axios from "axios";

const Friends: React.FunctionComponent<{}> = () => {

  React.useEffect(() => {
    console.log("Using effect");
    const url = "/api/getFriends";
    axios.get(url).then(res => {
      console.log(res.data);
    }).catch(e => {
      console.log(e);
    })
  }, []);

  return <div>User priveleged page. Contact or whatever special details.</div>;
};

export default Friends;

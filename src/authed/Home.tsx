import * as React from "react";
import axios from "axios";

const Home: React.FunctionComponent<{}> = () => {

  const [data, setData] = React.useState({ loading: true, message: "Loading..." });

  React.useEffect(() => {
    axios.get("/api/userDetails").then(res => {
      console.log("USER DETAILS PAYLOAD");
      console.log(res.data);
      setData({
        loading: false,
        message: res.data.message
      });
    }).catch(e => {
      console.log("Error with GET in Authed/Home.")
    });
  }, []);

  return (
    <div style={{ background: "pink" }}>
      <h1>User home page for dynamically generated values.</h1>
      {
        data.loading ?
          <p>stuff's loading.</p> :
          <p>{data.message}</p>
      }
    </div>
  );
};

export default Home;

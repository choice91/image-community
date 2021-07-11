import React from "react";

import { Grid, Text } from "../elements";

import Card from "../components/Card";

const Notification = (props) => {
  let noti = [
    { user_name: "gildong", post_id: "post1" },
    { user_name: "gildong", post_id: "post1" },
    { user_name: "gildong", post_id: "post1" },
    { user_name: "gildong", post_id: "post1" },
  ];
  return (
    <>
      <Grid padding="16px" bg_color="#eff6ff">
        {noti.map((n) => {
          return <Card {...n} key={n.post_id} />;
        })}
      </Grid>
    </>
  );
};

export default Notification;

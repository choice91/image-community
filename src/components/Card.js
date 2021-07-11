import React from "react";

import { Grid, Text, Image } from "../elements";

const Card = (props) => {
  const { image_url, user_name, post_id } = props;
  return (
    <>
      <Grid width="70vw" margin="0 auto">
        <Grid is_flex padding="16px" margin="8px 0px" bg_color="#fff">
          <Grid width="auto" margin="0px 8px 0px 0px">
            <Image src={image_url} size={60} shape="rectangle" />
          </Grid>
          <Grid>
            <Text>
              <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다.
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Card.defaultProps = {
  image_url: "https://t1.daumcdn.net/cfile/tistory/99BDFD395CE56D3425",
  user_name: "",
  post_id: "",
};

export default Card;

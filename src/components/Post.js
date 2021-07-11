import React from "react";
import { useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Image, Text, Button } from "../elements";

const Post = (props) => {
  const dispatch = useDispatch();
  // console.log(props);

  return (
    <>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>

          <Grid is_flex width="auto">
            {props.is_me && (
              <>
                <Button
                  width="auto"
                  margin="4px"
                  padding="4px"
                  _onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    history.push(`/write/${props.id}`);
                  }}
                >
                  수정
                </Button>
                <Button
                  width="auto"
                  margin="4px"
                  padding="4px"
                  _onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(postActions.deletePostFB(props.id));
                  }}
                >
                  삭제
                </Button>
              </>
            )}
            <Text>{props.insert_date}</Text>
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>

        <Grid padding="16px">
          <Text marin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "gildong",
    user_profile: "https://t1.daumcdn.net/cfile/tistory/99BDFD395CE56D3425",
  },
  image_url: "https://t1.daumcdn.net/cfile/tistory/99BDFD395CE56D3425",
  contents: "사모예드",
  comment_cnt: 0,
  is_me: false,
};

export default Post;

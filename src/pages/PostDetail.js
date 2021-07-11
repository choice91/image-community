import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import { Grid } from "../elements";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <>
      <Grid width="70vw" margin="0 auto" bg_color="#fff">
        {post && (
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} /> // user_info가 null이나 undefined가 아닐 경우 uid를 가져온다. (옵셔널 체이닝)
        )}
        <CommentWrite post_id={id} />
        <CommentList post_id={id} />
      </Grid>
    </>
  );
};

export default PostDetail;

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import { Grid } from "../elements";
import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();

  const { history } = props;

  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <>
      <Grid
        width="70vw"
        margin="0 auto"
        bg_color={"#eff6ff"}
        padding="20px 0px"
      >
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
            // console.log(paging.next);
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            // console.log(p);
            if (user_info && p.user_info.user_id === user_info.uid) {
              return (
                <Grid
                  bg_color="#fff"
                  margin="8px 0px"
                  key={p.id}
                  _onClick={() => {
                    history.push(`post/${p.id}`);
                  }}
                >
                  <Post {...p} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  bg_color="#fff"
                  margin="8px 0px"
                  key={p.id}
                  _onClick={() => {
                    history.push(`post/${p.id}`);
                  }}
                >
                  <Post {...p} />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
        {/* <button
          onClick={() => {
            console.log(paging);
            dispatch(postActions.getPostFB(paging.next));
          }}
        >
          추가로드
        </button> */}
      </Grid>
    </>
  );
};

export default PostList;

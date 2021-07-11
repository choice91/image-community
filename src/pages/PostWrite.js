import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import { Grid, Text, Button, Image, Input } from "../elements";

import Upload from "../shared/Upload";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  // console.log("_post = ", _post);

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없습니다.");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
  };

  if (!is_login) {
    return (
      <Grid width="70vw" margin="0 auto">
        <Grid margin="200px 0px 0px 0px" padding="16px" center>
          <Text size="32px" bold>
            잠깐!
          </Text>
          <Text size="16px">로그인 후에 서비스를 이용할 수 있습니다.</Text>
          <Button
            width="30vw"
            _onClick={() => {
              history.replace("/login");
            }}
          >
            로그인 하러가기
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Grid width="70vw" margin="0 auto">
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {is_edit ? "게시글 수정" : "게시글 작성"}
          </Text>
          <Upload />
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>

          <Image
            shape="rectangle"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>

        <Grid padding="16px">
          <Input
            value={contents}
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />
        </Grid>

        <Grid padding="16px">
          {is_edit ? (
            <Button _onClick={editPost}>게시글 수정</Button>
          ) : (
            <Button _onClick={addPost}>게시글 작성</Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;

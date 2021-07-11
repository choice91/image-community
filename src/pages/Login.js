import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Text, Button, Input } from "../elements";

import { setCookie } from "../shared/Cookie";
import { emailCheck } from "../shared/common";

import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호를 입력해주세요!");
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <>
      <Grid width="50vw" margin="0 auto">
        <Grid padding="16px">
          <Text size="32px" bold>
            로그인
          </Text>
          <Grid padding="16px 0px">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요."
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <Input
              type="pasword"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </Grid>
          <Button
            _onClick={() => {
              console.log("로그인");
              login();
            }}
          >
            로그인하기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

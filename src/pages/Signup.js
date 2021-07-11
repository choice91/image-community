import React from "react";
import { useDispatch } from "react-redux";

import { emailCheck } from "../shared/common";

import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    if (pwd !== pwd_check) {
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
    window.alert("회원가입이 완료되었습니다!");
  };

  return (
    <>
      <Grid width="50vw" margin="0 auto">
        <Grid padding="16px">
          <Text size="32px" bold>
            회원가입
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
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              _onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <Input
              label="비밀번호"
              placeholder="비밀번호을 입력해주세요."
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호 확인을 입력해주세요."
              _onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
            />
          </Grid>
          <Button margin="16px 0px" _onClick={signup}>
            회원가입하기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

Signup.defaultProps = {};

export default Signup;

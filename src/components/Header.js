import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Text, Button } from "../elements";

import { deleteCookie, getCookie } from "../shared/Cookie";
import { apiKey } from "../shared/firebase";

import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();

  // const [is_login, setIsLogin] = React.useState(false);
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // React.useEffect(() => {
  //   let cookie = getCookie("user_id");
  //   // console.log(cookie);

  //   // cookie가 있으면 is_login값을 true로 바꿔주고 없으면 false로 바꿔줌
  //   if (cookie) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, []);

  if (is_login && is_session) {
    return (
      <>
        <Grid is_flex>
          <Grid
            _onClick={() => {
              history.replace("/");
            }}
          >
            <Text margin="0px 0px 0px 5px" size="24px" bold>
              IMAGE COMMUNITY
            </Text>
          </Grid>
          <Grid is_flex>
            <Button>내 정보</Button>
            <Button
              _onClick={() => {
                history.push("/noti");
              }}
            >
              알림
            </Button>
            <Button
              _onClick={() => {
                dispatch(userActions.logoutFB({}));
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid is_flex>
        <Grid
          _onClick={() => {
            history.replace("/");
          }}
        >
          <Text margin="0px 0px 0px 5px" size="24px" bold>
            IMAGE COMMUNITY
          </Text>
        </Grid>
        <Grid is_flex>
          <Button
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;

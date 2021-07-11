import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

import Header from "../components/Header";
import { Grid, Button } from "../elements/index";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";
import Permit from "./Permit";

import { apiKey } from "./firebase";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <>
      <Grid bg_color="#eff6ff">
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/noti" exact component={Notification} />
        </ConnectedRouter>
        <Permit>
          <Button
            is_float
            _onClick={() => {
              history.push("/write");
            }}
          >
            +
          </Button>
        </Permit>
      </Grid>
    </>
  );
}

export default App;

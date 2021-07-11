import React from "react";
import { useSelector } from "react-redux";

import { apiKey } from "./firebase";

const Permit = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  // 세션이 있나 확인
  const is_login = sessionStorage.getItem(_session_key);

  if (is_login && user_info) {
    return <>{props.children}</>;
  }

  return null;
};

export default Permit;

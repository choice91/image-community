import React from "react";
import _ from "lodash";

import Spinner from "../elements/Spinner";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      // 조건부 렌더링으로 scrollTop 값을 가져옴 (브라우저 호환성을 맞춰주기 위함)
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll); // 함수형 컴포넌트에서의 구독해제 (컴포넌트가 사라질 때 호출된다.)
  }, [is_next, loading]);

  return (
    <>
      {props.children}
      {is_next && <Spinner />}
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {}, // 다음 목록을 불러오는 함수
  is_next: false, // 다음 목록이 있는지 확인하는 변수
  loading: false,
};

export default InfinityScroll;

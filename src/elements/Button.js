import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, margin, padding, width, is_float, children, _onClick } = props;
  const styles = { margin: margin, padding: padding, width: width };

  if (is_float) {
    return (
      <>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </>
    );
  }

  return (
    <>
      <ElButton style={styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  margin: false,
  padding: "12px 0px",
  width: "100%",
  children: null,
  _onClick: () => {},
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #b2bec3;
  color: #000;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  margin: ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  &:hover {
    cursor: pointer;
  }
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #fdcb6e;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;

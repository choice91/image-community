import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg_color,
    children,
    center,
    _onClick,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    padding: padding,
    margin: margin,
    bg_color: bg_color,
    center: center,
  };

  return (
    <>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </>
  );
};

Grid.defaultProps = {
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg_color: false,
  center: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg_color ? `background-color: ${props.bg_color};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; justify-content: space-between; align-items: center;`
      : ""}
  ${(props) => (props.center ? `text-align: center;` : "")}
`;

export default Grid;

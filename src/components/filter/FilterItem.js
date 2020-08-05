import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 10px 20px;
  &:hover {
    background-color: rgba(34, 32, 27, 0.1);
  }
  &:first-child {
    margin-top: 30px;
  }
  &:last-child {
    margin-bottom: 30px;
  }
`;

const CheckMark = styled.div`
  margin-right: 10px;
  position: relative;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: ${(props) =>
    props.clicked ? "0.5px solid #4f4fc4" : "0.5px solid #5a5a5d"};
  background: ${(props) =>
    props.clicked
      ? "linear-gradient(180deg, #4f4fc4 0%, #4f4fc4 100%);"
      : "white"};
  &:after {
    display: ${(props) => (props.clicked ? "block" : "none")};
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 2px;
    position: absolute;
    top: 4px;
    transform: rotate(-45deg);
    width: 12px;
  }
`;

const CheckText = styled.div`
  color: ${(props) => (props.clicked ? "#4F4FC4" : "#404b5a")};
  font-size: 16px;
  letter-spacing: 0;
  line-height: 18px;
`;

const FilterItem = () => {
  const [itemClick, setItemClick] = useState(false);
  return (
    <Container
      onClick={() => {
        setItemClick(!itemClick);
      }}
    >
      <CheckMark clicked={itemClick}></CheckMark>
      <CheckText clicked={itemClick}>File</CheckText>
    </Container>
  );
};

export default FilterItem;

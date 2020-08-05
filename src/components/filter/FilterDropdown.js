import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FilterItem from "./FilterItem";

const StyledFilterDropdown = styled.div`
  margin: auto 15px auto 0px;
  position: relative;
  .dropdown {
    display: flex;
    min-width: 140px;
    background-color: white;
    border: 1px solid #979797;
    border-radius: 23px;
    padding: 10px 15px;
    &-text {
      font-size: 15px;
      color: #2d2e2c;
      letter-spacing: 0;
      line-height: 18px;
      padding-right: 20px;
    }
    &-icon {
      border: solid #000000;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      margin: auto 0px auto auto;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
    &:hover {
      cursor: pointer;
      border: 1px solid transparent !important;
      background: linear-gradient(
          45deg,
          #ffffff 0%,
          #ffffff 28.97%,
          #ffffff 100%,
          #ffffff 100%
        ),
        linear-gradient(15deg, red, blue);
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
    }
    &-active {
      border: 1px solid transparent !important;
      background: linear-gradient(
          45deg,
          #ffffff 0%,
          #ffffff 28.97%,
          #ffffff 100%,
          #ffffff 100%
        ),
        linear-gradient(15deg, red, blue);
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
    }
  }
  .dropdown-list {
    z-index: 1;
    position: absolute;
    top: calc(100% + 10px);
    overflow: hidden;
    min-width: 300px;
    max-height: 0px;
    border-radius: 5px;
    background-color: #ffffff;
    transition: all ease-in 0.3s;
    &:hover {
      cursor: pointer;
    }
    &-active {
      max-height: 500px;
      box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.12),
        0 5px 20px 0 rgba(21, 27, 38, 0.08);
    }
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const FilterDropdown = () => {
  const [showDropList, setShowDropList] = useState(false);
  const dropbarRef = useRef(null);
  const droplistRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        droplistRef.current &&
        !droplistRef.current.contains(event.target) &&
        !dropbarRef.current.contains(event.target)
      ) {
        setShowDropList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [droplistRef, dropbarRef]);

  return (
    <StyledFilterDropdown>
      <div
        ref={dropbarRef}
        className={`dropdown ${showDropList ? "dropdown-active" : ""}`}
        onClick={() => {
          setShowDropList(!showDropList);
        }}
      >
        <div className="dropdown-text">Types</div>
        <i className="dropdown-icon"></i>
      </div>
      <div
        ref={droplistRef}
        className={`dropdown-list ${
          showDropList ? "dropdown-list-active" : ""
        }`}
      >
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
      </div>
    </StyledFilterDropdown>
  );
};

export default FilterDropdown;

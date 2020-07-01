import React from "react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  display: flex;
  margin: 35px auto auto;
  height: 80px;
  max-width: 1196px;
  border: 1px solid #979797;
  border-radius: 40px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px 0 #e0e2e4;
  padding: 0px 45px;
  input {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    color: rgba(0, 0, 0, 0.65);
    font-size: 24px;
    letter-spacing: 0;
    line-height: 26px;
  }
  .search-icon {
    width: 35px;
    height: 35px;
    margin: auto;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  @media only screen and (max-width: 1240px) {
    width: 90%;
  }
  @media only screen and (max-width: 712px) {
    height: 50px;
    padding: 0px 25px;
    input {
      font-size: 18px;
    }
    .search-icon {
      width: 25px;
      height: 25px;
    }
  }
`;

const SearchBar = () => {
  return (
    <StyledSearchBar>
      <input
        type="text"
        name="searchquery"
        placeholder="Search for files, emails, tasks and much more"
      ></input>
      <ion-icon name="search-outline" class="search-icon"></ion-icon>
    </StyledSearchBar>
  );
};

export default SearchBar;

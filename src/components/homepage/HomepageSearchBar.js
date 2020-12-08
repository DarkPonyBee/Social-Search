import React from "react";
import styled from "styled-components";

import INFOIMG from "../../assets/images/icon-info-colored.svg";

const StyledHomepageSearchBarContainer = styled.div`
  position: relative;
  margin: ${(props) => (props.resultPage ? "auto" : "35px auto 0px auto")};
  max-width: 900px;
  width: 90%;
  .searchbar-total {
    display: flex;
  }
  .searchbar {
    width: 100%;
    box-shadow: ${(props) =>
      props.showSuggestionList
        ? "0 0px 8px 0 #e0e2e4"
        : "0 8px 16px 0 #e0e2e4"};
    background-color: #ffffff;
    padding: ${(props) => (props.resultPage ? "0px 25px" : "0px 45px")};
    height: ${(props) => (props.resultPage ? "50px" : "80px")};
    border: 1px solid #979797;
    border-radius: ${(props) =>
      props.showSuggestionList ? "15px 15px 0px 0px" : "40px"};
    ${(props) => (props.showSuggestionList ? "border-bottom: none" : "")};
    &-container {
      display: flex;
      height: 100%;
      ${(props) =>
        props.showSuggestionList ? "border-bottom: 1px solid #DADCE3" : ""};
      input {
        height: 100%;
        width: 100%;
        outline: none;
        border: none;
        color: rgba(0, 0, 0, 0.65);
        font-size: ${(props) => (props.resultPage ? "18px" : "24px")};
        letter-spacing: 0;
        line-height: 26px;
      }
      &-icon {
        width: ${(props) => (props.resultPage ? "25px" : "35px")};
        height: ${(props) => (props.resultPage ? "25px" : "35px")};
        margin: auto 0px auto 20px;
        ${(props) => (props.resultPage ? "margin-left:10px" : "")};
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
      &-closeicon {
        width: ${(props) => (props.resultPage ? "25px" : "35px")};
        height: ${(props) => (props.resultPage ? "25px" : "35px")};
        margin: auto 0px;
        padding-right: ${(props) => (props.resultPage ? "10px" : "20px")};
        border-right: 1px solid #cccccb;
        opacity: 0.8;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }
  }
  .searchbar-info {
    width: ${(props) => (props.resultPage ? "25px" : "35px")};
    height: ${(props) => (props.resultPage ? "25px" : "35px")};
    margin: auto 0px auto 10px;
    cursor: pointer;
  }
  .searchbar-list {
    z-index: 1;
    position: absolute;
    width: 100%;
    background-color: #ffffff;
    box-shadow: ${(props) =>
      props.showSuggestionList
        ? "0 8px 8px 0 #e0e2e4"
        : "0 8px 16px 0 #e0e2e4"};
    border: 1px solid #979797;
    border-top: none;
    border-radius: 0px 0px 15px 15px;
    padding: 20px 45px;
    font-size: 20px;
    &-item {
      line-height: 36px;
      letter-spacing: 0;
      &-highlight {
        font-weight: bold;
      }
      &:hover {
        cursor: pointer;
        background-color: rgba(34, 32, 27, 0.1);
      }
    }
  }
  @media only screen and (max-width: 712px) {
    .searchbar {
      padding: 0px 25px;
      height: 50px;
      &-container {
        input {
          font-size: 18px;
        }
        &-icon {
          width: 25px;
          height: 25px;
          margin-left: 10px;
        }
        &-closeicon {
          width: 25px;
          height: 25px;
          padding-right: 10px;
        }
      }
    }
    ion-icon {
      width: 25px;
      height: 25px;
    }
    .searchbar-list {
      padding: 20px 25px;
      font-size: 18px;
    }
  }
`;

const HomepageSearchBar = () => {
  return (
    <StyledHomepageSearchBarContainer>
      <div className="searchbar-total">
        <div className="searchbar">
          <div className="searchbar-container">
            <input
              type="text"
              name="searchQuery"
              placeholder="Search Your Cloud"
            ></input>
            <ion-icon
              type="submit"
              name="search-outline"
              class="searchbar-container-icon"
            ></ion-icon>
          </div>
        </div>
        <img className="searchbar-info" src={INFOIMG} alt="InfoImage" />{" "}
      </div>
    </StyledHomepageSearchBarContainer>
  );
};

export default HomepageSearchBar;

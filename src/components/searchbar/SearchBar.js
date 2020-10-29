import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { getSearchResult, setSearchQuery } from "../../redux/actions/search";
import { getParam } from "../../utils/helper";

const StyledSearchBarContainer = styled.div`
  position: relative;
  margin: ${(props) => (props.resultPage ? "auto" : "35px auto 0px auto")};
  max-width: 900px;
  width: 90%;
  .searchbar {
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
    .searchbar-list {
      padding: 20px 25px;
      font-size: 18px;
    }
  }
`;

const SearchBar = ({ resultPage = false }) => {
  const history = useHistory();
  const location = useLocation();
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const [searchBarQuery, setSearchBarQuery] = useState(searchQuery);
  const [showSuggestionList, setShowSuggestionList] = useState(false);

  useEffect(() => {
    const searchCursorURL = getParam("cursor", location.search);
    const searchQueryURL = getParam("q", location.search);
    if (resultPage) {
      let filterSearchQuery = searchQueryURL ? searchQueryURL : "";
      let filterSearchCursor = searchCursorURL ? parseInt(searchCursorURL) : 0;
      setSearchBarQuery(filterSearchQuery);
      setSearchQuery(filterSearchQuery);
      getSearchResult(filterSearchQuery, filterSearchCursor);
    } else {
      setSearchBarQuery("");
      setSearchQuery("");
    }
  }, [location, resultPage]);

  // const highlightSearchResult = (query, responseResult) => {
  //   let highlightedSearchResult = [];
  //   responseResult.forEach((item) => {
  //     let index = item.toLowerCase().indexOf(query.toLowerCase());
  //     if (index >= 0) {
  //       highlightedSearchResult.push(
  //         <div
  //           onClick={() => {
  //             alert("Clicked Search Result!");
  //           }}
  //         >
  //           {item.substring(0, index)}
  //           <span
  //             className="searchbar-list-item-highlight"
  //             onClick={() => {
  //               alert("sd");
  //             }}
  //           >
  //             {item.substring(index, index + query.length)}
  //           </span>
  //           {item.substring(index + query.length)}
  //         </div>
  //       );
  //     }
  //   });
  //   setSearchResult(highlightedSearchResult);
  // };

  const onInputChange = (e) => {
    const query = e.target.value;
    setSearchBarQuery(query);
    // if (query.trim().length === 0) {
    //   setShowSuggestionList(false);
    //   return;
    // }
    // setShowSuggestionList(true);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      openResultPage();
    }
  };

  const handleSearchIcon = () => {
    openResultPage();
  };

  const openResultPage = () => {
    setShowSuggestionList(false);
    history.push(`/result/?q=${searchBarQuery}&cursor=0`);
  };

  const handleCloseIcon = () => {
    setShowSuggestionList(false);
    setSearchBarQuery("");
  };

  return (
    <StyledSearchBarContainer
      showSuggestionList={showSuggestionList}
      resultPage={resultPage}
    >
      <div className="searchbar">
        <div className="searchbar-container">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search Your Cloud"
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            value={searchBarQuery}
          ></input>
          {showSuggestionList && (
            <ion-icon
              name="close-outline"
              class="searchbar-container-closeicon"
              onClick={handleCloseIcon}
            ></ion-icon>
          )}
          <ion-icon
            type="submit"
            name="search-outline"
            class="searchbar-container-icon"
            onClick={handleSearchIcon}
          ></ion-icon>
        </div>
      </div>
      {/* {showSuggestionList && (
        <div className="searchbar-list">
          {searchResult.map((item, index) => {
            return (
              <div key={index} className="searchbar-list-item">
                {item}
              </div>
            );
          })}
        </div>
      )} */}
    </StyledSearchBarContainer>
  );
};

export default SearchBar;

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

const StyledSearchBarContainer = styled.div`
  position: relative;
  margin: 35px auto auto;
  max-width: 1196px;
  .searchbar {
    box-shadow: ${(props) =>
      props.searchList ? "0 0px 8px 0 #e0e2e4" : "0 8px 16px 0 #e0e2e4"};
    background-color: #ffffff;
    padding: 0px 45px;
    height: 80px;
    border: 1px solid #979797;
    border-radius: ${(props) =>
      props.searchList ? "15px 15px 0px 0px" : "40px"};
    ${(props) => (props.searchList ? "border-bottom: none" : "")};
    &-container {
      display: flex;
      height: 100%;
      ${(props) =>
        props.searchList ? "border-bottom: 1px solid #DADCE3" : ""};
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
      &-icon {
        width: 35px;
        height: 35px;
        margin: auto 0px auto 20px;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
      &-closeicon {
        width: 35px;
        height: 35px;
        margin: auto 0px;
        padding-right: 20px;
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
      props.searchList ? "0 8px 8px 0 #e0e2e4" : "0 8px 16px 0 #e0e2e4"};
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
  @media only screen and (max-width: 1240px) {
    width: 90%;
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

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchList, setSearchList] = useState(false);
  let debounce = null;

  const highlightSearchResult = (query, responseResult) => {
    let highlightedSearchResult = [];
    responseResult.forEach((item) => {
      let index = item.toLowerCase().indexOf(query.toLowerCase());
      if (index >= 0) {
        highlightedSearchResult.push(
          <div
            onClick={() => {
              alert("Clicked Search Result!");
            }}
          >
            {item.substring(0, index)}
            <span
              className="searchbar-list-item-highlight"
              onClick={() => {
                alert("sd");
              }}
            >
              {item.substring(index, index + query.length)}
            </span>
            {item.substring(index + query.length)}
          </div>
        );
      }
    });
    setSearchResult(highlightedSearchResult);
  };

  const onSearch = async (query) => {
    let token = null;
    await Auth.currentSession()
      .then((data) => {
        token = data.getIdToken().getJwtToken();
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
        return;
      });
    const params = { q: query };
    await axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://devapi.trevi.io/search",
        null,
        {
          params,
          headers: {
            authorizer: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSearchList(true);
        let responseResult = [
          "deprecated",
          "Deprication",
          "Academic studies",
          "Decisions & Als Q2 2018",
          "Depeche Mode Live Concert , Tel Aviv 2018",
        ];
        highlightSearchResult(query, responseResult);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
      });
  };

  const onInputChange = (e) => {
    clearTimeout(debounce);
    const query = e.target.value;
    if (query.trim().length === 0) {
      setSearchList(false);
      setSearchResult([]);
      return;
    }
    debounce = setTimeout(() => {
      onSearch(query);
    }, 500);
  };

  return (
    <StyledSearchBarContainer searchList={searchList}>
      <div className="searchbar">
        <div className="searchbar-container">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search for files, emails, tasks and much more"
            onChange={onInputChange}
          ></input>
          {searchList && (
            <ion-icon
              name="close-outline"
              class="searchbar-container-closeicon"
              onClick={() => {
                setSearchList(false);
                setSearchResult([]);
              }}
            ></ion-icon>
          )}
          <ion-icon
            name="search-outline"
            class="searchbar-container-icon"
          ></ion-icon>
        </div>
      </div>
      {searchList && (
        <div className="searchbar-list">
          {searchResult.map((item, index) => {
            return (
              <div key={index} className="searchbar-list-item">
                {item}
              </div>
            );
          })}
        </div>
      )}
    </StyledSearchBarContainer>
  );
};

export default SearchBar;

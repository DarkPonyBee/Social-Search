import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

const StyledSearchBarContainer = styled.div`
  margin: 35px auto auto;
  max-width: 1196px;
  padding: 0px 45px;
  border: 1px solid #979797;
  border-radius: 40px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px 0 #e0e2e4;
  .searchbar {
    display: flex;
    height: 80px;
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
  .searchbar-list {
    border-top: 1px solid #dadce3;
    padding: 20px 0px;
  }
  @media only screen and (max-width: 1240px) {
    width: 90%;
  }
  @media only screen and (max-width: 712px) {
    padding: 0px 25px;
    .searchbar {
      height: 50px;
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
`;

const SearchBar = () => {
  let debounce = null;

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

    await axios
      .post("https://devapi.trevi.io/search", {
        params: {
          q: query,
        },
        headers: {
          authorizer: token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
      });
  };

  const onInputChange = (e) => {
    const searchQuery = e.target.value;
    if (!searchQuery) return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      onSearch(searchQuery);
    }, 500);
  };

  return (
    <StyledSearchBarContainer>
      <div className="searchbar">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search for files, emails, tasks and much more"
          onChange={onInputChange}
        ></input>
        {/* <ion-icon name="close-outline" class="searchbar-closeicon"></ion-icon> */}
        <ion-icon name="search-outline" class="searchbar-icon"></ion-icon>
      </div>
      {/* <div className="searchbar-list"></div> */}
    </StyledSearchBarContainer>
  );
};

export default SearchBar;

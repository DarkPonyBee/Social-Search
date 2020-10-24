import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";

import ResultItemContainer from "../components/search/ResultItemContainer";
import Header from "../components/layout/Header";
import AddAccounts from "../components/accounts/AddAccounts";
import { getParam } from "../utils/helper";
import { setShowAddAccount } from "../redux/actions/global";
// import FilterDropdown from "../components/filter/FilterDropdown";
// import FilterDate from "../components/filter/FilterDate";

const StyledResultPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;

  .resultpage-filter {
    display: flex;
    width: 100%;
    padding: 35px 0px;
    background-image: linear-gradient(
      to right,
      red 3%,
      blue 10%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: bottom;
    background-size: 10px 1px;
    background-repeat: repeat-x;
  }

  .resultpage-list {
    max-width: 900px;
    padding-top: 40px;
    padding-bottom: 30px;

    &-loader {
      display: flex;
      justify-content: center;
      height: 50vh;
      padding: 100px 0px;
    }

    &-empty {
      height: 50vh;
      color: rgba(0, 0, 0, 0.65);
      font-size: 24px;
      letter-spacing: 0;
      line-height: 26px;
      text-align: center;
      padding: 50px 0px;
    }
  }

  .resultpage-pagination {
    display: ${(props) => (props.isloading ? "none" : "flex")};
    padding-left: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;

    &-link {
      padding: 6px 12px;
      line-height: 1.42857143;
      text-decoration: none;
      color: #4f4fc4;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;

      &:hover {
        color: #fff;
        background-color: #4f4fc4;
      }
    }

    &-active {
      color: #fff;
      background-color: #4f4fc4;
    }

    &-first {
      margin-left: 0;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    &-last {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
`;

const Resultpage = () => {
  const history = useHistory();
  const location = useLocation();
  const [activePage, setActivePage] = useState(1);
  const searchResult = useSelector((store) => store.search.searchResult);
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const showAddAccount = useSelector((store) => store.global.showAddAccount);
  const isLoading = searchResult.loading;
  const result = searchResult.result?.results;
  const totalResults = searchResult.result.total_results || 0;

  useEffect(() => {
    const searchPageURL = getParam("page", location.search);
    setActivePage(parseInt(searchPageURL ? searchPageURL : 1));
  }, [location]);

  const handlePageClick = (pageNumber) => {
    history.push(`/result/?q=${searchQuery}&page=${pageNumber}`);
  };

  return (
    <>
      <Header resultPage={true}></Header>
      <StyledResultPage isloading={isLoading}>
        {/* <div className="resultpage-filter">
        <FilterDropdown></FilterDropdown>
        <FilterDropdown></FilterDropdown>
        <FilterDropdown></FilterDropdown>
        <FilterDate></FilterDate>
      </div> */}
        <div className="resultpage-list">
          {isLoading ? (
            <div className="resultpage-list-loader">
              <ClipLoader
                size={45}
                color={"#4F4FC4"}
                loading={isLoading}
              ></ClipLoader>
            </div>
          ) : (
            result &&
            (result.length !== 0 ? (
              result.map((item, index) => {
                return (
                  <ResultItemContainer
                    key={index}
                    data={item}
                  ></ResultItemContainer>
                );
              })
            ) : (
              <div className="resultpage-list-empty">
                Your search - <b>{searchQuery}</b> - did not match any
                documents.
              </div>
            ))
          )}
        </div>
        <Pagination
          hideDisabled
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalResults}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => handlePageClick(pageNumber)}
          innerClass="resultpage-pagination"
          linkClass="resultpage-pagination-link"
          linkClassFirst="resultpage-pagination-first"
          linkClassLast="resultpage-pagination-last"
          activeLinkClass="resultpage-pagination-active"
        />
      </StyledResultPage>

      <Modal
        open={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        center
        showCloseIcon={true}
        classNames={{ modal: "addModal" }}
      >
        <AddAccounts></AddAccounts>
      </Modal>
    </>
  );
};

export default Resultpage;

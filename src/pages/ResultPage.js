import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import ResultItemContainer from "../components/search/ResultItemContainer";
// import FilterDropdown from "../components/filter/FilterDropdown";
// import FilterDate from "../components/filter/FilterDate";

const StyledResultPage = styled.div`
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
    max-width: 1000px;
    &-loader {
      display: flex;
      justify-content: center;
      padding: 100px 0px;
    }
    &-empty {
      color: rgba(0, 0, 0, 0.65);
      font-size: 24px;
      letter-spacing: 0;
      line-height: 26px;
      text-align: center;
      padding: 50px 0px;
    }
  }
`;

const ResultPage = () => {
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const searchResult = useSelector((store) => store.search.searchResult);
  const isLoading = searchResult.loading;
  const result = searchResult.result.results;
  return (
    <StyledResultPage>
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
              Your search - <b>{searchQuery}</b> - did not match any documents.
            </div>
          ))
        )}
      </div>
    </StyledResultPage>
  );
};

export default ResultPage;

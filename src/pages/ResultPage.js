import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import ResultItemContainer from "../components/search/ResultItemContainer";

const StyledResultPage = styled.div`
  width: 70%;
  margin: auto;
  .resultpage-filter {
    width: 100%;
    padding: 20px 0px;
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
  }
`;

const ResultPage = () => {
  const searchResult = useSelector((store) => store.search.searchResult);
  const isLoading = searchResult.loading;
  const result = searchResult.result.results;
  return (
    <StyledResultPage>
      <div className="resultpage-filter"></div>
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
          result.map((item, index) => {
            return (
              <ResultItemContainer
                key={index}
                data={item}
              ></ResultItemContainer>
            );
          })
        )}
      </div>
    </StyledResultPage>
  );
};

export default ResultPage;

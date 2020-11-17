import React, { useState } from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";

import ResultItem from "./ResultItem";
import { gaEvent } from "../../utils/helper";

const StyledResultItemContainer = styled.div`
  border-bottom: 0.5px solid rgba(230, 6, 207, 0.2);
  .ReactCollapse--collapse {
    height: 0px;
    transition: height 200ms ease-in;
  }
`;

const SubResultItemContainer = styled.div`
  padding-left: 80px;
`;

const ResultItemContainer = ({ data }) => {
  const [openSubResult, setOpenSubResult] = useState(false);

  const handleOpenSubResult = (e) => {
    e.stopPropagation();
    gaEvent("Results", "Show thread");
    setOpenSubResult(!openSubResult);
  };

  return (
    <StyledResultItemContainer>
      <ResultItem
        data={data}
        subitem={false}
        handleOpenSubResult={handleOpenSubResult}
        openSubResult={openSubResult}
      ></ResultItem>
      <Collapse isOpened={openSubResult}>
        <SubResultItemContainer>
          {data.sub_results.map((item, index) => {
            return (
              <ResultItem key={index} data={item} subitem={true}></ResultItem>
            );
          })}
        </SubResultItemContainer>
      </Collapse>
    </StyledResultItemContainer>
  );
};

export default ResultItemContainer;

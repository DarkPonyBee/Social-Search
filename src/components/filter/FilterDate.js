import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { setSearchOrigin } from "../../redux/actions/search";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 0px 15px;
  margin: 0px auto;

  .input-range__track {
    background: #dde2ef;
    height: 0.5rem;
    border-radius: 0.5rem;
  }

  .input-range__track--active,
  .input-range__slider {
    background: #4f4fc4;
  }

  .input-range__slider {
    width: 16px;
    height: 16px;
    margin-top: -0.75rem;
    background-color: #ffffff;
    border: 4px solid rgba(99, 74, 199, 0.1);
  }

  .input-range__label-container {
    color: rgba(45, 46, 44, 0.67);
    font-size: 11px;
    letter-spacing: 0;
    line-height: 12px;
  }

  .input-range__slider-container {
    .input-range__label-container {
      color: #2d2e2c;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.17px;
      line-height: 13px;
    }
  }
`;

const FilterDate = () => {
  const tEarliest = useSelector(
    (store) => store.account.connectedAccount.result.earliest_date
  );
  const searchOrigin = useSelector((store) => store.search.searchOrigin);
  const [value, setValue] = useState(searchOrigin);

  let minDate = 0;
  let maxDate = 100;

  const getDateFromUnixTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    return date.getMonth() + 1 + "/" + date.getFullYear();
  };

  const getDate = (value) => {
    //console.log(value);
    if (value === 0) {
      return tEarliest ? getDateFromUnixTimestamp(tEarliest) : "now";
    } else if (value === maxDate) return "now";
    else {
      const tNow = Date.now();
      const date = new Date(
        Math.floor(tNow - ((tNow - tEarliest) * (100 - value)) / 100)
      );
      return date.getMonth() + 1 + "/" + date.getFullYear();
    }
  };

  return (
    <Container>
      <InputRange
        maxValue={maxDate}
        minValue={minDate}
        value={value}
        formatLabel={(value) => getDate(value)}
        onChange={(value) => setValue(value)}
        onChangeComplete={() => setSearchOrigin(value)}
      ></InputRange>
    </Container>
  );
};

export default FilterDate;

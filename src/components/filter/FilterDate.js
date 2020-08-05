import React, { useState } from "react";
import styled from "styled-components";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 0px 15px;
  margin: auto 0px auto auto;

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
  const [value, setValue] = useState(0);

  const getMonthDiff = () => {
    let months = 0;
    const d1 = new Date(2011, 0, 1);
    const d2 = new Date();
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  let minDate = 0;
  let maxDate = getMonthDiff();

  const getDate = (value) => {
    if (value === 0) return "2011";
    else if (value === maxDate) return "now";
    else {
      let currentDate = new Date(2011, 0, 1);
      let calcDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + value)
      );
      return calcDate.getMonth() + 1 + "/" + calcDate.getFullYear();
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
      ></InputRange>
    </Container>
  );
};

export default FilterDate;

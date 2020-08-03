import React, { useState } from "react";
import styled from "styled-components";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

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
    <InputRange
      maxValue={maxDate}
      minValue={minDate}
      value={value}
      formatLabel={(value) => getDate(value)}
      onChange={(value) => setValue(value)}
    ></InputRange>
  );
};

export default FilterDate;

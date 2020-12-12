import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { setSearchOrigin } from "../../redux/actions/search";
import { months, timeStamps } from "../../config.js";

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0px 15px;
  margin: 0px auto;
  display: flex;

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

  .zoom-container {
    margin: auto 0px auto 30px;

    .zoom-item {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      cursor: pointer;
      background: white;
      -webkit-box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.5);
      box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.5);
      border-radius: 3px;

      &:hover {
        -webkit-box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.75);
        box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.75);
      }
    }
  }
`;

const tNow = Date.now();

const FilterDate = () => {
  const searchOrigin = useSelector((store) => store.search.searchOrigin);
  const tEarliest = useSelector(
    (store) => store.account.connectedAccount.result.earliest_date
  );
  const [value, setValue] = useState(100);
  const [zoomLevel, setZoomLevel] = useState("full");

  const tMin = useRef(tEarliest);
  const tMax = useRef(tNow);

  const getEndpointsDateFromUnixTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    let formattedDate;

    if (zoomLevel === "full" || zoomLevel === "year") {
      formattedDate = months[date.getMonth()] + " " + date.getFullYear();
    } else if (zoomLevel === "month" || zoomLevel === "week") {
      formattedDate =
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear();
    }

    return formattedDate;
  };

  const getSliderDateFromUnixTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    let t, spl, hm, formattedDate;

    if (zoomLevel === "full" || zoomLevel === "year") {
      formattedDate = months[date.getMonth()] + " " + date.getFullYear();
    } else if (zoomLevel === "month") {
      formattedDate = date.getDate() + " " + months[date.getMonth()];
    } else if (zoomLevel === "week") {
      t = date.toLocaleTimeString("en-GB");
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      formattedDate = date.getDate() + " " + months[date.getMonth()] + " " + hm;
    }

    return formattedDate;
  };

  const getTimestampFromValue = (value) => {
    return Math.floor(
      tMax.current - ((tMax.current - tMin.current) * (100 - value)) / 100
    );
  };

  const getValueFromTimestamp = (timestamp) => {
    return Math.fround(
      100 - ((tMax.current - timestamp) * 100) / (tMax.current - tMin.current)
    );
  };

  const getDate = (value) => {
    if (value === 0) {
      return tMin.current
        ? getEndpointsDateFromUnixTimestamp(tMin.current)
        : "now";
    } else if (value === 100)
      return tMax.current && zoomLevel !== "full"
        ? getEndpointsDateFromUnixTimestamp(tMax.current)
        : "Now";
    else {
      return getSliderDateFromUnixTimestamp(getTimestampFromValue(value));
    }
  };

  const calcEndpoints = (delta) => {
    let new_tMin, new_tMax;

    if (searchOrigin + Math.floor(delta / 2) < tMax.current) {
      if (searchOrigin - Math.floor(delta / 2) > tMin.current) {
        new_tMin = searchOrigin - Math.floor(delta / 2);
        new_tMax = searchOrigin + Math.floor(delta / 2);
      } else {
        new_tMin = tMin.current;
        new_tMax = Math.min(tMax.current, tMin.current + delta);
      }
    } else {
      new_tMax = tMax.current;
      new_tMin = Math.max(tMin.current, tMax.current - delta);
    }
    tMin.current = new_tMin;
    tMax.current = new_tMax;
  };

  const handleZoomIn = () => {
    if (zoomLevel === "week") return;

    let delta;
    if (zoomLevel === "full") {
      delta = timeStamps.year;
    } else if (zoomLevel === "year") {
      delta = timeStamps.month;
    } else if (zoomLevel === "month") {
      delta = timeStamps.week;
    }

    calcEndpoints(delta);

    setValue(getValueFromTimestamp(searchOrigin));
    setZoomLevel((prev) => {
      if (prev === "full") {
        return "year";
      } else if (prev === "year") {
        return "month";
      } else if (prev === "month") {
        return "week";
      }
    });
  };

  const handleZoomOut = () => {
    if (zoomLevel === "full") return;

    let delta;
    if (zoomLevel === "week") {
      delta = timeStamps.month;
    } else if (zoomLevel === "month") {
      delta = timeStamps.year;
    }

    if (zoomLevel !== "year") {
      calcEndpoints(delta);
    } else {
      tMin.current = tEarliest;
      tMax.current = tNow;
    }

    setValue(getValueFromTimestamp(searchOrigin));
    setZoomLevel((prev) => {
      if (prev === "week") {
        return "month";
      } else if (prev === "month") {
        return "year";
      } else if (prev === "year") {
        return "full";
      }
    });
  };

  return (
    <Container>
      <InputRange
        maxValue={100}
        minValue={0}
        value={value}
        formatLabel={(value) => getDate(value)}
        onChange={(value) => setValue(value)}
        onChangeComplete={() => setSearchOrigin(getTimestampFromValue(value))}
        disabled={!tEarliest}
      ></InputRange>
      <div className="zoom-container">
        <div className="zoom-item" onClick={handleZoomIn}>
          +
        </div>
        <div className="zoom-item" onClick={handleZoomOut}>
          -
        </div>
      </div>
    </Container>
  );
};

export default FilterDate;

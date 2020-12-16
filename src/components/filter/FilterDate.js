import React, { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ReactTooltip from "react-tooltip";

import TIMESHIFTINFOIMG from "../../assets/images/timeshift-info-icon.svg";
import ZOOMINIMG from "../../assets/images/zoomin.svg";
import ZOOMOUTIMG from "../../assets/images/zoomout.svg";
import { setSearchOrigin } from "../../redux/actions/search";
import { months, monthTimeStamps } from "../../config.js";

const Container = styled.div`
  width: 100%;
  max-width: 425px;
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
    font-weight: bold !important;
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
      display: flex;
      user-select: none;
      cursor: pointer;

      img {
        margin: auto;

        &:hover {
          -webkit-box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.5);
          box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.5);
          border-radius: 50px;
        }
      }
    }
  }

  .info-icon {
    margin-right: 25px;
    cursor: pointer;
  }
`;

const tNow = Date.now();

const FilterDate = () => {
  const searchOrigin = useSelector((store) => store.search.searchOrigin);
  const tEarliest = useSelector(
    (store) => store.account.connectedAccount.result.earliest_date
  );
  const [value, setValue] = useState(100);
  const [zoomLevel, setZoomLevel] = useState(false);

  const tMin = useRef(tEarliest);
  const tMax = useRef(tNow);

  const checkInitialPeriod = useMemo(
    () => tNow - tEarliest >= 2 * monthTimeStamps,
    [tEarliest]
  );

  const getEndpointsDateFromUnixTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    let formattedDate;

    let mmm = months[date.getMonth()];
    let yy = date.getFullYear().toString().substr(-2);
    formattedDate = mmm + " " + yy;

    return formattedDate;
  };

  const getSliderDateFromUnixTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    let formattedDate;

    let dd = date.getDate();
    let mmm = months[date.getMonth()];
    let yy = date.getFullYear().toString().substr(-2);
    formattedDate = dd + " " + mmm + " " + yy;

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
        : "Now";
    } else if (value === 100)
      return tMax.current && zoomLevel
        ? getEndpointsDateFromUnixTimestamp(tMax.current)
        : "Now";
    else {
      return getSliderDateFromUnixTimestamp(getTimestampFromValue(value));
    }
  };

  const calcEndpoints = (delta) => {
    let new_tMin, new_tMax;

    if (searchOrigin + delta < tMax.current) {
      if (searchOrigin - delta > tMin.current) {
        new_tMin = searchOrigin - delta;
        new_tMax = searchOrigin + delta;
      } else {
        new_tMin = tMin.current;
        new_tMax = Math.min(tMax.current, tMin.current + 2 * delta);
      }
    } else {
      new_tMax = tMax.current;
      new_tMin = Math.max(tMin.current, tMax.current - 2 * delta);
    }
    tMin.current = new_tMin;
    tMax.current = new_tMax;
  };

  const handleZoomIn = () => {
    if (zoomLevel) return;
    calcEndpoints(monthTimeStamps);
    setValue(getValueFromTimestamp(searchOrigin));
    setZoomLevel(true);
  };

  const handleZoomOut = () => {
    if (!zoomLevel) return;
    tMin.current = tEarliest;
    tMax.current = tNow;
    setValue(getValueFromTimestamp(searchOrigin));
    setZoomLevel(false);
  };

  return (
    <Container>
      <div className="info-icon">
        <img
          src={TIMESHIFTINFOIMG}
          alt="TimeShiftInfoIcon"
          data-for="timshiftinfo"
          data-tip="Slide left or right to focus your search around a specific point in time. Results closer to the selected time are prioritized. Use +/- to zoom in and out on the slider's resolution and pick the precise time you want."
        />
        <ReactTooltip
          id="timshiftinfo"
          effect="solid"
          clickable={true}
          html={true}
          className="customToolTip"
          backgroundColor="white"
          textColor="black"
        ></ReactTooltip>
      </div>
      <InputRange
        maxValue={100}
        minValue={0}
        value={value}
        formatLabel={(value) => getDate(value)}
        onChange={(value) => setValue(value)}
        onChangeComplete={() => setSearchOrigin(getTimestampFromValue(value))}
        disabled={!tEarliest}
      ></InputRange>
      {checkInitialPeriod && (
        <div className="zoom-container">
          <div className="zoom-item" onClick={handleZoomIn}>
            <img src={ZOOMINIMG} alt="ZoomInImage" />
          </div>
          <div className="zoom-item" onClick={handleZoomOut}>
            <img src={ZOOMOUTIMG} alt="ZoomOutImage" />
          </div>
        </div>
      )}
    </Container>
  );
};

export default FilterDate;

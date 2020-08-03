import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { availableIcons } from "../../config";
import RESULT from "../../assets/images/result.png";
import FILE from "../../assets/images/result1.png";

const StyledResultItem = styled.div`
  padding: 25px 0px;
  display: flex;
  ${(props) =>
    props.subitem ? "border-top: 0.5px solid rgba(117, 119, 115, 0.4);" : ""};
  .resultitem {
    &-header {
      width: 80px;
      padding: 0px 10px;
      &-date {
        padding-bottom: 5px;
        color: rgba(45, 46, 44, 0.51);
        font-size: 12px;
        letter-spacing: 0.17px;
        line-height: 15px;
        text-align: center;
      }
      &-icon {
        img {
          width: 100%;
        }
      }
    }
    &-content {
      width: 100%;
      padding: 0px 10px;
      &-container {
        padding-bottom: 5px;
        display: flex;
        font-size: 13px;
        letter-spacing: -0.3px;
        line-height: 16px;
        color: rgba(45, 46, 44, 0.5);
        &-icon {
          display: flex;
          width: 16px;
          img {
            width: 100%;
            margin: auto;
          }
        }
        ul {
          display: flex;
          padding-left: 10px;
          margin: auto 0px;
          list-style: none;
          li {
            &:after {
              content: "";
              border: solid #e606cf;
              border-width: 0 2px 2px 0;
              display: inline-block;
              padding: 2px;
              margin: auto 5px;
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
            &:last-child:after {
              display: none;
            }
          }
        }
      }
      &-title {
        padding-bottom: 10px;
        display: flex;
        color: rgba(0, 0, 0, 0.65);
        &-filename {
          margin: auto 0px;
          padding-right: 15px;
          border-right: 1px solid #979797;
          font-size: 20px;
          letter-spacing: -0.45px;
          line-height: 24px;
        }
        &-users {
          margin: auto 0px;
          padding-left: 15px;
          font-size: 17px;
          letter-spacing: -0.39px;
          line-height: 21px;
        }
        &-thread {
          margin-left: auto;
          display: flex;
          font-size: 11px;
          letter-spacing: -0.25px;
          line-height: 23px;
          color: #2d2e2c;
          &-count {
            margin: auto 5px auto 0px;
            font-size: 8px;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            border: 0.5px solid #4f4fc4;
            border-radius: 50%;
            color: #4f4fc4;
            font-weight: bold;
          }
          &:after {
            content: "";
            border: solid #4f4fc4;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 2px;
            margin: auto 5px;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
          }
          &:hover {
            cursor: pointer;
          }
          &-active {
            background-color: #4f4fc4;
            border-radius: 9px;
            color: white;
            .resultitem-content-title-thread-count {
              color: white;
            }
            &:after {
              border-color: white;
            }
          }
        }
        b {
          color: #4f4fc4;
        }
      }
      &-snippet {
        padding-bottom: 10px;
        color: rgba(45, 46, 44, 0.8);
        font-size: 14px;
        letter-spacing: -0.32px;
        line-height: 17px;
      }
      &-link {
        display: inline-flex;
        padding: 1px 7px;
        border: 0.5px solid rgba(87, 88, 86, 0.48);
        border-radius: 11px;
        color: #2d2e2c;
        font-size: 10px;
        letter-spacing: -0.23px;
        line-height: 20px;
        &-icon {
          margin: auto 0px;
          padding-right: 5px;
          display: flex;
          width: 17px;
          img {
            margin: auto;
            width: 100%;
          }
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const ResultItem = ({ data, subitem, handleOpenSubResult, openSubResult }) => {
  const searchQuery = useSelector((store) => store.search.searchQuery);

  const highLightText = (text, query) => {
    if (typeof text === "object") {
      let temp = text.join("");
      text = temp;
    }
    let highLightedText = text;
    let index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index >= 0) {
      highLightedText = (
        <>
          {text.substring(0, index)}
          <b>{text.substring(index, index + query.length)}</b>
          {text.substring(index + query.length)}
        </>
      );
    }
    return highLightedText;
  };

  const getDateObject = (text) => {
    return new Date(Date.parse(text));
  };

  return (
    <StyledResultItem subitem={subitem}>
      <div className="resultitem-header">
        <div className="resultitem-header-date">
          {data.date &&
            getDateObject(data.date).getMonth() +
              "/" +
              getDateObject(data.date).getFullYear()}
        </div>
        <div className="resultitem-header-icon">
          <img src={RESULT} alt="Result Icon"></img>
        </div>
      </div>
      <div className="resultitem-content">
        <div className="resultitem-content-container">
          <div className="resultitem-content-container-icon">
            <img src={availableIcons[data.source]} alt={data.source}></img>
          </div>
          <ul>
            {data.containers.map((item, index) => {
              return <li key={index}>{item.name}</li>;
            })}
          </ul>
        </div>
        <div className="resultitem-content-title">
          <div className="resultitem-content-title-filename">
            {data.title && highLightText(data.title, searchQuery)}
          </div>
          <div className="resultitem-content-title-users">
            {data.users &&
              highLightText(data.users.join(", "), data.primary_user)}
          </div>
          {data.sub_results && (
            <div
              className={`resultitem-content-title-thread ${
                openSubResult ? "resultitem-content-title-thread-active" : ""
              }`}
              onClick={handleOpenSubResult}
            >
              <div className="resultitem-content-title-thread-count">
                +{data.sub_results.length}
              </div>
              {openSubResult ? "Hide thread" : "Show thread"}
            </div>
          )}
        </div>
        <div className="resultitem-content-snippet">
          {highLightText(data.snippet, searchQuery)}
        </div>
        {data.content_kind === "file" && (
          <div className="resultitem-content-link">
            <div className="resultitem-content-link-icon">
              <img src={FILE} alt="file"></img>
            </div>
            {data.title}
          </div>
        )}
      </div>
    </StyledResultItem>
  );
};

export default ResultItem;

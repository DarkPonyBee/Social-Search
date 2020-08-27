import React from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";
import renderHTML from "react-render-html";

import { availableIcons } from "../../config";
import { contentType, contentKind, contentDefaultIcon } from "../../config";

const StyledResultItem = styled.div`
  padding: 25px 0px;
  ${(props) =>
    props.subitem ? "border-top: 0.5px solid rgba(117, 119, 115, 0.4);" : ""};
  .resultitem {
    &-header {
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
        display: flex;
        width: 60px;
        img {
          margin: auto;
          max-width: 60px;
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
          em {
            font-weight: bold;
            color: #4f4fc4;
          }
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
              transform: rotate(-135deg);
              -webkit-transform: rotate(-135deg);
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
        em {
          font-weight: bold;
          color: #4f4fc4;
        }
      }
      &-link {
        display: inline-flex;
        margin-right: 5px;
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
          height: 17px;
          img {
            margin: auto;
            width: 100%;
          }
        }
        transition: all ease 0.3s;
        &:hover {
          cursor: pointer;
          border-color: #4f4fc4;
          background-color: #4f4fc4;
          color: #ffffff;
        }
      }
    }
  }

  .resultitem-content-main {
    &:hover {
      .resultitem-content-title-filename {
        text-decoration: underline;
        text-decoration-color: #4f4fc4;
      }
    }
  }

  .resultitem-content {
    &-container {
      &:hover {
        text-decoration: underline;
        text-decoration-color: #4f4fc4;
      }
    }
  }
`;
const StyledResultItemContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const ResultItem = ({ data, subitem, handleOpenSubResult, openSubResult }) => {
  // const searchQuery = useSelector((store) => store.search.searchQuery);

  const replaceText = (text, startindex, endindex) => {
    return (
      text.substring(0, startindex) +
      "{{" +
      text.substring(startindex + 1, endindex - 1) +
      "}}" +
      text.substring(endindex)
    );
  };

  const strapingHTML = (text) => {
    let temp = text;
    let patt = /<[^>][em]+>/g;
    let match = null;
    while ((match = patt.exec(temp))) {
      temp = replaceText(temp, match.index, patt.lastIndex);
    }
    temp = temp.replace(/</g, "&lt;");
    temp = temp.replace(/>/g, "&gt;");
    temp = temp.replace(/{{/g, "<");
    temp = temp.replace(/}}/g, ">");
    return temp;
  };

  const checkObject = (text) => {
    if (text == null) {
      text = "";
    }
    if (typeof text === "object") {
      let temp = text.join("");
      text = temp;
    }
    return text;
  };

  const highLightText = (text, query) => {
    if (text == null) {
      text = "";
    }
    if (query == null) {
      query = "";
    }
    // if (typeof text === "object") {
    //   let temp = text.join("");
    //   text = temp;
    // }
    let highLightedText = text;
    let index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index >= 0) {
      highLightedText =
        text.substring(0, index) +
        "<b>" +
        text.substring(index, index + query.length) +
        "</b>" +
        text.substring(index + query.length);
    }
    return highLightedText;
  };

  function isYesterday(dateObj) {
    let currentDateObj = new Date();
    if (
      (dateObj.getDay() === currentDateObj.getDay() - 1 ||
        (dateObj.getDay() === 6 && currentDateObj.getDay() === 0)) &&
      Math.abs(currentDateObj.getTime() - dateObj.getTime()) <
        1000 * 3600 * 24 * 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isTomorrow(dateObj) {
    let currentDateObj = new Date();
    if (
      (dateObj.getDay() === currentDateObj.getDay() + 1 ||
        (dateObj.getDay() === 0 && currentDateObj.getDay() === 6)) &&
      Math.abs(currentDateObj.getTime() - dateObj.getTime()) <
        1000 * 3600 * 24 * 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  function getFormattedDate(isoDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let currentDateObj = new Date();
    let isoDateObj = new Date(isoDate + "Z");
    let t, spl, hm, am_pm, formattedDate;
    if (
      isoDateObj.getFullYear() === currentDateObj.getFullYear() &&
      isoDateObj.getMonth() === currentDateObj.getMonth() &&
      isoDateObj.getDate() === currentDateObj.getDate()
    ) {
      //today

      t = isoDateObj.toLocaleTimeString();
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      am_pm = spl[1];
      formattedDate = "Today " + hm + " " + am_pm;
    } else if (isYesterday(isoDateObj)) {
      //yesterday
      t = isoDateObj.toLocaleTimeString();
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      am_pm = spl[1];
      formattedDate = "Yesterday " + hm + " " + am_pm;
    } else if (isTomorrow(isoDateObj)) {
      //tomorrow
      t = isoDateObj.toLocaleTimeString();
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      am_pm = spl[1];
      formattedDate = "Tomorrow " + hm + " " + am_pm;
    } else if (
      Math.abs(currentDateObj.getTime() - isoDateObj.getTime()) <
      1000 * 3600 * 24 * (currentDateObj.getDay() + 1)
    ) {
      //this week
      t = isoDateObj.toLocaleTimeString();
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      am_pm = spl[1];
      formattedDate = days[isoDateObj.getDay()] + " " + hm + " " + am_pm;
    } else if (
      isoDateObj.getFullYear() === currentDateObj.getFullYear() &&
      isoDateObj.getMonth() === currentDateObj.getMonth()
    ) {
      //this month

      formattedDate =
        months[isoDateObj.getMonth()] + " " + isoDateObj.getDate();
    } else if (isoDateObj.getFullYear() === currentDateObj.getFullYear()) {
      //this year
      formattedDate =
        months[isoDateObj.getMonth()] + " " + isoDateObj.getDate();
    } else {
      formattedDate = isoDateObj.toLocaleDateString();
    }

    return formattedDate;
  }

  function getDateWithoutTime(formattedDate) {
    let spl = formattedDate.split(":");
    if (spl.length > 1) {
      return spl[0].slice(0, spl[0].length - 2);
    } else {
      return formattedDate;
    }
  }

  const getResultIcon = (kind, type) => {
    let find = contentType.find((item) => item.value === type);

    if (find) return find.icon;
    else if (find == null)
      find = contentKind.find((item) => item.value === kind);

    if (find) return find.icon;
    else if (find == null) return contentDefaultIcon;
  };

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <StyledResultItem subitem={subitem}>
      <StyledResultItemContainer>
        <div className="resultitem-header">
          {data.date && (
            <div className="resultitem-header-date">
              {getDateWithoutTime(getFormattedDate(data.date))}
            </div>
          )}
          <div
            className="resultitem-header-icon"
            onClick={() => openNewTab(data.link)}
          >
            <img
              src={getResultIcon(data.content_kind, data.content_type)}
              alt="Result Icon"
            ></img>
          </div>
        </div>
        <div className="resultitem-content">
          <div
            className="resultitem-content-container"
            onClick={() => openNewTab(data.container.link)}
          >
            <div className="resultitem-content-container-icon">
              <img src={availableIcons[data.source]} alt={data.source}></img>
            </div>
            <ul>
              {data.containers.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
            </ul>
          </div>
          <div className="resultitem-content-main">
            <div
              className="resultitem-content-title"
              onClick={() => openNewTab(data.link)}
            >
              <div className="resultitem-content-title-filename">
                {/* {renderHTML(
                data.title ? highLightText(data.title, searchQuery) : ""
              )} */}
                {renderHTML(data.title ? checkObject(data.title) : "")}
              </div>
              <div className="resultitem-content-title-users">
                {/* {renderHTML(
                data.users
                  ? highLightText(data.users.join(", "), data.primary_user)
                  : ""
              )} */}
                {renderHTML(
                  data.users
                    ? highLightText(data.users.join(", "), data.primary_user)
                    : ""
                )}
              </div>
              {data.sub_results && data.sub_results.length !== 0 && (
                <div
                  className={`resultitem-content-title-thread ${
                    openSubResult
                      ? "resultitem-content-title-thread-active"
                      : ""
                  }`}
                  onClick={(e) => handleOpenSubResult(e)}
                >
                  <div className="resultitem-content-title-thread-count">
                    +{data.sub_results.length}
                  </div>
                  {openSubResult
                    ? `Hide ${
                        data.content_kind === "file" ? "copies" : "thread"
                      }`
                    : `Show ${
                        data.content_kind === "file" ? "copies" : "thread"
                      }`}
                </div>
              )}
            </div>
            <div
              className="resultitem-content-snippet"
              onClick={() => openNewTab(data.link)}
            >
              {/* {renderHTML(highLightText(data.snippet, searchQuery))} */}
              {/* {renderHTML(data.snippet ? checkObject(data.snippet) : "")} */}
              {renderHTML(
                strapingHTML(data.snippet ? checkObject(data.snippet) : "")
              )}
            </div>
          </div>
          {data.attachments &&
            data.attachments.map((item, index) => {
              return (
                <div
                  key={index}
                  className="resultitem-content-link"
                  onClick={() => openNewTab(item.link)}
                >
                  <div className="resultitem-content-link-icon">
                    <img
                      src={getResultIcon(item.content_kind, item.content_type)}
                      alt="file"
                    ></img>
                  </div>
                  {item.title}
                </div>
              );
            })}
        </div>
      </StyledResultItemContainer>
    </StyledResultItem>
  );
};

export default ResultItem;

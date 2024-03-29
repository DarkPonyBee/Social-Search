import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import ReactTooltip from "react-tooltip";
import sanitizeHtml from "sanitize-html-react";
import Truncate from "react-truncate";

import { availableIcons } from "../../config";
import {
  contentType,
  contentKind,
  contentDefaultIcon,
  months,
} from "../../config";

const StyledResultItem = styled.div`
  padding: 25px 0px;
  ${(props) =>
    props.subitem ? "border-top: 0.5px solid rgba(117, 119, 115, 0.4);" : ""};
  .resultitem {
    display: flex;
    cursor: pointer;
    position: relative;

    &-header {
      padding: 0px 6px;
      &-date {
        padding-bottom: 5px;
        color: rgba(45, 46, 44, 0.7);
        font-size: 11px;
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
      width: calc(100% - 85px);
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
            height: 100%;
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
              content: ",";
              color: #e606cf;
              padding: 0px 2px;
              display: inline-block;
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
          max-width: 70%;
          margin: auto 0px;
          letter-spacing: -0.45px;
          line-height: 24px;
          &-container {
            font-size: 20px;
            white-space: nowrap;
            ${(props) => (props.titletruncate ? "overflow: hidden" : "")};
            ${(props) =>
              props.titletruncate ? "text-overflow: ellipsis" : ""};
            em {
              font-style: normal;
              font-weight: bold;
              color: #4f4fc4;
            }
          }
          &-truncate {
            font-size: 18px;
            visibility: hidden;
            height: 0px;
          }
        }
        &-split {
          width: 0.5px;
          min-width: 0.5px;
          margin-left: 15px;
          margin-right: 15px;
          background-color: #979797;
        }
        &-users {
          width: 100%;
          margin: auto 0px;
          letter-spacing: -0.39px;
          line-height: 21px;
          font-size: 17px;
          white-space: nowrap;
          ${(props) => (props.usertruncate ? "overflow: hidden" : "")};
          ${(props) => (props.usertruncate ? "text-overflow: ellipsis" : "")};
          i {
            color: #4f4fc4;
            em {
              font-weight: bold;
            }
          }
          &-truncate {
            visibility: hidden;
            height: 0px;
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
          font-style: normal;
          font-weight: bold;
          color: #4f4fc4;
        }
      }
      &-link {
        display: inline-flex;
        margin-right: 5px;
        padding: 1px 7px;
        border: 0.5px solid #e606cf;
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
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
        }
      }
      &-extra {
        margin-top: 10px;
        font-size: 14px;
        letter-spacing: -0.32px;
        line-height: 17px;
        display: flex;
        flex-wrap: wrap;
        &__item {
          margin-right: 18px;
          &:last-child {
            margin-right: 0px;
          }
          &__title {
            color: #e606cf;
          }
        }
      }
    }
    &-thread {
      position: absolute;
      right: 0;
      top: -10px;
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
        .resultitem-thread-count {
          color: white;
        }
        &:after {
          border-color: white;
          transform: rotate(-135deg);
          -webkit-transform: rotate(-135deg);
        }
      }
    }
  }
  a {
    text-decoration-color: #4f4fc4;
  }
  /* .resultitem-content-main {
    &:hover {
      .resultitem-content-title-filename {
        text-decoration: underline;
        text-decoration-color: #4f4fc4;
      }
    }
  } */
`;

const ResultItem = ({ data, subitem, handleOpenSubResult, openSubResult }) => {
  const [titleTruncate, setTitleTruncate] = useState(false);
  const [userTruncate, setUserTruncate] = useState(false);

  const getExtraString = (extra) => {
    return extra.map((item, index) => (
      <div key={index} className="resultitem-content-extra__item">
        <span className="resultitem-content-extra__item__title">
          {item.display_name}{": "}
        </span>
        {item.type === "date" ? getFormattedDate(item.value) : item.value}
      </div>
    ));
  };

  const handleTruncate = (truncate, name) => {
    if (name === "title" && titleTruncate !== truncate) {
      setTitleTruncate(truncate);
    } else if (name === "user" && userTruncate !== truncate) {
      setUserTruncate(truncate);
    }
  };

  const strapingHTML = (text) => {
    return text.replace(/(<([^>]+)>)/gi, "");
  };

  const getTitle = (title) => {
    return title ? checkObject(title) : "";
  };

  const getUsers = () => {
    let primaryUser =
      data.primary_people?.length > 0
        ? "<i>" + data.primary_people.join(", ") + "</i>"
        : "";
    let secondaryUser =
      data.secondary_people?.length > 0 ? data.secondary_people.join(", ") : "";

    return (
      primaryUser +
      (primaryUser !== "" && secondaryUser !== "" ? ", " : "") +
      secondaryUser
    );
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

  // FOR THE SNIPPET
  const replaceTag = (text) => {
    let temp = text;
    temp = temp.replace(/&lt;/g, "<");
    temp = temp.replace(/&gt;/g, ">");
    return temp;
  };

  const getFormattedDate = (isoDate) => {
    let currentDateObj = new Date();
    let weekDateObj = new Date(Date.now() - 604800000);
    let isoDateObj = new Date(isoDate + "Z");
    let t, spl, hm, formattedDate;

    if (
      isoDateObj.getFullYear() === currentDateObj.getFullYear() &&
      isoDateObj.getMonth() === currentDateObj.getMonth() &&
      isoDateObj.getDate() === currentDateObj.getDate()
    ) {
      //today
      t = isoDateObj.toLocaleTimeString("en-GB");
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      formattedDate = hm;
    } else if (weekDateObj < isoDateObj) {
      //this week
      t = isoDateObj.toLocaleTimeString("en-GB");
      spl = t.split(" ");
      hm = spl[0].split(":")[0] + ":" + spl[0].split(":")[1];
      formattedDate =
        isoDateObj.getDate() + " " + months[isoDateObj.getMonth()] + " " + hm;
    } else if (isoDateObj.getFullYear() === currentDateObj.getFullYear()) {
      //this year
      formattedDate =
        isoDateObj.getDate() + " " + months[isoDateObj.getMonth()];
    } else {
      let dd = isoDateObj.getDate();
      let mmm = months[isoDateObj.getMonth()];
      let yy = isoDateObj.getFullYear().toString().substr(-2);
      formattedDate = dd + " " + mmm + " " + yy;
    }

    return formattedDate;
  };

  const getResultIcon = (kind, type) => {
    let find = contentType.find((item) => item.value === type);

    if (find) return find.icon;
    else if (find == null)
      find = contentKind.find((item) => item.value === kind);

    if (find) return find.icon;
    else if (find == null) return contentDefaultIcon;
  };

  const openNewTab = (url) => {
    if (url != null) window.open(url, "_blank");
    return;
  };

  return (
    <StyledResultItem
      subitem={subitem}
      titletruncate={titleTruncate}
      usertruncate={userTruncate}
    >
      <div className="resultitem">
        <div className="resultitem-header">
          {data.date && (
            <div className="resultitem-header-date">
              {getFormattedDate(data.date)}
            </div>
          )}
          <a
            className="resultitem-header-icon"
            href={data.link ? data.link : null}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={getResultIcon(data.content_kind, data.content_type)}
              alt="Result Icon"
            ></img>
          </a>
        </div>
        <div className="resultitem-content">
          <a
            className="resultitem-content-container"
            href={
              data.container && data.container.link ? data.container.link : null
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="resultitem-content-container-icon">
              <img src={availableIcons[data.source]} alt={data.source}></img>
            </div>
            <ul>
              {data.containers.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
            </ul>
          </a>
          <div className="resultitem-content-main">
            <a
              className="resultitem-content-title"
              href={data.link ? data.link : null}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div
                className="resultitem-content-title-filename"
                data-for="title"
                data-tip={
                  titleTruncate ? strapingHTML(getTitle(data.title)) : ""
                }
              >
                <div className="resultitem-content-title-filename-container">
                  {renderHTML(getTitle(data.title))}
                </div>
                <div className="resultitem-content-title-filename-truncate">
                  <Truncate
                    onTruncate={(truncate) => handleTruncate(truncate, "title")}
                  >
                    {renderHTML(getTitle(data.title))}
                  </Truncate>
                </div>
                <ReactTooltip
                  id="title"
                  place="bottom"
                  effect="float"
                  className="customToolTip"
                  backgroundColor="white"
                  textColor="black"
                />
              </div>
              {(data.primary_people?.length > 0 ||
                data.secondary_people?.length > 0) &&
                data.title !== "" && (
                  <div className="resultitem-content-title-split"></div>
                )}
              <div
                className="resultitem-content-title-users"
                data-for="user"
                data-tip={userTruncate ? strapingHTML(getUsers()) : ""}
              >
                {renderHTML(getUsers())}
                <div className="resultitem-content-title-users-truncate">
                  <Truncate
                    onTruncate={(truncate) => handleTruncate(truncate, "user")}
                  >
                    {strapingHTML(getUsers())}
                  </Truncate>
                </div>
                <ReactTooltip
                  id="user"
                  place="bottom"
                  effect="float"
                  className="customToolTip"
                  backgroundColor="white"
                  textColor="black"
                />
              </div>
            </a>
            <a
              className="resultitem-content-snippet"
              href={data.link ? data.link : null}
              rel="noopener noreferrer"
              target="_blank"
            >
              {renderHTML(
                sanitizeHtml(
                  replaceTag(data.snippet ? checkObject(data.snippet) : ""),
                  {
                    allowedTags: ["em"],
                  }
                )
              )}
            </a>
          </div>
          {data.attachments &&
            data.attachments.map((item, index) => {
              return (
                <div
                  key={index}
                  className="resultitem-content-link"
                  onClick={() => openNewTab(item.link ? item.link : null)}
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
          {data.extra_fields && data.extra_fields.length > 0 && (
            <div className="resultitem-content-extra">
              {getExtraString(data.extra_fields)}
            </div>
          )}
        </div>
        {data.sub_results && data.sub_results.length !== 0 && (
          <div
            className={`resultitem-thread ${openSubResult ? "resultitem-thread-active" : ""}`}
            onClick={(e) => handleOpenSubResult(e)}
          >
            <div className="resultitem-thread-count">
              +{data.sub_results.length}
            </div>
            {openSubResult
              ? `Hide ${data.content_kind === "file" ? "copies" : "thread"}`
              : `Show ${data.content_kind === "file" ? "copies" : "thread"}`}
          </div>
        )}
      </div>
    </StyledResultItem>
  );
};

export default ResultItem;

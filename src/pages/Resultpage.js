import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";

import { getSearchResult, setSearchQuery } from "../redux/actions/search";
import ResultItemContainer from "../components/search/ResultItemContainer";
import Header from "../components/layout/Header";
import { getParam } from "../utils/helper";
// import FilterDropdown from "../components/filter/FilterDropdown";
// import FilterDate from "../components/filter/FilterDate";

const StyledResultPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;

  .resultpage-filter {
    display: flex;
    width: 100%;
    padding: 35px 0px;
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
    max-width: 900px;
    padding-top: 40px;
    padding-bottom: 30px;

    &-loader {
      display: flex;
      justify-content: center;
      height: 50vh;
      padding: 100px 0px;
    }

    &-empty {
      height: 50vh;
      color: rgba(0, 0, 0, 0.65);
      font-size: 24px;
      letter-spacing: 0;
      line-height: 26px;
      text-align: center;
      padding: 50px 0px;
    }
  }

  .resultpage-pagination {
    display: ${(props) => (props.isloading ? "none" : "flex")};
    padding-left: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;

    &-link {
      padding: 6px 12px;
      line-height: 1.42857143;
      text-decoration: none;
      color: #4f4fc4;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;

      &:hover {
        color: #fff;
        background-color: #4f4fc4;
      }
    }

    &-active {
      color: #fff;
      background-color: #4f4fc4;
    }

    &-first {
      margin-left: 0;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    &-last {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
`;

// const result = [
//   {
//     source: "outlook",
//     content_kind: "email",
//     content_type: "email",
//     title: "RE: Questions to Founders",
//     date: "2019-01-01T18:00:12",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACcUyJmAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet:
//       "Hi all,\r\n\r\nFurther to our meeting, we are working on the Articles of Association, $200k investment <em>agreement</em>..., repurchase <em>agreements</em>, IP assignment <em>agreements</em> and  engagement <em>agreement</em> and  will check the availability...any decisions that will require the consent of all founders (i.e., amendment of charter documents, <em>agreement</em>...to enter into an investment <em>agreement</em>, distribution of dividend, change of the company's business, liquidation",
//     primary_user: "Keren Egozi",
//     users: [
//       "Keren Egozi",
//       "Alex Twersky",
//       "Dror Erez",
//       "Ran Rinat",
//       "Yuval Levison",
//     ],
//     containers: [
//       {
//         name: "Inbox",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//       },
//     ],
//     container: {
//       name: "Inbox",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//     },
//     sub_results: [
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "RE: Questions to Founders",
//         date: "2020-01-22T13:09:32",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbynAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Thanks Keren,\r\n\r\nWe accept most of your remarks \u2013 please see below\r\n\r\nFrom: Keren Or Cohen <kerenc@meitar.com>\r\nSent: Wednesday, 22 January 2020 12:42\r\nTo: Ran Rinat <ranrinat@akinasearch.com>; Dror Erez <drorerez@akinasearch.com>; Alex Twersky <alextwers",
//         primary_user: "Dror Erez",
//         users: [
//           "Dror Erez",
//           "Keren Or Cohen",
//           "Ran Rinat",
//           "Alex Twersky",
//           "Keren Egozi",
//           "Yuval Levison",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//       },
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "RE: Questions to Founders",
//         date: "2020-01-22T10:42:25",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Hi Ran,\r\nPlease see our comments in blue below.\r\n\r\nBest,\r\nKeren\r\n\r\nFrom: Ran Rinat [mailto:ranrinat@akinasearch.com]\r\nSent: Tuesday, January 21, 2020 4:50 PM\r\nTo: Keren Or Cohen <kerenc@meitar.com>; Alex Twersky <alextwersky@akinasearch.com>; Dror Erez <d",
//         primary_user: "Keren Or Cohen",
//         users: [
//           "Keren Or Cohen",
//           "Ran Rinat",
//           "Dror Erez",
//           "Alex Twersky",
//           "Keren Egozi",
//           "Yuval Levison",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//         attachments: [
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image001.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image002.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image003.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Founder Repurchase Agreement - aKina Ltd. - Alexander Twersky(10503626.2....docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Founder Repurchase Agreement - aKina Ltd. - Ran Rinat(10503582.3).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Ran Rinat Founders Employment Agreement - aKina Ltd.(10478854.4).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Dror Erez Founders Employment Agreement - aKina Ltd.(10478850.4).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbyfAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//         ],
//       },
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "RE: Questions to Founders",
//         date: "2020-01-22T07:43:23",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Hi Alex,\r\nPlease find attached the ancillaries (WORD versions)\r\n\r\nKeren\r\n\r\nFrom: Alex Twersky [mailto:alextwersky@akinasearch.com]\r\nSent: Tuesday, January 21, 2020 10:12 PM\r\nTo: Keren Or Cohen <kerenc@meitar.com>; Ran Rinat <ranrinat@akinasearch.com>; Dro",
//         primary_user: "Keren Or Cohen",
//         users: [
//           "Keren Or Cohen",
//           "Alex Twersky",
//           "Ran Rinat",
//           "Dror Erez",
//           "Yuval Levison",
//           "Keren Egozi",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//         attachments: [
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image001.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image002.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image003.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Founder Repurchase Agreement - aKina Ltd. - Dror Erez(10503580.3).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Founder Repurchase Agreement - aKina Ltd. - Ran Rinat(10503582.3).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Dror Erez Founders Employment Agreement - aKina Ltd.(10478850.4).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Founder Repurchase Agreement - aKina Ltd. - Alexander Twersky(10503626.2....docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Consulting Agreement - Alex Twersky - aKina Ltd.(10478849.6).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "Ran Rinat Founders Employment Agreement - aKina Ltd.(10478854.4).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title: "Founders IP Assigement - aKina(10478853.1).doc",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             title:
//               "aKina SH Resolution - Approval of SPA - Final 20 01 2020(10481040.2).docx",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAACuvbydAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     source: "outlook",
//     content_kind: "email",
//     content_type: "email",
//     title: ["SAFE <em>agreement</em>"],
//     date: "2020-07-08T07:29:41",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEZ02v3AAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet:
//       "For now we are thinking of additional $100,000\r\nWhat\u2019s the relevant parameters for SAFE <em>agreement</em> ?",
//     primary_user: "Dror Erez",
//     users: ["Dror Erez", "Keren Egozi", "me"],
//     containers: [
//       {
//         name: "Inbox",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//       },
//     ],
//     container: {
//       name: "Inbox",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//     },
//     sub_results: [
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "Re: SAFE agreement",
//         date: "2020-08-10T16:31:20",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tGAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Thanks Keren!\r\n\r\n\r\nAlex Twersky\r\n\r\nT 917.439.4008\r\nE alextwersky@trevi.io\r\nP Please consider the environment before printing this e-mail\r\n\r\n\r\nFrom: Keren Or Cohen <kerenc@meitar.com>\r\nDate: Monday, August 10, 2020 at 12:29\r\nTo: Alex Twersky <alextwersky@t",
//         primary_user: "Alex Twersky",
//         users: [
//           "Alex Twersky",
//           "Keren Or Cohen",
//           "Dror Erez",
//           "me",
//           "Keren Egozi",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//       },
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "RE: SAFE agreement",
//         date: "2020-08-10T16:29:48",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Hi all,\r\nPlease find attached the fully executed versions.\r\n\r\nThanks,\r\nKeren\r\n\r\nKeren Or Cohen, Adv.\r\nMeitar | Law Offices\r\n16 Abba Hillel Rd. Ramat Gan 5250608, ISRAEL\r\nTel - 972-3-6142679, Mobile - 972-505770646 Direct Fax - 972-3-61031111\r\nwww.meitar.c",
//         primary_user: "Keren Or Cohen",
//         users: [
//           "Keren Or Cohen",
//           "Alex Twersky",
//           "Dror Erez",
//           "me",
//           "Keren Egozi",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//         attachments: [
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image009.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image010.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image011.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image012.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image013.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image001.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "image/jpeg",
//             title: "image002.jpg",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "application/pdf",
//             title: "Advance Investment Agreement - Akina - August 10, 2020.pdf",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "application/pdf",
//             title:
//               "aKina Board Resolution - Approval of AIA [Meitar August 10, 2020](111248....pdf",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//           {
//             content_kind: "file",
//             content_type: "application/pdf",
//             title:
//               "aKina SH Resolution - Approval of AIA [Meitar August 10, 2020](11124888.....pdf",
//             link:
//               "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tFAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//           },
//         ],
//       },
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "Re: SAFE agreement",
//         date: "2020-08-10T16:28:06",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEvy4tEAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Thanks Keren! I have just signed. I assume you guys will send around fully executed versions once all signatures are collected?\r\n\r\n\r\nAlex Twersky\r\n\r\nT 917.439.4008\r\nE alextwersky@trevi.io\r\nP Please consider the environment before printing this e-mail",
//         primary_user: "Alex Twersky",
//         users: [
//           "Alex Twersky",
//           "Keren Or Cohen",
//           "Dror Erez",
//           "me",
//           "Keren Egozi",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//       },
//     ],
//   },
//   {
//     source: "gmail",
//     content_kind: "email",
//     content_type: "email",
//     title: ["New Online Banking Service <em>Agreement</em>"],
//     date: "2020-07-07T03:05:45",
//     link:
//       "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/173273c8e7f94fed",
//     snippet:
//       "Here are the details about our new Online Banking Service Agreement New Online Banking Service Agreement Bank of America logo New Online Banking Service Agreement We&#39;ve updated our Online Banking",
//     primary_user: "Bank of America",
//     users: ["Bank of America", "me"],
//     containers: [
//       {
//         name: "Inbox",
//       },
//     ],
//     container: {
//       name: "Inbox",
//     },
//     sub_results: [],
//   },
//   {
//     source: "outlook",
//     content_kind: "email",
//     content_type: "email",
//     title: ["Service <em>agreement</em>"],
//     date: "2020-02-20T11:58:57",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAADBIk0VAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet:
//       "Hi Yoram,\r\nI attached the clean version of our service <em>agreement</em>....hours in 100, let me know if that\u2019s ok (we can more by email)\r\nIf incorporated the proposal inside this <em>agreement</em>",
//     primary_user: "Dror Erez",
//     users: ["Dror Erez", "Yoram Rosner", "Ran Rinat"],
//     containers: [
//       {
//         name: "Inbox",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//       },
//     ],
//     container: {
//       name: "Inbox",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//     },
//     attachments: [
//       {
//         content_kind: "file",
//         content_type:
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         title: "Akina- 5vie Consulting Agreement(10594627.4).docx",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAADBIk0VAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//       },
//       {
//         content_kind: "file",
//         content_type: "text/plain",
//         title: "ATT00001.txt",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAADBIk0VAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//       },
//     ],
//     sub_results: [],
//   },
//   {
//     source: "outlook",
//     content_kind: "email",
//     content_type: "email",
//     title: ["Service <em>agreement</em>"],
//     date: "2020-02-17T06:54:29",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAC%2B7kMrAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet:
//       "Hi Yoram,\r\nAttached the service <em>agreement</em> from our lawyers\r\n\r\nLet me know if that\u2019s ok\r\n\r\nDror",
//     primary_user: "Dror Erez",
//     users: ["Dror Erez", "Yoram Rosner", "me"],
//     containers: [
//       {
//         name: "Inbox",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//       },
//     ],
//     container: {
//       name: "Inbox",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//     },
//     attachments: [
//       {
//         content_kind: "file",
//         content_type:
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         title: "Akina- 5vie Consulting Agreement(10594627.1).docx",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAC%2B7kMrAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//       },
//       {
//         content_kind: "file",
//         content_type: "text/plain",
//         title: "ATT00001.txt",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAC%2B7kMrAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//       },
//     ],
//     sub_results: [
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "Re: Service agreement",
//         date: "2020-02-18T09:24:30",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAC%2F8pgzAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Ok, no problem.\r\n\r\nOn Tue, Feb 18, 2020 at 11:07 AM Dror Erez <drorerez@akinasearch.com> wrote:\r\nHi Yoram,\r\nIgnore this, I didn't notice it is still with the remarks and changes\r\nI'll send you a clean version shortly\r\n\r\nThanks\r\n\r\n-----Original Message----",
//         primary_user: "Yoram Rosner",
//         users: ["Yoram Rosner", "Dror Erez", "Ran Rinat"],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//       },
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "RE: Service agreement ",
//         date: "2020-02-18T09:07:35",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAC%2F8pgyAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet:
//           "Hi Yoram,\r\nIgnore this, I didn't notice it is still with the remarks and changes\r\nI'll send you a clean version shortly\r\n\r\nThanks\r\n\r\n-----Original Message-----\r\nFrom: Dror Erez \r\nSent: Monday, 17 February 2020 8:54\r\nTo: Yoram Rosner <rosner@5advantage.com",
//         primary_user: "Dror Erez",
//         users: ["Dror Erez", "Yoram Rosner", "Ran Rinat"],
//         containers: [
//           {
//             name: "Inbox",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//           },
//         ],
//         container: {
//           name: "Inbox",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//         },
//       },
//     ],
//   },
//   {
//     source: "outlook",
//     content_kind: "email",
//     content_type: "email",
//     title: ["Call re  SAFE <em>agreement</em>"],
//     date: "2020-07-21T12:46:04",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEiFtQ5AAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet:
//       "https://meitar.zoom.us/j/97722397490?pwd=LzJIZzlQZFNwUUE2TUFkME9tZlF3UT09",
//     primary_user: "Keren Egozi",
//     users: ["Keren Egozi", "Alex Twersky", "Dror Erez", "me", "Keren Or Cohen"],
//     containers: [
//       {
//         name: "Inbox",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//       },
//     ],
//     container: {
//       name: "Inbox",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//     },
//     sub_results: [
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "Accepted: Call re  SAFE agreement",
//         date: "2020-07-20T05:51:29",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEJAAAt2gP1xWDwTK26ChytIibpAAEiDUxoAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet: "",
//         primary_user: "me",
//         users: ["me", "Keren Egozi"],
//         containers: [
//           {
//             name: "Sent Items",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEJAAA%3D",
//           },
//         ],
//         container: {
//           name: "Sent Items",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEJAAA%3D",
//         },
//       },
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "Call re  SAFE agreement",
//         date: "2020-07-20T05:51:06",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEKAAAt2gP1xWDwTK26ChytIibpAAEiDUh%2FAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet: "",
//         primary_user: "Keren Egozi",
//         users: [
//           "Keren Egozi",
//           "Alex Twersky",
//           "Dror Erez",
//           "me",
//           "Keren Or Cohen",
//         ],
//         containers: [
//           {
//             name: "Deleted Items",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEKAAA%3D",
//           },
//         ],
//         container: {
//           name: "Deleted Items",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEKAAA%3D",
//         },
//       },
//     ],
//   },
//   {
//     source: "gmail",
//     content_kind: "file",
//     content_type: "application/pdf",
//     title: "Agreement.pdf",
//     date: "2020-03-11T12:35:12",
//     link:
//       "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/170c9977cad940db",
//     snippet: "",
//     primary_user: "BezeqInternational@bezeqint.co.il",
//     users: ["BezeqInternational@bezeqint.co.il"],
//     containers: [
//       {
//         name: "Inbox",
//       },
//     ],
//     container: {
//       name: "Inbox",
//     },
//     sub_results: [],
//   },
//   {
//     source: "gmail",
//     content_kind: "email",
//     content_type: "email",
//     title: ["<em>Agreement</em> / $5K wire"],
//     date: "2020-03-10T14:27:13",
//     link:
//       "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/170c4d7b7a4a0637",
//     snippet:
//       "Our lawyer has put together the attached <em>agreement</em> for you to sign....person for the companies indicated) please sign in all of the places marked in yellow and scan/email the <em>agreement</em>...we will be paying you $5,000 once we get some basic information from you and once you sign a simple <em>agreement</em>",
//     primary_user: "Alex Twersky",
//     users: ["Alex Twersky", "Dattatray Suryawanshi", " Archana Mahajan", "me"],
//     containers: [
//       {
//         name: "Inbox",
//       },
//     ],
//     container: {
//       name: "Inbox",
//     },
//     attachments: [
//       {
//         content_kind: "file",
//         content_type:
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         title: "Release Agreement_March 9 2020.docx",
//         link:
//           "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/170c4d7b7a4a0637",
//       },
//     ],
//     sub_results: [
//       {
//         source: "gmail",
//         content_kind: "email",
//         content_type: "email",
//         title: "Re: Agreement / $5K wire",
//         date: "2020-03-22T18:31:40",
//         link:
//           "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/1710383d26c0b43e",
//         snippet:
//           "Thanks Datta! Alex Twersky Kinetic Arts 306 Gold Street #5i Brooklyn, NY 11201 T 917.439.4008 E alex@kineticarts.tv Skype: alextwersky www.kineticarts.tv P Please consider the environment before",
//         primary_user: "Alex Twersky",
//         users: [
//           "Alex Twersky",
//           "Dattatray Suryawanshi",
//           " Archana Mahajan",
//           "me",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//           },
//         ],
//         container: {
//           name: "Inbox",
//         },
//       },
//       {
//         source: "gmail",
//         content_kind: "email",
//         content_type: "email",
//         title: "Re: Agreement / $5K wire",
//         date: "2020-03-22T15:25:01",
//         link:
//           "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/17102d8f998fef55",
//         snippet:
//           "Hi Alex and Ran. Apologize for delay for generating invoice. PFA the attached invoice as discussed. Regards, Datta. From: Alex Twersky &lt;alex@kineticarts.tv&gt; Date: Wednesday, 18 March 2020 at 8:02",
//         primary_user: "Dattatray Suryawanshi",
//         users: [
//           "Dattatray Suryawanshi",
//           "Alex Twersky",
//           " Archana Mahajan",
//           "me",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//           },
//         ],
//         container: {
//           name: "Inbox",
//         },
//         attachments: [
//           {
//             content_kind: "file",
//             content_type: "application/pdf",
//             title: "InvoiceAkina.pdf",
//             link:
//               "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/17102d8f998fef55",
//           },
//         ],
//       },
//       {
//         source: "gmail",
//         content_kind: "email",
//         content_type: "email",
//         title: "Re: Agreement / $5K wire",
//         date: "2020-03-18T14:32:02",
//         link:
//           "https://mail.google.com/mail?authuser=ranrinat@gmail.com#all/170ee0f005153143",
//         snippet:
//           "Hi Datta / Archana, The agreement is officially approved! We just need you to provide an invoice from your company for the $5K payment, and then we can wire the funds. You can make the invoice to aKina",
//         primary_user: "Alex Twersky",
//         users: [
//           "Alex Twersky",
//           "Dattatray Suryawanshi",
//           " Archana Mahajan",
//           "me",
//         ],
//         containers: [
//           {
//             name: "Inbox",
//           },
//         ],
//         container: {
//           name: "Inbox",
//         },
//       },
//     ],
//   },
//   {
//     source: "outlook",
//     content_kind: "email",
//     content_type: "email",
//     title: ["Call re: SAFE <em>agreement</em> (trevi)"],
//     date: "2020-07-20T08:26:03",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEKAAAt2gP1xWDwTK26ChytIibpAAEiFv%2BaAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet: "",
//     primary_user: "Tali Yavin-Surasky",
//     users: ["Tali Yavin-Surasky", "Sara Weinberger", "Dror Erez", "me"],
//     containers: [
//       {
//         name: "Deleted Items",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEKAAA%3D",
//       },
//     ],
//     container: {
//       name: "Deleted Items",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEKAAA%3D",
//     },
//     sub_results: [
//       {
//         source: "outlook",
//         content_kind: "email",
//         content_type: "email",
//         title: "Accepted: Call re: SAFE agreement (trevi)",
//         date: "2020-07-20T09:53:57",
//         link:
//           "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEJAAAt2gP1xWDwTK26ChytIibpAAEiFvutAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//         snippet: "",
//         primary_user: "me",
//         users: ["me", "Tali Yavin-Surasky"],
//         containers: [
//           {
//             name: "Sent Items",
//             link:
//               "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEJAAA%3D",
//           },
//         ],
//         container: {
//           name: "Sent Items",
//           link:
//             "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEJAAA%3D",
//         },
//       },
//     ],
//   },
//   {
//     source: "outlook",
//     content_kind: "file",
//     content_type:
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     title: ["Consulting <em>Agreement</em> - Oz Moyal(10991837.4).docx"],
//     date: "2020-06-09T19:20:11",
//     link:
//       "https://outlook.office365.com/owa/?ItemID=AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgBGAAAAAACwrroobH8PTbyxZoQDU4SJBwAt2gP1xWDwTK26ChytIibpAAAAAAEMAAAt2gP1xWDwTK26ChytIibpAAEHTN2UAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//     snippet:
//       "- 2 -\nCONSULTING <em>AGREEMENT</em>\n\nTHIS <em>AGREEMENT</em> (the \u201c<em>Agreement</em>\u201d) is made on this [__] of [_____], 2020 between...The parties hereto hereby declare and approve, that this <em>Agreement</em> is a Contractors <em>Agreement</em> within...to pay the Company pursuant to this <em>Agreement</em> (including the Surplus Sum), any other <em>agreement</em>, any...Entire <em>Agreement</em>; Amendments....This <em>Agreement</em> constitutes the entire <em>agreement</em> between the Consultant and the Company with respect to",
//     primary_user: "Dror Erez",
//     users: ["Dror Erez"],
//     containers: [
//       {
//         name: "Inbox",
//         link:
//           "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//       },
//     ],
//     container: {
//       name: "Inbox",
//       link:
//         "https://outlook.office365.com/mail/AAMkADM0MDdmNGMxLTc0MjktNGFhMi04OTU4LTI5ZGQzZTIyODRkYgAuAAAAAACwrroobH8PTbyxZoQDU4SJAQAt2gP1xWDwTK26ChytIibpAAAAAAEMAAA%3D",
//     },
//     sub_results: [],
//   },
// ];

const Resultpage = () => {
  const [activePage, setActivePage] = useState(1);
  const history = useHistory();
  const searchQuery = getParam("q");
  const searchResult = useSelector((store) => store.search.searchResult);
  const isLoading = searchResult.loading;
  const result = searchResult?.result.results || 0;
  const totalResults = searchResult?.result.total_results || 0;

  useEffect(() => {
    setActivePage(1);
    setSearchQuery(searchQuery);
    getSearchResult(searchQuery);
  }, [searchQuery]);

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    let resultsCursor = (pageNumber - 1) * 10;
    getSearchResult(searchQuery, resultsCursor);
    history.push(`/result/?q=${searchQuery}&?page=${pageNumber}`);
  };

  return (
    <>
      <Header resultPage={true}></Header>
      <StyledResultPage isloading={isLoading}>
        {/* <div className="resultpage-filter">
        <FilterDropdown></FilterDropdown>
        <FilterDropdown></FilterDropdown>
        <FilterDropdown></FilterDropdown>
        <FilterDate></FilterDate>
      </div> */}
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
            (result.length !== 0 ? (
              result.map((item, index) => {
                return (
                  <ResultItemContainer
                    key={index}
                    data={item}
                  ></ResultItemContainer>
                );
              })
            ) : (
              <div className="resultpage-list-empty">
                Your search - <b>{searchQuery}</b> - did not match any
                documents.
              </div>
            ))
          )}
        </div>
        <Pagination
          hideDisabled
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalResults}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => handlePageClick(pageNumber)}
          innerClass="resultpage-pagination"
          linkClass="resultpage-pagination-link"
          linkClassFirst="resultpage-pagination-first"
          linkClassLast="resultpage-pagination-last"
          activeLinkClass="resultpage-pagination-active"
        />
      </StyledResultPage>
    </>
  );
};

export default Resultpage;

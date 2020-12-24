//This is the DEV config

import GMAILICON from "./assets/images/gmail.svg";
import GOOGLEDRIVEICON from "./assets/images/googledrive.svg";
import OUTLOOKICON from "./assets/images/outlook.svg";
import TEAMSICON from "./assets/images/teams.svg";
import SLACKICON from "./assets/images/slack.svg";
import DROPBOXICON from "./assets/images/dropbox.svg";
import ASANAICON from "./assets/images/asana.svg";
import ONEDRIVEICON from "./assets/images/onedrive.svg";
import MONDAYICON from "./assets/images/monday.svg";
import JIRAICON from "./assets/images/jira.svg";

import ICONCODEFILE from "./assets/images/icon-code-file.svg";
import ICONHTML from "./assets/images/icon-html.svg";
import ICONTEXTFILE from "./assets/images/icon-text-file.svg";
import ICONZIP from "./assets/images/icon-zip.svg";
import ICONPDF from "./assets/images/icon-pdf.svg";
import ICONWORD from "./assets/images/icon-word.svg";
import ICONPPT from "./assets/images/icon-ppt.svg";
import ICONEXEL from "./assets/images/icon-exel.svg";
import ICONAUDIO from "./assets/images/icon-audio.svg";
import ICONGDOC from "./assets/images/icon-gdoc.svg";
import ICONGSHEET from "./assets/images/icon-gsheet.svg";
import ICONGSLIDES from "./assets/images/icon-gslides.svg";
import ICONFILE from "./assets/images/icon-file.svg";
import ICONVIDEO from "./assets/images/icon-video.svg";
import ICONIMAGE from "./assets/images/icon-image.svg";
import ICONEMAIL from "./assets/images/icon-email.svg";
import ICONTASK from "./assets/images/icon-task.svg";
import ICONMESSAGE from "./assets/images/icon-message.svg";
import ICONCONTAINER from "./assets/images/icon-container.svg";
import ICONCHANNEL from "./assets/images/icon-channel.svg";
import ICONPROJECT from "./assets/images/icon-project.svg";
// import ICONFILEMULTIPLE from "./assets/images/icon-file-multiple.svg";
// import ICONEMAILMULTIPLE from "./assets/images/icon-email-multiple.svg";
import ICONFOLDER from "./assets/images/icon-folder.svg";
import ICONBOARD from "./assets/images/icon-board.svg";


const API_URL = "https://api-dev.trevi.io";
const recaptchaKey = "6LfmuLsZAAAAAMeV3ySEskoDnpB9aWnWRqRM0BlO";
const aws_user_pools_web_client_id = "73qek8ikcn8259uhbn1lvgslpv";
const aws_cognito_identity_pool_id = "us-east-1:209715472977";
const aws_user_pools_id = "us-east-1_kylhAkCDK";
const ga_trackingID = "UA-178487831-1";

const availableAccounts = [
  { name: "gmail", icon: GMAILICON, uiname: "Gmail" },
  { name: "gdrive", icon: GOOGLEDRIVEICON, uiname: "Google Drive" },
  {
    name: "outlook",
    icon: OUTLOOKICON,
    uiname: "Outlook",
  },
  {
    name: "teams",
    icon: TEAMSICON,
    uiname: "Teams",
  },
  {
    name: "onedrive",
    icon: ONEDRIVEICON,
    uiname: "One Drive",
  },
  { name: "slack", icon: SLACKICON, uiname: "Slack" },
  {
    name: "dropbox",
    icon: DROPBOXICON,
    uiname: "Dropbox",
  },
  {
    name: "asana",
    icon: ASANAICON,
    uiname: "Asana",
  },
  {
    name: "monday",
    icon: MONDAYICON,
    uiname: "Monday",
  },
  {
    name: "jira",
    icon: JIRAICON,
    uiname: "Jira",
  },
];

const availableIcons = {
  gmail: GMAILICON,
  gdrive: GOOGLEDRIVEICON,
  outlook: OUTLOOKICON,
  teams: TEAMSICON,
  slack: SLACKICON,
  dropbox: DROPBOXICON,
  asana: ASANAICON,
  onedrive: ONEDRIVEICON,
  monday: MONDAYICON,
  jira: JIRAICON
};

const contentType = [
  { value: "email", icon: ICONEMAIL },
  { value: "task", icon: ICONTASK },
  { value: "message", icon: ICONMESSAGE },
  { value: "file", icon: ICONFILE },
  { value: "container", icon: ICONCONTAINER },
  { value: "folder", icon: ICONFOLDER },
  { value: "application/pdf", icon: ICONPDF },
  { value: "application/zip", icon: ICONZIP },
  {
    value:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    icon: ICONWORD,
  },
  {
    value: "application/msword",
    icon: ICONWORD,
  },
  {
    value:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    icon: ICONPPT,
  },
  { value: "application/vnd.ms-powerpoint", icon: ICONPPT },
  {
    value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    icon: ICONEXEL,
  },
  { value: "application/vnd.ms-excel", icon: ICONEXEL },
  { value: "application/vnd.google-apps.document", icon: ICONGDOC },
  { value: "application/vnd.google-apps.presentation", icon: ICONGSLIDES },
  { value: "application/vnd.google-apps.spreadsheet", icon: ICONGSHEET },
  { value: "text/html", icon: ICONHTML },
  { value: "text/plain", icon: ICONTEXTFILE },
  { value: "application/rtf", icon: ICONTEXTFILE },
  { value: "text/calendar", icon: ICONTEXTFILE },
  { value: "code", icon: ICONCODEFILE },
  { value: "project", icon: ICONPROJECT },
  { value: "channel", icon: ICONCHANNEL },
  { value: "board", icon: ICONBOARD },
  { value: "image", icon: ICONIMAGE },
  { value: "video", icon: ICONVIDEO },
  { value: "audio", icon: ICONAUDIO },
];

const contentKind = [
  { value: "email", icon: ICONEMAIL },
  { value: "task", icon: ICONTASK },
  { value: "message", icon: ICONMESSAGE },
  { value: "file", icon: ICONFILE },
  { value: "container", icon: ICONCONTAINER },
];

const contentDefaultIcon = ICONFILE;

const redirectMSG = {
  200: "Account Connected",
  400: "Request is not valid",
  401: "No valid credential",
  409: "Account already exists",
  410: "Account is being deleted",
  500: "Server error",
};

const accountSyncIntervalTime = 4000;

const bugsnagKEY = "d59732c6f4888de4f0e260ab216b54dd";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthTimeStamps = 2629743000;

export {
  API_URL,
  availableAccounts,
  availableIcons,
  contentType,
  contentKind,
  contentDefaultIcon,
  recaptchaKey,
  aws_user_pools_web_client_id,
  aws_cognito_identity_pool_id,
  aws_user_pools_id,
  redirectMSG,
  accountSyncIntervalTime,
  bugsnagKEY,
  ga_trackingID,
  months,
  monthTimeStamps,
};

import GMAILICON from "./assets/images/gmail.png";
import GOOGLEDRIVEICON from "./assets/images/googledrive.png";
import OUTLOOKICON from "./assets/images/outlook.png";
import TEAMSICON from "./assets/images/teams.png";
import SLACKICON from "./assets/images/slack.svg";
import DROPBOXICON from "./assets/images/dropbox.png";
// import FACEBOOKICON from "./assets/images/facebook.png";
// import TRELLOICON from "./assets/images/trello.png";
// import ONEDRIVEICON from "./assets/images/onedrive.png";
// import GITHUBICON from "./assets/images/github.png";
// import ASANAICON from "./assets/images/asana.png";
// import JIRAICON from "./assets/images/jira.png";
// import TODOISTICON from "./assets/images/todoist.png";
// import BOXICON from "./assets/images/box.png";

import RESULTFOLDER from "./assets/images/result-folder.svg";
import RESULTGMAILS from "./assets/images/result-gmails.svg";
import RESULTGMAIL from "./assets/images/result-gmail.svg";
import RESULTMESSAGE from "./assets/images/result-message.svg";
import RESULTTASK from "./assets/images/result-task.svg";
import RESULTWORD from "./assets/images/result-word.svg";

let API_URL = "https://api-dev.trevi.io";

if (process.env.NODE_ENV === "development") {
  API_URL = "https://api-dev.trevi.io";
}

// if (process.env.NODE_ENV === "production") {
//   API_URL = "/api/v1";
// }

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
  { name: "slack", icon: SLACKICON, uiname: "Slack" },
  {
    name: "dropbox",
    icon: DROPBOXICON,
    uiname: "Dropbox",
  },
  // { name: "facebook", icon: FACEBOOKICON, uiname: "Facebook" },
  // { name: "trello", icon: TRELLOICON, uiname: "Trello" },
  // {
  //   name: "box",
  //   icon: BOXICON,
  //   uiname: "Box",
  // },
  // {
  //   name: "todoist",
  //   icon: TODOISTICON,
  //   uiname: "Todoist",
  // },
  // {
  //   name: "jira",
  //   icon: JIRAICON,
  //   uiname: "Jira",
  // },
  // {
  //   name: "asana",
  //   icon: ASANAICON,
  //   uiname: "Asana",
  // },
  // {
  //   name: "github",
  //   icon: GITHUBICON,
  //   uiname: "Github",
  // },
  // {
  //   name: "onedrive",
  //   icon: ONEDRIVEICON,
  //   uiname: "Microsoft OneDrive",
  // },
];

const availableIcons = {
  gmail: GMAILICON,
  gdrive: GOOGLEDRIVEICON,
  outlook: OUTLOOKICON,
  teams: TEAMSICON,
  slack: SLACKICON,
  dropbox: DROPBOXICON,
  // facebook: FACEBOOKICON,
  // trello: TRELLOICON,
  // box: BOXICON,
  // todoist: TODOISTICON,
  // jira: JIRAICON,
  // asana: ASANAICON,
  // github: GITHUBICON,
  // onedrive: ONEDRIVEICON,
};

const resultIcons = {
  folder: RESULTFOLDER,
  email: RESULTGMAIL,
  emails: RESULTGMAILS,
  message: RESULTMESSAGE,
  task: RESULTTASK,
  file: RESULTWORD,
};

//const recaptchaKey = "6LeTB7gZAAAAADFSIat8lXRfOSuZ7KlSaSbzIRW9";
const recaptchaKey = "6LfmuLsZAAAAAMeV3ySEskoDnpB9aWnWRqRM0BlO";


const userPoolID = "73qek8ikcn8259uhbn1lvgslpv";

const redirectMSG = {
  200: "Account Connected!",
  409: "Account already exists!",
  400: "Request is not valid!",
  401: "No valid credential!",
  500: "Server error!",
};

const accountSyncIntervalTime = 4000;

const bugsnagKEY = "d59732c6f4888de4f0e260ab216b54dd";

export {
  API_URL,
  availableAccounts,
  availableIcons,
  resultIcons,
  recaptchaKey,
  userPoolID,
  redirectMSG,
  accountSyncIntervalTime,
  bugsnagKEY,
};

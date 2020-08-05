import GMAILICON from "./assets/images/gmail.png";
import FACEBOOKICON from "./assets/images/facebook.png";
import SLACKICON from "./assets/images/slack.svg";
import TRELLOICON from "./assets/images/trello.png";
import GOOGLEDRIVEICON from "./assets/images/googledrive.png";
import DROPBOXICON from "./assets/images/dropbox.png";
import ONEDRIVEICON from "./assets/images/onedrive.png";
import GITHUBICON from "./assets/images/github.png";
import ASANAICON from "./assets/images/asana.png";
import JIRAICON from "./assets/images/jira.png";
import TODOISTICON from "./assets/images/todoist.png";
import BOXICON from "./assets/images/box.png";
import OUTLOOKICON from "./assets/images/outlook.png";

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
  { name: "facebook", icon: FACEBOOKICON, uiname: "Facebook" },
  { name: "slack", icon: SLACKICON, uiname: "Slack" },
  { name: "trello", icon: TRELLOICON, uiname: "Trello" },
  { name: "gdrive", icon: GOOGLEDRIVEICON, uiname: "Google Drive" },
  {
    name: "dropbox",
    icon: DROPBOXICON,
    uiname: "Dropbox",
  },
  {
    name: "outlook",
    icon: OUTLOOKICON,
    uiname: "Outlook",
  },
  {
    name: "box",
    icon: BOXICON,
    uiname: "Box",
  },
  {
    name: "todoist",
    icon: TODOISTICON,
    uiname: "Todoist",
  },
  {
    name: "jira",
    icon: JIRAICON,
    uiname: "Jira",
  },
  {
    name: "asana",
    icon: ASANAICON,
    uiname: "Asana",
  },
  {
    name: "github",
    icon: GITHUBICON,
    uiname: "Github",
  },
  {
    name: "onedrive",
    icon: ONEDRIVEICON,
    uiname: "Microsoft OneDrive",
  },
];

const availableIcons = {
  gmail: GMAILICON,
  facebook: FACEBOOKICON,
  slack: SLACKICON,
  trello: TRELLOICON,
  gdrive: GOOGLEDRIVEICON,
  dropbox: DROPBOXICON,
  outlook: OUTLOOKICON,
  box: BOXICON,
  todoist: TODOISTICON,
  jira: JIRAICON,
  asana: ASANAICON,
  github: GITHUBICON,
  onedrive: ONEDRIVEICON,
};

const resultIcons = {
  folder: RESULTFOLDER,
  email: RESULTGMAIL,
  emails: RESULTGMAILS,
  message: RESULTMESSAGE,
  task: RESULTTASK,
  file: RESULTWORD,
};

const recaptchaKey = "6Lf5068ZAAAAAFZSoYxadNmXWViMSQjUzTRhsZjY";

const userPoolID = "73qek8ikcn8259uhbn1lvgslpv";

const redirectMSG = {
  200: "Account Connected!",
  409: "Account already exists!",
  400: "Request is not valid!",
  401: "No valid credential!",
  500: "Server error!",
};

export {
  API_URL,
  availableAccounts,
  availableIcons,
  resultIcons,
  recaptchaKey,
  userPoolID,
  redirectMSG,
};

//Utility method to get the proper base URL from the environment
import config from "../../config";
import * as session from "../../utils/session";
//Base URL
export const baseURL = `${config}/api/`;
// export const zoomLambdaURL = "https://36huwrdes5.execute-api.us-east-2.amazonaws.com/stage1/zoom_connect";
// export const zoomLambdaURL = "//demo.kontess.com/zoom/create-meeting";
export const zoomLambdaURL = window.location.hostname + "/zoom/create-meeting";
// export const proxyUrl = "https://cors-anywhere.herokuapp.com/";
export const proxyUrl = "";

// Token Route
export const getTokenRoute = baseURL + "token/";
export const refreshTokenRoute = baseURL + "token/refresh/";

// Base User Routes
export const baseParticipantRoute = "participant/";
export const baseJudgeRoute = "judge/";
export const baseOrganizerRoute = "organizer/";
export const baseTeamRoute = "team/";

// Base Routes
export const participantRoute = baseURL + baseParticipantRoute;
export const judgeRoute = baseURL + baseJudgeRoute;
export const organizerRoute = baseURL + baseOrganizerRoute;
export const teamRoute = baseURL + baseTeamRoute;

//Req Header
export const reqHeader = async () => {
  let token = await session.getSessionToken();
  return {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: "Bearer " + token,
  };
};

//Req Header mutipart
export const reqHeaderMultipart = async () => {
  let token = await session.getSessionToken();
  return {
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
};

//Req Header login
export const reqHeaderOuter = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

// Participant Routes
export const participantGetRoute = function (id) {
  return participantRoute + id + "/";
};

export const participantLoginRoute = participantRoute + "login/";

export const teamRequestRoute = function (id) {
  return teamRoute + id + "/";
};

// Team Routes
export const teamCreateRequestRoute = function (id) {
  return participantRoute + id + "/create_team_request/";
};

export const teamJoinRoute = function (id) {
  return teamRoute + id + "/join_team/";
};

export const teamRequestAcceptRoute = function (id) {
  return teamRoute + id + "/accept_team_request/";
};

export const teamRequestRejectRoute = function (id) {
  return teamRoute + id + "/reject_team_request/";
};

// Judge Routes
export const judgeGetRoute = function (id) {
  return judgeRoute + id + "/";
};

export const judgeLoginRoute = judgeRoute + "login/";

// Organizer Routes
export const organizerGetRoute = function (id) {
  return organizerRoute + id + "/";
};

export const organizerLoginRoute = organizerRoute + "login/";

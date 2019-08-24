//Utility method to get the proper base URL from the environment
import config from '../../config';

//Base URL
export const baseURL = `${config}/api/`;

// Token Route
export const getTokenRoute = baseURL + "token/";

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


// Participant Routes
export const participantGetRoute = function(id) {
  return participantRoute + id + '/';
};

export const participantLoginRoute = participantRoute + 'login/';

export const teamRequestRoute = function(id) {
  return teamRoute + id + '/';
};


// Team Routes
export const teamGetRoute = function(id) {
  return teamRoute + id + '/createTeamRequest/';
};

export const teamRequestAcceptRoute = function(id) {
  return teamRoute + id + '/accept_team_request/';
};

export const teamRequestRejectRoute = function(id) {
  return teamRoute + id + '/reject_team_request/';
};


// Judge Routes
export const judgeGetRoute = function(id) {
  return judgeRoute + id + '/';
};

export const judgeLoginRoute = judgeRoute + 'login/';


// Organizer Routes
export const organizerGetRoute = function(id) {
  return organizerRoute + id + '/';
};

export const organizerLoginRoute = organizerRoute + 'login/';


import JudgeDataService from "../app/services/JudgeDataService";
import OrganizerDataService from "../app/services/OrganizerDataService";
import ParticipantDataService from "../app/services/ParticipantDataService";

import * as session from "./session";

export const getService = type => {
  let service;
  if (type === "participant") {
    service = ParticipantDataService;
  } else if (type === "organizer") {
    service = OrganizerDataService;
  } else if (type === "judge") {
    service = JudgeDataService;
  }
  return service;
};

export const getUserService = () => {
  let service;
  if (session.getUserType() === "participant") {
    service = ParticipantDataService;
  } else if (session.getUserType() === "organizer") {
    service = OrganizerDataService;
  } else if (session.getUserType() === "judge") {
    service = JudgeDataService;
  }
  return service;
};

import JudgeDataService from "../app/services/JudgeDataService";
import OrganizerDataService from "../app/services/OrganizerDataService";
import ParticipantDataService from "../app/services/ParticipantDataService";

import * as session from "./session";

export const getService = type => {
  let service;
  if (type === "Participant") {
    service = ParticipantDataService;
  } else if (type === "Organizer") {
    service = OrganizerDataService;
  } else if (type === "Judge") {
    service = JudgeDataService;
  }
  return service;
};

export const getUserService = () => {
  let service;
  if (session.getUserType() === "Participant") {
    service = ParticipantDataService;
  } else if (session.getUserType() === "Organizer") {
    service = OrganizerDataService;
  } else if (session.getUserType() === "Judge") {
    service = JudgeDataService;
  }
  return service;
};

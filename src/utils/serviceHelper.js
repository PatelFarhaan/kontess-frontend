import JudgeDataService from "../app/services/JudgeDataService";
import OrganizerDataService from "../app/services/OrganizerDataService";
import ParticipantDataService from "../app/services/ParticipantDataService";

import * as session from "./session";

export const getUserService = () => {
  let service;
  if (session.getUserType() == "Participant") {
    service = ParticipantDataService;
  } else if (session.getUserType() == "Organizer") {
    service = OrganizerDataService;
  } else if (session.getUserType() == "Judge") {
    service = JudgeDataService;
  }
  return service;
};

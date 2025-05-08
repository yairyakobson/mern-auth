import { SessionDocument } from "../interfaces/sessionInterface";
import { UserDocument } from "../interfaces/userInterface";

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};
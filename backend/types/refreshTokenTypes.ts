import { SessionDocument } from "../interfaces/sessionInterface";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};
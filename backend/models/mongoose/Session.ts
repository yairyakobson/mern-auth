import mongoose from "mongoose";

import { SessionDocument } from "../../interfaces/sessionInterface";
import { thirtyDaysFromNow } from "../../utils/date";

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  userAgent: { type: String },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    default: thirtyDaysFromNow
  }
});

export default mongoose.model<SessionDocument>("Session", sessionSchema);
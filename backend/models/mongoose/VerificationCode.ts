import mongoose from "mongoose";

import { VerificationCodeDocument } from "../../interfaces/verificationCodeInterface";

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const verificationModel = mongoose.model<VerificationCodeDocument>(
  "Verification-Code",
  verificationCodeSchema,
  "verification-code-list"
);

export default verificationModel;
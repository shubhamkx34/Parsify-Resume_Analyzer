import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
    },
    refreshTokenHash: {
      type: String,
      required: [true, "Refresh Token Hash is Required"],
    },
    ip: {
      type: String,
      required: [true, "IP is required"],
    },
    //useragent used for browser identification and version of the same being used
    userAgent: {
      type: String,
      required: [true, "User agent is required"],
    },
    revoked: {
      //If revoked is true,then refresh token can't generate new access token ;Used on logout
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const sessionModel = mongoose.model("Sessions", sessionSchema);
export default sessionModel;

import mongoose from "mongoose";

import { UserDocument } from "../../interfaces/userInterface";
import { compareValue, hashValue } from "../../utils/bcrypt";

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    default: null
  }
},
{ timestamps: true });

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){ // If password was not modified
    return next();
  }
  this.password = await hashValue(this.password);
  return next();
});

userSchema.methods.comparePassword = async function(val: string){
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function(){
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model<UserDocument>("User", userSchema);
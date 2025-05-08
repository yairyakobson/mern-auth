import { SignOptions } from "jsonwebtoken";
import Audience from "../../constants/audience";

const defaults: SignOptions = {
  audience: [Audience.User],
};

export default defaults;
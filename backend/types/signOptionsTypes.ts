import { SignOptions } from "jsonwebtoken";

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

export default SignOptionsAndSecret;
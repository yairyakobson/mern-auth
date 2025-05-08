import { JWT_SECRET } from "../../constants/env";
import SignOptionsAndSecret from "../../types/signOptionsTypes";

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET
};

export default accessTokenSignOptions;
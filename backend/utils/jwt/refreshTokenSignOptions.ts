import { JWT_REFRESH_SECRET } from "../../constants/env";
import SignOptionsAndSecret from "../../types/signOptionsTypes";

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET
};
import { Response } from "express";

type Cookies = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export default Cookies;
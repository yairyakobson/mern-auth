import React from "react";

export interface ResetPasswordProps{
  resetPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetPasswordRef: React.RefObject<{
    email: string;
  }>
}
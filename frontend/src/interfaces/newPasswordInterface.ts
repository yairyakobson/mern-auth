import React from "react";

export interface NewPasswordProps{
  newPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPasswordRef: React.RefObject<{
    password: string;
  }>
}
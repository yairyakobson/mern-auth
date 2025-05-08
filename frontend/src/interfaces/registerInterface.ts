import React from "react";

export interface RegisterFormProps{
  emailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user: string,
  registerDataRef: React.RefObject<{
    email: string;
    password: string;
    confirmPassword: string;
  }>
}
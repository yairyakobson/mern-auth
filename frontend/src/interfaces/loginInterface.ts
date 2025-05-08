export interface LoginFormProps{
  emailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user: string,
  loginDataRef: React.RefObject<{
    email: string;
    password: string;
  }>
}
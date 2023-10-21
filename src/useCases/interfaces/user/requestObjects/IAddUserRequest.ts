export interface IAddUserRequest {
  userName: string;
  password: string;
  enabled: boolean;
  lastLogin: Date;
}

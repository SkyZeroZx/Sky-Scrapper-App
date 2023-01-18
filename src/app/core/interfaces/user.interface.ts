export interface UserLogin {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  email: string;
  firstName: string;
  image?: string;
  role: string;
  token: string;
}

export interface SingInUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserProfile {
  email: string;
  image : string;
  firstName: string;
  lastName: string;
  role: string;
}

export type UpdateUserProfile = Omit<UserProfile, 'email' | 'role'>;

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

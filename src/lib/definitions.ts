export interface UserDataLogin {
    email: string,
    password: string
  }

  export interface UserDataRegister {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  }

export interface UserData {
  name: string,
  email: string,
  id: string,
  AdditionalFields?: AdditionalFields
}

interface AdditionalFields {
  [key: string]: any;
}

export interface AuthData {
  token: string,
  user: UserData
}


export const URL_API = 'http://127.0.0.1:8000'

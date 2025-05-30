import {testloApi} from '../../config/api/tesloApi';
import {User} from '../../domain/entities/user';
import type {AuthResponse} from '../../infrastructure/interfaces/auth.responses';

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    email: data.email,
    fullName: data.fullName,
    id: data.id,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  try {
    const {data} = await testloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log('Error in authLogin: ', error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const {data} = await testloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);
  } catch (error) {
    console.log('Error in authCheckStatus: ', error);
    return null;
  }
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
) => {
  email = email.toLowerCase();
  try {
    const {data} = await testloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });
    return returnUserToken(data);
  } catch (error) {
    console.log('Error in authRegister: ', error);
    return null;
  }
};

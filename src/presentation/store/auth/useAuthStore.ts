import {create} from 'zustand';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {authLogin} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  // logout: () => void;
}

export const useAuthStore = create<AuthState>()(set => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);
    if (!response) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return false;
    }

    await StorageAdapter.setItem('token', response.token);

    // token saved in async storage
    const storedToken = await StorageAdapter.getItem('token');
    console.log('storeToken--->', storedToken);

    console.log('respuesta login--->', {response});
    set({status: 'authenticated', token: response.token, user: response.user});

    return true;
  },
}));

import type {User} from '~/common/types/app';
import type {ApiError, ApiResponse} from '~/common/types/api';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as User,
    };
  },
  getters: {
    isLogged(): boolean {
      return !!this.user.pseudo;
    },
    isAdmin(): boolean {
      return this.user.role === 'admin';
    },
  },
  actions: {
    async login(pseudo: string, password: string): Promise<ApiResponse<User> | ApiError> {
      try {
        const userLogin = await $fetch('/api/login', {
          method: 'POST',
          body: {
            pseudo,
            password,
          },
        });

        if ('data' in userLogin) {
          this.user = userLogin.data as User;
        }

        return userLogin;
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }
        return error;
      }
    },
    logout(): void {
      this.user = {} as User;
    },
    async changePassword(
      currentPassword: string,
      newPassword: string,
      repeatedPassword: string,
    ): Promise<ApiResponse | ApiError> {
      try {
        const pseudo = this.user.pseudo;

        const result = await $fetch('/api/changePassword', {
          method: 'POST',
          body: {
            currentPassword,
            newPassword,
            repeatedPassword,
            pseudo,
          },
        });
        return result as ApiResponse;
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
    async register(
      pseudo: string,
      password: string,
      repeatedPassword: string,
      isAdmin: boolean = false,
    ): Promise<ApiResponse | ApiError> {
      try {
        const result = await $fetch('/api/register', {
          method: 'POST',
          body: {
            pseudo,
            password,
            repeatedPassword,
            isAdmin,
          },
        });
        return result as ApiResponse;
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
    isAuthor(messageAuthorId: number) {
      return this.user.id === messageAuthorId;
    },
  },
});

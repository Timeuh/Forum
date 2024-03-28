import type {User} from '~/common/types/app';
import type {ApiError, ApiResponse} from '~/common/types/api';

export const useUserStore = defineStore('counter', {
  state: () => {
    return {
      user: {} as User,
    };
  },
  actions: {
    async login(pseudo: string, password: string): Promise<void> {
      const userLogin: ApiResponse<User> | ApiError = await $fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          pseudo,
          password,
        }),
      });

      if ('data' in userLogin) {
        this.user = userLogin.data;
      }
    },
  },
});

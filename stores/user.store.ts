import type {User} from '~/common/types/app';

export const useUserStore = defineStore('counter', {
  state: () => {
    return {
      user: {} as User,
    };
  },
  actions: {},
});

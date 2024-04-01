import type {Forum} from '~/common/types/app';
import type {ApiError} from '~/common/types/api';

export const useForumStore = defineStore('forum', {
  state: () => {
    return {
      forums: [] as Forum[],
    };
  },
  getters: {
    hasForums(): boolean {
      return this.forums.length > 0;
    },
  },
  actions: {
    async chargeForums(): Promise<void | ApiError> {
      try {
        const forums = await $fetch('/api/forum/all');

        if ('data' in forums) {
          this.forums = forums.data;
        }
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
  },
});

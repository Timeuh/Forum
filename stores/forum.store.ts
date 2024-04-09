import type {Forum, FullForum} from '~/common/types/app';
import type {ApiError} from '~/common/types/api';

export const useForumStore = defineStore('forum', {
  state: () => {
    return {
      forums: [] as Forum[],
      displayCreationForm: false,
      currentForum: {} as FullForum,
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
    toggleCreationForm(): void {
      this.displayCreationForm = !this.displayCreationForm;
    },
    async createForum(name: string): Promise<void | ApiError> {
      try {
        await $fetch('/api/forum/create', {
          method: 'POST',
          body: JSON.stringify({name}),
        });
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
    async fetchForum(id: string): Promise<void | ApiError> {
      try {
        const forum = await $fetch('/api/forum/get', {
          method: 'POST',
          body: JSON.stringify({id}),
        });

        if ('data' in forum) {
          this.currentForum = forum.data;
        }
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
    async deleteForum(id: number): Promise<void | ApiError> {
      try {
        await $fetch('/api/forum/delete', {
          method: 'DELETE',
          body: JSON.stringify({
            id,
          }),
        });
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
  },
});

import type {ApiError} from '~/common/types/api';

export const useSubjectStore = defineStore('subject', {
  state: () => {
    return {
      displayCreationForm: false,
    };
  },
  getters: {},
  actions: {
    toggleCreationForm(): void {
      this.displayCreationForm = !this.displayCreationForm;
    },
    async createSubject(name: string, content: string, forumId: number, userId: number): Promise<void | ApiError> {
      try {
        return await $fetch('/api/subject/create', {
          method: 'POST',
          body: JSON.stringify({
            name,
            content,
            forumId,
            userId,
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

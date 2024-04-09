import type {ApiError} from '~/common/types/api';

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      displayAnswerForm: false,
    };
  },
  getters: {},
  actions: {
    toggleAnswerForm(): void {
      this.displayAnswerForm = !this.displayAnswerForm;
    },
    async createMessage(content: string, subjectId: number, userId: number): Promise<void | ApiError> {
      try {
        return await $fetch('/api/message/create', {
          method: 'POST',
          body: JSON.stringify({
            content,
            subjectId,
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

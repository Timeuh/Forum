import type {ApiError} from '~/common/types/api';
import type {FullSubject} from '~/common/types/app';

export const useSubjectStore = defineStore('subject', {
  state: () => {
    return {
      displayCreationForm: false,
      subject: {} as FullSubject,
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
    async getSubject(id: number): Promise<void | ApiError> {
      try {
        const subject = await $fetch('/api/subject/get', {
          method: 'POST',
          body: JSON.stringify({
            id,
          }),
        });

        if ('data' in subject) {
          this.subject = subject.data;
        }
      } catch (error: any) {
        if ('data' in error) {
          return error.data;
        }

        return error;
      }
    },
    async deleteSubject(id: number): Promise<void | ApiError> {
      try {
        await $fetch('/api/subject/delete', {
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

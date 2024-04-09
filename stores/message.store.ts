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
  },
});

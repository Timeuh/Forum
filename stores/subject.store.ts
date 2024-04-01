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
  },
});

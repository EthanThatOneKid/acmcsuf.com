export class QuizStorage {
  constructor(
    private readonly storage: Storage = window.localStorage,
    private readonly storageKey = 'QUIZ_RESPONSES'
  ) {}

  setResponses(responses: (string | undefined)[]) {
    this.storage.setItem(this.storageKey, JSON.stringify(responses));
  }

  getResponses(): (string | undefined)[] {
    const responses = this.storage.getItem(this.storageKey);
    return responses ? JSON.parse(responses) : [];
  }

  clearResponses() {
    this.storage.removeItem(this.storageKey);
  }
}

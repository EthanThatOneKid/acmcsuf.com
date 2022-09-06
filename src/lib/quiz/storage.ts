import type { TeamMatch } from './types';

export class QuizStorage {
  constructor(
    private readonly storage: Storage = window.localStorage,
    private readonly storageKey = 'QUIZ_RESPONSES'
  ) {}

  setResponses(responses: TeamMatch[]) {
    this.storage.setItem(this.storageKey, JSON.stringify(responses));
  }

  getResponses(): TeamMatch[] {
    const responses = this.storage.getItem(this.storageKey);
    return responses ? JSON.parse(responses) : [];
  }
}

export const quizStorage = new QuizStorage();

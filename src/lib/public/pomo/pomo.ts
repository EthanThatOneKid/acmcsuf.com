export enum PomoState {
  WORK = 'w',
  BREAK = 'b',
}

export interface PomoInfo {
  /**
   * elapsedCycles is the number of cycles that have elapsed since the
   * beginning of the pattern in milliseconds.
   */
  elapsedCycles: number;

  /**
   * currentState is the current state of the Pomodoro pattern.
   */
  currentState: PomoState;

  /**
   * remainingMs is the number of milliseconds remaining in the
   * current state.
   */
  remainingMs: number;
}

export class PomoPattern {
  public readonly totalMs: number;

  constructor(public readonly pattern: number[]) {
    this.totalMs = pattern.reduce((a, b) => a + b) * 1e3;
  }

  public at(timestamp: Date, base: Date): PomoInfo {
    // Number of ms that have elapsed since the beginning of the pattern.
    const elapsedMs = Math.floor(timestamp.getTime() - base.getTime());

    // Amount of times the entire pattern has been completed.
    const elapsedCycles = Math.floor(elapsedMs / (this.totalMs * 1e3));

    // Number of milliseconds that have elapsed since the beginning of the pattern.
    const elapsedMsInCycle = elapsedMs % (this.totalMs * 1e3);

    // Current state of the pattern.
    let currentState: PomoState = PomoState.WORK;

    // Number of milliseconds remaining in the current state.
    let remainingMs = 0;

    let periodIdx = 0;
    while (remainingMs < elapsedMsInCycle) {
      const period = this.pattern[periodIdx];
      currentState = currentState === PomoState.WORK ? PomoState.BREAK : PomoState.WORK;
      remainingMs += period * 1e3;

      periodIdx = (periodIdx + 1) % this.pattern.length;
    }

    remainingMs -= elapsedMsInCycle;

    return {
      elapsedCycles,
      currentState,
      remainingMs,
    };
  }

  /**
   * toShortString returns a string representation of the pattern.
   */
  public toShortString(): string {
    const periods: number[] = [];

    for (const period of this.pattern) {
      if (!periods.includes(period)) {
        periods.push(period);
      }
    }

    return periods.join('-');
  }

  /**
   * fromString parses the pattern of integers from the
   * given pattern string.
   *
   * Example pattern: "w25b5w25b5w25b20"
   */
  static fromString(pattern: string): PomoPattern {
    return new PomoPattern(
      pattern
        .split(/\D+/)
        .filter((s) => s.length > 0)
        .map((s) => parseInt(s))
    );
  }
}

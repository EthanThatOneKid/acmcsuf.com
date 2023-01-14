/**
 * PomoInfo is an object that contains information about
 * the current state of a Pomodoro pattern.
 */
export interface PomoInfo {
  /**
   * elapsedCycles is the number of cycles that have elapsed since the
   * beginning of the pattern.
   */
  elapsedCycles: number;

  /**
   * working is a boolean that indicates whether the current state is
   * a work state.
   */
  working: boolean;

  /**
   * remainingMs is the number of milliseconds remaining in the
   * current state.
   */
  remainingMs: number;

  period: {
    /**
     * index is the index of the current period in the pattern.
     */
    index: number;

    /**
     * minutes is the maximum number of minutes in the current period.
     */
    minutes: number;
  };
}

/**
 * PomoPattern is a class that represents a Pomodoro pattern.
 */
export class PomoPattern {
  /**
   * totalMs is the total number of milliseconds in the pattern.
   */
  private readonly totalMs: number;

  /**
   * pattern is the pattern of the Pomodoro in seconds.
   */
  private readonly pattern: number[];

  /**
   * constructor creates a new PomoPattern instance with the given pattern.
   * @param pattern - the pattern of the Pomodoro in seconds
   */
  constructor(pattern: number[]) {
    this.pattern = pattern;
    this.totalMs = pattern.reduce((a, b) => a + b) * 1000;
  }

  /**
   * at returns a PomoInfo object for the given timestamp and base.
   * @param timestamp - the timestamp for which to calculate the PomoInfo
   * @param base - the base timestamp from which to calculate the PomoInfo
   * @returns PomoInfo object
   */
  public at(timestamp: Date, base: Date): PomoInfo {
    // Number of ms that have elapsed since the beginning of the pattern.
    const elapsedMs = timestamp.getTime() - base.getTime();

    // Number of cycles that have elapsed since the beginning of the pattern.
    const elapsedCycles = Math.floor(elapsedMs / this.totalMs);

    // Number of milliseconds that have elapsed since the last cycle.
    const elapsedMsInCycle = elapsedMs % this.totalMs;

    // Number of milliseconds remaining in the current state.
    let remainingMs = 0;
    let periodIdx = 0;
    while (remainingMs < elapsedMsInCycle) {
      const period = this.pattern[periodIdx];
      remainingMs += period * 1000;
      periodIdx = (periodIdx + 1) % this.pattern.length;
    }

    const currentPeriodMinutes = this.pattern[periodIdx];
    const working = periodIdx % 2 === 0;

    return {
      elapsedCycles,
      working,
      remainingMs: remainingMs - elapsedMsInCycle,
      period: {
        index: periodIdx,
        minutes: currentPeriodMinutes,
      },
    };
  }

  /**
   * toShortString returns a string representation of the pattern.
   * @returns string representation of the pattern
   */
  public toShortString(): string {
    return this.pattern.join('-');
  }

  /**
   * data returns the pattern of the Pomodoro in seconds.
   */
  public get data(): number[] {
    return this.pattern;
  }

  /**
   * fromString parses the pattern of integers from the
   * given pattern string.
   * @param pattern - the string representation of the pattern
   * @returns a new PomoPattern instance
   */
  public static fromString(pattern: string): PomoPattern {
    const periods = pattern.match(/\d+/g)?.map(Number);
    if (!periods) {
      throw new Error(`Invalid pattern: ${pattern}`);
    }

    return new PomoPattern(periods);
  }
}

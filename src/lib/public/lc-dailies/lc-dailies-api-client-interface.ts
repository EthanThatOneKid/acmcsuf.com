// Copied from:
// https://oss.acmcsuf.com/lc-dailies

/**
 * Player is a registered player in the leaderboard.
 */
export interface Player {
  /**
   * discord_user_id is the Discord user ID of the player.
   */
  discord_user_id: string;

  /**
   * lc_username is the Leetcode username of the player.
   */
  lc_username: string;
}

/**
 * Submission is a submission in the leaderboard.
 */
export interface Submission {
  /**
   * id is the ID of the submission.
   */
  id: string;

  /**
   * date is the date of the submission.
   */
  date: string;
}

/**
 * LCQuestion is a Leetcode question.
 */
export interface LCQuestion {
  /**
   * name is the name of the daily question.
   */
  name: string;

  /**
   * date is the date the daily question was posted in the format of YYYY-MM-DD.
   */
  date: string;

  /**
   * title is the title of the daily question.
   */
  title: string;

  /**
   * difficulty is the difficulty of the daily question.
   */
  difficulty: string;

  /**
   * url is the link of the daily question.
   */
  url: string;
}

/**
 * Season is a season of the leaderboard.
 */
export interface Season {
  /**
   * id is the ID of the season.
   */
  id: string;

  /**
   * start_date is the start date of the season.
   */
  start_date: string;

  /**
   * players is the map of players in the season.
   */
  players: { [discord_user_id: string]: Player };

  /**
   * questions is the map of questions in the season.
   */
  questions: { [lc_question_name: string]: LCQuestion };

  /**
   * submissions is the map of submissions in the season.
   */
  submissions: {
    [discord_user_id: string]: {
      [lc_question_name: string]: Submission;
    };
  };
}

/**
 * LCDailiesAPIClientInterface is the client interface for the LC-Dailies API.
 */
export interface LCDailiesAPIClientInterface {
  /**
   * getCurrentSeason gets the current season of the leaderboard.
   */
  getCurrentSeason(): Promise<Season | null>;

  /**
   * getSeason gets a season of the leaderboard by ID.
   */
  getSeason(season_id: string): Promise<Season | null>;

  /**
   * listSeasons gets a list of season IDs of the leaderboard.
   */
  listSeasons(): Promise<Season[]>;
}

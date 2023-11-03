import type { Season } from 'lc-dailies';

const SEASON_DURATION = 7 * 24 * 60 * 60 * 1_000; // 1 week.
const ONOVEMBER_MONTH = 10; // November.

/**
 * onovember is a function that manipulates the LC-Dailies data for the O(N)ovember page.
 */
export function onovember(data: Season[]) {
  const seasonsMap = categorizeByMonth(data, ONOVEMBER_MONTH);
  const onovembers: Record<
    string, // Year.
    {
      totalSubmissions: number;
      scores: {
        username: string;
        submissionCount: number;
        totalScore: number;
      }[];
      dailies: Record<
        string, // Day of month.
        {
          questionTitle: string;
          questionURL: string;
          playerIDs: Record<string, number>;
        }
      >;
    }
  > = {};
  for (const year in seasonsMap) {
    onovembers[year] = {
      totalSubmissions: 0,
      scores: [],
      dailies: {},
    };
    const seasons = seasonsMap[year];
    for (const season of seasons) {
      for (const questionID in season.questions) {
        const question = season.questions[questionID];
        const questionDate = new Date(`${question.date} GMT`);
        if (questionDate.getUTCMonth() !== ONOVEMBER_MONTH) {
          continue;
        }

        const dayOfMonth = questionDate.getUTCDate();
        onovembers[year].dailies[dayOfMonth] = {
          questionTitle: question.title,
          questionURL: question.url,
          playerIDs: {},
        };

        for (const playerID in season.submissions) {
          const playerSubmissions = season.submissions[playerID];
          for (const submissionQuestionID in playerSubmissions) {
            if (questionID !== submissionQuestionID) {
              continue;
            }

            const submission = playerSubmissions[submissionQuestionID];
            if (!submission) {
              continue;
            }

            onovembers[year].dailies[dayOfMonth].playerIDs[playerID] = 0;
            onovembers[year].totalSubmissions++;
          }
        }
      }

      // onovembers[year].scores = Object.values(season.players)
      //   .map((player) => {
      //     const { submissionCount, totalScore } = analyzePlayer(player, season, ONOVEMBER_MONTH);
      //     return { username: player.lc_username, submissionCount, totalScore };
      //   })
      //   .sort((a, b) => a.totalScore - b.totalScore);
    }
  }

  return onovembers;
}

// /**
//  * analyzePlayer analyzes a player's submissions and returns the total score and submission count.
//  */
// function analyzePlayer(
//   player: Player,
//   season: Season,
//   month?: number
// ): { submissionCount: number; totalScore: number } {
//   let totalScore = 0;
//   let submissionCount = 0;
//   for (const questionID in season.submissions[player.discord_user_id]) {
//     const question = season.questions[questionID];
//     if (month && new Date(`${question.date} GMT`).getUTCMonth() !== month) {
//       continue;
//     }

//     const submission = player.submissions[questionID];
//     if (!submission) {
//       continue;
//     }

//     totalScore += submission.score;
//     submissionCount++;
//   }
// }

/**
 * categorizeByMonth categorizes seasons by month. Returns a record of years to seasons.
 */
function categorizeByMonth(seasons: Season[], month: number): Record<number, Season[]> {
  const result: Record<number, Season[]> = {};
  for (const season of seasons) {
    const date = new Date(season.start_date);
    const endOfSeasonDate = new Date(date.getTime() + SEASON_DURATION);
    if (date.getUTCMonth() === month || endOfSeasonDate.getUTCMonth() === month) {
      const year = date.getUTCFullYear();
      result[year] ??= [];
      const index = result[year].findIndex((s) => s.start_date > season.start_date);
      if (index === -1) {
        result[year].push(season);
      } else {
        result[year].splice(index, 0, season);
      }
    }
  }

  return result;
}

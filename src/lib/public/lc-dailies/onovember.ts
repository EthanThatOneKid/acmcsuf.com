import type { Season } from 'lc-dailies';

const SEASON_DURATION = 7 * 24 * 60 * 60 * 1_000; // 1 week.
const ONOVEMBER_MONTH = 10; // November.

/**
 * onovember is a function that manipulates the LC-Dailies data for the O(N)ovember page.
 */
export function onovember(data: Season[]) {
  const seasonsMap = categorizeByMonth(data, ONOVEMBER_MONTH);
  const onovembersMap: Record<
    string, // Year.
    {
      totalSubmissions: number;
      players: Record<string, { submissionCount: number; username: string }>;
      dailies: Record<
        string, // Day of month.
        { questionTitle: string; questionURL: string; playerIDs: Record<string, number> }
      >;
      calendar: {
        dayOfMonth: string;
        submissionCount: number;
      }[];
      winners: {
        username: string;
        submissionCount: number;
        // TODO: Add total player score.
      }[];
    }
  > = {};
  for (const year in seasonsMap) {
    onovembersMap[year] = {
      totalSubmissions: 0,
      calendar: [],
      winners: [],
      dailies: {},
      players: {},
    };
    const seasons = seasonsMap[year];
    for (const season of seasons) {
      for (const questionID in season.questions) {
        const question = season.questions[questionID];
        const questionDate = new Date(`${question.date} GMT`);
        if (questionDate.getUTCMonth() !== ONOVEMBER_MONTH) {
          continue;
        }

        const dayOfMonth = questionDate.getUTCDate().toString();
        onovembersMap[year].dailies[dayOfMonth] = {
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

            onovembersMap[year].dailies[dayOfMonth].playerIDs[playerID] = 0;
            onovembersMap[year].totalSubmissions++;
            if (!onovembersMap[year].players[playerID]) {
              onovembersMap[year].players[playerID] = {
                username: season.players[playerID].lc_username,
                submissionCount: 0,
              };
            }

            onovembersMap[year].players[playerID].submissionCount++;
          }
        }
      }
    }

    onovembersMap[year].winners = Object.entries(onovembersMap[year].players)
      .sort(({ 1: a }, { 1: b }) => b.submissionCount - a.submissionCount)
      .map(({ 1: player }) => player);

    for (let i = 1; i <= 30; i++) {
      const dayOfMonth = i.toString();
      const playerIDs = onovembersMap[year].dailies[dayOfMonth]?.playerIDs;
      onovembersMap[year].calendar.push({
        dayOfMonth,
        submissionCount: playerIDs ? Object.keys(playerIDs).length : 0,
      });
    }
  }

  return onovembersMap;
}

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

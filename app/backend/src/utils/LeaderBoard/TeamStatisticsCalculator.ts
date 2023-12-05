import IMatches from '../../Interfaces/Matches/IMatches';

class TeamStatisticsCalculator {
  static calculateVictories(matches: IMatches[], teamId: number): number {
    let victories = 0;
    const wonMatches = matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
      || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals));

    wonMatches.forEach(() => {
      victories += 1;
    });

    return victories;
  }

  static calculateLosses(matches: IMatches[], teamId: number): number {
    let losses = 0;
    const lostMatches = matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)
      || (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals));

    lostMatches.forEach(() => {
      losses += 1;
    });

    return losses;
  }

  static calculateDraws(matches: IMatches[], teamId: number): number {
    let draws = 0;
    const drawsMatches = matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals)
      || (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals));

    drawsMatches.forEach(() => {
      draws += 1;
    });

    return draws;
  }

  static calculatePoints(matches: IMatches[], teamId: number): number {
    const totalVictories = this.calculateVictories(matches, teamId);
    const totalDraws = this.calculateDraws(matches, teamId);

    const points = totalVictories * 3 + totalDraws * 1;

    return points;
  }

  static calculateGoalsFavor(matches: IMatches[], teamId: number): number {
    let goalsFavor = 0;

    matches.forEach((match) => {
      if (match.homeTeamId === teamId) {
        goalsFavor += match.homeTeamGoals;
      }

      if (match.awayTeamId === teamId) {
        goalsFavor += match.awayTeamGoals;
      }
    });

    return goalsFavor;
  }

  static calculateGoalsOwn(matches: IMatches[], teamId: number): number {
    let goalsOwn = 0;

    matches.forEach((match) => {
      if (match.homeTeamId === teamId) {
        goalsOwn += match.awayTeamGoals;
      }

      if (match.awayTeamId === teamId) {
        goalsOwn += match.homeTeamGoals;
      }
    });

    return goalsOwn;
  }

  static calculateGames(matches: IMatches[], teamId: number): number {
    let games = 0;

    matches.forEach((match) => {
      if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
        games += 1;
      }
    });

    return games;
  }

  static calculateGolsBalance(matches: IMatches[], teamId: number): number {
    const goalsFavor = this.calculateGoalsFavor(matches, teamId);
    const goalsOwn = this.calculateGoalsOwn(matches, teamId);

    const golsBalance = goalsFavor - goalsOwn;

    return golsBalance;
  }

  static calculateEfficiency(matches: IMatches[], teamId: number): string {
    const totalPoints = this.calculatePoints(matches, teamId);
    const totalGames = this.calculateGames(matches, teamId);

    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return efficiency.toFixed(2);
  }
}

export default TeamStatisticsCalculator;

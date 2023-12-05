import IMatches from '../../Interfaces/Matches/IMatches';
import TeamStatisticsCalculator from './TeamStatisticsCalculator';

export default class LeaderBoard extends TeamStatisticsCalculator {
  static generate(matches: IMatches[], teamId: number) {
    return {
      totalPoints: this.calculatePoints(matches, teamId),
      totalGames: this.calculateGames(matches, teamId),
      totalVictories: this.calculateVictories(matches, teamId),
      totalDraws: this.calculateDraws(matches, teamId),
      totalLosses: this.calculateLosses(matches, teamId),
      goalsFavor: this.calculateGoalsFavor(matches, teamId),
      goalsOwn: this.calculateGoalsOwn(matches, teamId),
      goalsBalance: this.calculateGolsBalance(matches, teamId),
      efficiency: this.calculateEfficiency(matches, teamId),
    };
  }
}

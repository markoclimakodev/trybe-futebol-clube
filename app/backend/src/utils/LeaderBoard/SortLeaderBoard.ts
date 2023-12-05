import TeamStats from '../../Interfaces/LeaderBoards/TeamStats';

export default class SortLeaderBoard {
  static sort(leaderBoard: TeamStats[]): TeamStats[] {
    leaderBoard.sort(
      (teamA, teamB) =>
        teamB.totalPoints - teamA.totalPoints
        || teamB.totalVictories - teamA.totalVictories
        || teamB.goalsBalance - teamA.goalsBalance
        || teamB.goalsFavor - teamA.goalsFavor
        || teamA.goalsOwn - teamB.goalsOwn,
    );

    return leaderBoard;
  }
}

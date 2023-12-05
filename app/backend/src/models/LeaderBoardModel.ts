import ILeaderBoard from '../Interfaces/LeaderBoards/ILeaderBoard';
import TeamStats from '../Interfaces/LeaderBoards/TeamStats';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import LeaderBoard from '../utils/LeaderBoard/LeaderboardGenerator';
import SortLeaderBoard from '../utils/LeaderBoard/SortLeaderBoard';

export default class LeaderBoardModel implements ILeaderBoard {
  private teamModel = SequelizeTeam;
  private matchesModel = SequelizeMatches;

  private async getAllFinishedTeamsAndMatches() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll({
      where: { inProgress: false },
    });

    return { teams, matches };
  }

  async generateLeaderBoard(): Promise<TeamStats[]> {
    const { teams, matches } = await this.getAllFinishedTeamsAndMatches();

    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      ...LeaderBoard.generate(matches, team.id),
    }));

    const sortedLeaderboard = SortLeaderBoard.sort(leaderboard);

    return sortedLeaderboard;
  }

  async generateHomeLeaderBoard(): Promise<TeamStats[]> {
    const { teams, matches } = await this.getAllFinishedTeamsAndMatches();
    const homeLeaderBoard = teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      return {
        name: team.teamName,
        ...LeaderBoard.generate(homeMatches, team.id),
      };
    });

    const sortLeaderBoard = SortLeaderBoard.sort(homeLeaderBoard);
    return sortLeaderBoard;
  }

  async generateAwayLeaderBoard(): Promise<TeamStats[]> {
    const { teams, matches } = await this.getAllFinishedTeamsAndMatches();
    const awayLeaderBoard = teams.map((team) => {
      const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        ...LeaderBoard.generate(awayMatches, team.id),
      };
    });

    const sortLeaderBoard = SortLeaderBoard.sort(awayLeaderBoard);
    return sortLeaderBoard;
  }
}

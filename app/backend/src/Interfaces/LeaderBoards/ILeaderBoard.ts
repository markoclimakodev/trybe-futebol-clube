import TeamStats from './TeamStats';

export default interface ILeaderBoard {
  generateHomeLeaderBoard():Promise<TeamStats[]>
  generateAwayLeaderBoard():Promise<TeamStats[]>
  generateLeaderBoard():Promise<TeamStats[]>
}

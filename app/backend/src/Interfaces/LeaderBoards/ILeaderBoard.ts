import TeamStats from './TeamStats';

export default interface ILeaderBoard {
  generateHomeLeaderBoard():Promise<TeamStats[]>
}

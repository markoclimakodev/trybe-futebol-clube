import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  teamModel = [
    {
      model: SequelizeTeam,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: SequelizeTeam,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ];

  async getMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({ include: this.teamModel });

    return matches;
  }

  async getMatchesByProgress(progress:boolean):Promise<IMatches[]> {
    const filteredMatches = await this.model.findAll({
      where: { inProgress: progress },
      include: this.teamModel,
    });

    return filteredMatches;
  }

  async finishMatch(id:number):Promise<[number]> {
    const matche = await this.model.update({ inProgress: false }, { where: { id } });
    return matche;
  }
}

/** https://cursos.alura.com.br/forum/topico-error-ts2322-type-affectedcount-number-is-not-assignable-to-type-number-produto-source-has-1-element-s-but-target-requires-2-223505  */

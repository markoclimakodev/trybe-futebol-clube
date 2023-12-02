import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: string;
  declare awayTeamId: string;
  declare awayTeamGoals: string;
  declare inProgress: boolean;
}

SequelizeMatches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_goals',

    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_id',

    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_goals',

    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

export default SequelizeMatches;

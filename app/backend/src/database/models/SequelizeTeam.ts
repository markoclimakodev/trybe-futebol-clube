import { INTEGER, InferAttributes, InferCreationAttributes, Model, STRING } from 'sequelize';
import db from '.';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: number;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default SequelizeTeam;

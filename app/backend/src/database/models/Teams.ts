import { Model, INTEGER, STRING } from 'sequelize';
import Match from './Match';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(56),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Match.belongsTo(Teams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Match.belongsTo(Teams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Teams.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

Teams.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

export default Teams;

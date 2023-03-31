import Match from '../database/models/Match';

export default interface ITeam {
  id: number,
  teamName: string,
  homeMatches?: [Match],
  awayMatches?: [Match],
}

import Team from '../database/models/Teams';
import ITeams from '../interfaces/ITeams';

export default class TeamService {
  public getAllTeams = async () => {
    const data = await Team.findAll();
    return data;
  };

  public getById = async (id: number): Promise<ITeams> => {
    const teamsId = await Team.findByPk(id);
    return teamsId as ITeams;
  };
}

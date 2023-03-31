import { ModelStatic } from 'sequelize';
import { IResponse } from '../interfaces/IResponse';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Teams';
import { IMatch } from '../interfaces/IMatch';
import { ICreateMatch } from '../interfaces/ICreateMatch';

export default class matchService {
  private model: ModelStatic<MatchModel> = MatchModel;

  async getMatches(inProgress: string): Promise<IResponse> {
    const data = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ] });

    if (!inProgress) return { status: 200, message: data };

    const ifTrue = data.filter((param) => param.inProgress);
    const ifFalse = data.filter((param) => !param.inProgress);

    if (inProgress === 'true') return { status: 200, message: ifTrue };
    if (inProgress === 'false') return { status: 200, message: ifFalse };
    return { status: 200, message: data };
  }

  static async createNewMatch(
    homeTeamId: IMatch,
    awayTeamId: IMatch,
    homeTeamGoals: IMatch,
    awayTeamGoals: IMatch,
  ): Promise<IMatch[] | object> {
    const result = await MatchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });
    return result;
  }

  async finishMatches(id: number): Promise<IResponse> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
  }

  async updateMatches(id: number, body: object): Promise<IResponse> {
    const currentMatch = await this.model.findByPk(id);
    if (currentMatch?.inProgress) {
      await this.model.update({ ...body }, { where: { id } });
    }
    return { status: 200, message: 'Updated' };
  }

  async addNewMatch(body: ICreateMatch): Promise<IResponse> {
    if (body.homeTeamId === body.awayTeamId) {
      return {
        status: 422,
        message: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const homeTeam = await this.model.findByPk(body.homeTeamId);
    const awayTeam = await this.model.findByPk(body.awayTeamId);
    if (!awayTeam || !homeTeam) {
      return {
        status: 404,
        message: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.model.create({ ...body, inProgress: true });
    return { status: 201, message: newMatch };
  }
}


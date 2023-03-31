import LeaderboardUtils from '../Utilits/leaderborderUtils';
import TeamModel from '../database/models/Teams';

export default class LeaderService {
  public model = TeamModel;
  public async leaderBoard() {
    return this.model.findAll({
      include: [
        { association: 'homeMatches',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
        { association: 'awayMatches',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
      ],
    })
      .then((result) => result.map((team) => team.get({ plain: true })))
      .then((result) => result.map((team) => new LeaderboardUtils(team)))
      .then((result) => result
        .sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn));
  }

  public async homeLeaderboard() {
    return this.model.findAll({
      include: [{
        association: 'homeMatches',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      },
      ],
    })
      .then((result) => result.map((team) => team.get({ plain: true })))
      .then((result) => result.map((team) => new LeaderboardUtils(team)))
      .then((result) => result
        .sort((ah, bh) => bh.totalPoints - ah.totalPoints
      || bh.goalsBalance - ah.goalsBalance
      || bh.goalsFavor - ah.goalsFavor
      || bh.goalsOwn - ah.goalsOwn));
  }

  public async awayLeaderboard() {
    return this.model.findAll({
      include: [{
        association: 'awayMatches',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      },
      ],
    })
      .then((result) => result.map((team) => team.get({ plain: true })))
      .then((result) => result.map((team) => new LeaderboardUtils(team)))
      .then((result) => result
        .sort((aw, bw) => bw.totalPoints - aw.totalPoints
      || bw.goalsBalance - aw.goalsBalance
      || bw.goalsFavor - aw.goalsFavor
      || bw.goalsOwn - aw.goalsOwn));
  }
}

export interface IMatch {
  id?: number | string,
  homeTeamId?: number,
  homeTeamGoals: number,
  awayTeamId?: number,
  awayTeamGoals: number,
}

export interface IMatchLead extends IMatch {
  homeTeam?: {
    id: number,
    teamName: string,
  },
  awayTeam?: {
    id: number,
    teamName: string,
  }
}

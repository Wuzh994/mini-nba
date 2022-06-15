export interface Game {
  gameId: string
  statusNum: number
  hTeam: Team
  vTeam: Team
}

export interface Team {
  loss: string
  score: string
  seriesLoss: string
  seriesWin: string
  teamId: string
  triCode: string
  win: string
}

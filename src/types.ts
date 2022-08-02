export interface Game {
  gameId: string
  statusNum: number
  hTeam: Team
  vTeam: Team
  tags: string[]
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

export interface ScoreBoard {
  startTimeUTC: Date
  statusNum:number
  hTeam: Team
  vTeam: Team
}

export interface GameInfo {
  gameId: string
  seasonYear: string
  homeStartDate: string
}

export interface Score {
  ta: string
  q1: number
  q2: number
  q3: number
  q4: number
  s: number
}

export interface PlayerStats {
  teamId: string
  personId: string
  firstName: string
  lastName: string
  jersey: string
  pos: string
  min: string
  points: string
  totReb: string
  assists: string
  steals: string
  blocks: string
  fgm: string
  fga: string
  fgp: string
  tpm: string
  tpa: string
  tpp: string
  fta: string
  ftm: string
  ftp: string
  offReb: string
  defReb: string
  turnovers: string
  pFouls: string
  plusMinus: string
}

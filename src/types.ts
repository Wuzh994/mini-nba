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
  num: string
  fn: string
  ln: string
  pos: string
  min: number
  sec: number
  pts: number
  reb: number
  ast: number
  stl: number
  blk: number
  fgm: number
  fga: number
  tpm: number
  tpa: number
  fta: number
  ftm: number
  oreb: number
  dreb: number
  tov: number
  pf: number
  pm: number
}

export const API_URL = {
  base: 'http://data.nba.net/prod/',
  details: 'https://data.nba.com/',
}

export const TEAM_NAME: Record<string, string> = {
  ATL: '老鹰',
  BKN: '篮网',
  BOS: '凯尔特人',
  CHA: '黄蜂',
  CHI: '公牛',
  CLE: '骑士',
  DAL: '独行侠',
  DEN: '掘金',
  DET: '活塞',
  GSW: '勇士',
  HOU: '火箭',
  IND: '步行者',
  LAC: '快船',
  LAL: '湖人',
  MEM: '灰熊',
  MIA: '热火',
  MIL: '雄鹿',
  MIN: '森林狼',
  NOP: '鹈鹕',
  NYK: '尼克斯',
  OKC: '雷霆',
  ORL: '魔术',
  PHI: '76人',
  PHX: '太阳',
  POR: '开拓者',
  SAC: '国王',
  SAS: '马刺',
  TOR: '猛龙',
  UTA: '爵士',
  WAS: '奇才',
}

export const GAME_STATUS: Record<number, string> = {
  1: '未开始',
  2: '进行中',
  3: '已结束',
}

export const STATS = {
  's': '得分',
  'ast': '助攻',
  'stl': '抢断',
  'blk': '盖帽',
  'fgm': '命中',
  'fga': '出手',
  'tpm': '三分命中',
  'tpa':  '三分出手',
  'ftm': '罚球命中',
  'fta': '罚球出手',
  'oreb': '前板',
  'dreb': '后板',
  'tov': '失误',
  'pf': '犯规'
}

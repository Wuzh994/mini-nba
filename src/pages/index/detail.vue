<template>
  <view class="container">
    <view class="scoreboard">
      <GameScore :teamScore="vTeam" />
      <view class="line" />
      <GameScore :teamScore="hTeam" reverse />
    </view>
    <view class="game-summary">
      <van-row
        justify="center"
        gutter="10"
        class="game-summary__header"
      >
        <van-col span="6">球队</van-col>
        <van-col span="3">Q1</van-col>
        <van-col span="3">Q2</van-col>
        <van-col span="3">Q3</van-col>
        <van-col span="3">Q4</van-col>
        <van-col span="3">总分</van-col>
      </van-row>
      <van-row
        justify="center"
        gutter="10"
        class="game-summary__body"
        v-for="(t, idx) in teamScore"
        :key="idx"
      >
        <van-col span="6">
          <view class="team-info">
            <component :is="t?.ta" size="2em" />
            <text class="name">{{ TEAM_NAME[t?.ta] }}</text>
          </view>
        </van-col>
        <van-col span="3" class="item">{{ t?.q1 }}</van-col>
        <van-col span="3" class="item">{{ t?.q2 }}</van-col>
        <van-col span="3" class="item">{{ t?.q3 }}</van-col>
        <van-col span="3" class="item">{{ t?.q4 }}</van-col>
        <van-col span="3" class="item">{{ t?.s }}</van-col>
      </van-row>
    </view>
    <van-tabs v-model:active="active" color="#1989FA" background="#f7f8fa" line-width="20px" title-active-color="#000">
      <van-tab :title="TEAM_NAME[vTeam?.triCode!]" />
      <van-tab :title="TEAM_NAME[hTeam?.triCode!]" />
    </van-tabs>
    <view class="player-stats-table">
      <ATable :data="allPlayerStats?.[active] || []" :columns="columns" />
    </view>
    <view class="team-stats">
      <view class="team-stats__title">技术统计</view>
      <view class="team-stats__body">
        <view class="team-info-box">
          <view class="team-info" :class="{reverse: idx===1}" v-for="(t, idx) in teamScore" :key="idx">
            <component class="logo" :is="t?.ta" size="2em" />
            <text class="name">{{ TEAM_NAME[t?.ta] }}</text>
            <text>{{ t?.ta }}</text>
          </view>
        </view>
        <view class="rate-chart-list">
          <RateChart
            v-for="(i, idx) in allTeamStats"
            :key="idx"
            :title="i.title"
            :hScore="i.hScore"
            :vScore="i.vScore"
          />
          <view class="team-stats__tips">
            <view class="item">*所有数据长度</view>
            <view class="item">均采用对比相对值</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import API from '~/api'
import { Game, Team, Score, PlayerStats } from '~/types'
import { TEAM_NAME, STATS } from '~/constants'
import { Col } from '~/components/ATable/index.vue'

const hTeam = ref<Team>()
const vTeam = ref<Team>()
const active = ref<0 | 1>(0)

const columns: Col[] = [
  { width: 80, label: '球员', prop: 'ln', fixed: 'left' },
  { label: '首发', prop: 'pos', fixed: 'left' },
  { label: '时间', prop: 'min' },
  { label: '得分', prop: 'pts' },
  { label: '篮板', prop: 'reb' },
  { label: STATS['ast'], prop: 'ast' },
  { label: STATS['stl'], prop: 'stl' },
  { label: STATS['blk'], prop: 'blk' },
  { label: '投篮', prop: 'fgm' },
  { width: 82, label: '投篮命中率', prop: 'fghr' },
  { width: 68, label: STATS['tpm'], prop: 'tpm' },
  { width: 82, label: '三分命中率', prop: 'tphr' },
  { width: 68, label: STATS['ftm'], prop: 'ftm' },
  { width: 82, label: '罚球命中率', prop: 'fthr' },
  { label: STATS['oreb'], prop: 'oreb' },
  { label: STATS['dreb'], prop: 'dreb' },
  { label: STATS['tov'], prop: 'tov' },
  { label: STATS['pf'], prop: 'pf' },
  { label: '+/-', prop: 'pm' },
]

const teamScore = ref<Score[]>()
const allPlayerStats = ref<any[]>()
const allTeamStats = ref<any[]>()

onLoad(({ gameId, seasonYear, gameDate }) => {
  getGame(gameId!, gameDate!)
  getGameDetail(gameId!, seasonYear!)
})

async function getGame(gameId: string, gameDate: string) {
  const { data } = await API.getGamesByDate(gameDate)
  const game = (data.games as Game[]).find(g => g.gameId === gameId)
  if(!game) return
  hTeam.value = game.hTeam
  vTeam.value = game.vTeam
}

async function getGameDetail(gameId: string, seasonYear: string) {
  const { data } = await API.getGameDetails(seasonYear, gameId)
  if(!data.g) return
  const { hls, vls } = data.g
  teamScore.value = [vls, hls]

  allPlayerStats.value = [genPlayerStats(vls.pstsg), genPlayerStats(hls.pstsg)]
  allTeamStats.value = genTeamStats(vls, hls)
}

function genPlayerStats(pstsg: PlayerStats[]) {
  return pstsg.map(i => {
    return {
      ...i,
      min: `${i.min}:${i.sec}`,
      pos: `${i.pos ? '是' : '否'}`,
      fgm: `${i.fgm}/${i.fga}`,
      fghr: hitRate(i.fgm, i.fga),
      tpm: `${i.tpm}/${i.tpa}`,
      tphr: hitRate(i.tpm, i.tpa),
      ftm: `${i.ftm}/${i.fta}`,
      fthr: hitRate(i.ftm, i.fta),
    }
  })
}

function hitRate(m: number, a: number) {
  return m === 0 ? '0%' : `${(m/a*100).toFixed(1)}%`
}

function genTeamStats(vls: any, hls: any) {
  const vtst = vls.tstsg
  const htst = hls.tstsg
  return Object.entries(STATS).map(([key, title]) => ({
    title,
    vScore: key === 's' ? vls.s : vtst[key],
    hScore: key === 's' ? hls.s : htst[key],
  }))
}
</script>

<style lang="less" scoped>
.container {
  height: fit-content;
  padding: 0;
  .scoreboard {
    display: flex;
    padding: 10px;
    color: #FFFFFF;
    background-color: #8cbae8;
  }

  .line {
    width: 1px;
    margin: 0 20rpx;
    background-color: #FFFFFF;
  }

  .game-summary {
    height: 180rpx;
    margin: 28rpx;
    font-size: 24rpx;
    overflow: hidden;
    border-radius: 10rpx;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    &__header {
      line-height: 2em;
      background-color: #C8C9CC;
    }
    &__body {
      padding: 10rpx 0;
      font-weight: bold;
      .team-info {
        display: flex;
        align-items: center;
        .name {
          margin-left: 10rpx;
        }
      }
      .item {
        width: 2em;
        height: 2em;
        line-height: 2em;
      }
    }
  }

  .player-stats-table {
    margin: 28rpx 28rpx 0;
    font-size: 28rpx;
  }

  .team-stats {
    padding: 28rpx;
    text-align: center;
    .team-stats__title {
      line-height: 2em;
      font-weight: bold;
    }

    .team-stats__body {
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
      .team-info-box {
        display: flex;
        justify-content: space-between;
        padding: 28rpx;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        .team-info {
          display: flex;
          align-items: center;
          height: 2em;
          line-height: 2em;
          .logo {
            margin-right: 5px;
          }
          .name {
            padding: 0 5px;
          }
        }
        .reverse {
          flex-flow: row-reverse;
          .logo {
             margin-right: 0;
            margin-left: 5px;
          }
        }
      }

      .rate-chart-list {
        padding: 0 28rpx 28rpx;
        .team-stats__tips {
          margin-top: 20rpx;
          text-align: right;
          color: #969799;
          .item {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>

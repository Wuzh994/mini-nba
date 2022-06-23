<template>
  <view class="game-card">
    <view class="game-card__header">
      <view class="game-status">结束</view>
      <view class="game-type">季后赛</view>
    </view>
    <view class="game-card__body">
      <view class="team-card">
        <view class="logo">
          <component :is="vTeam.triCode" :size="'4rem'" />
        </view>
        <view class="team-card__info start">
          <text>{{ TEAM_NAME[vTeam.triCode] }}</text>
          <text>{{ vTeam.triCode }}</text>
          <text>{{ vTeam.win }}-{{ vTeam.loss }}</text>
        </view>
        <view class="score">{{ vTeam.score }}</view>
      </view>
      <view class="line" />
      <view class="team-card reverse">
        <view class="logo">
          <component :is="hTeam.triCode" :size="'4rem'" />
        </view>
        <view class="team-card__info end">
          <text>{{ TEAM_NAME[hTeam.triCode] }}</text>
          <text>{{ hTeam.triCode }}</text>
          <text>{{ hTeam.win }}-{{ hTeam.loss }}</text>
        </view>
        <view class="score">{{ hTeam.score }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Team } from '~/types'
import { TEAM_NAME } from '~/constants'

defineProps<{
  status: number
  vTeam: Team,
  hTeam: Team
}>()
</script>

<style lang="less" scoped>
.game-card {
  margin-top: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
  background-color: #fff;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    color: #fff;
    font-size: 24rpx;
    background: #ccc;
  }
  &__body {
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
  }
}

.line {
  width: 1px;
  margin: 0 20rpx;
  background-color: #000;
}

.team-card {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // padding: 20rpx;
  font-size: 24rpx;
  .logo,
  .score {
    flex-shrink: 1;
  }
  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 10rpx;
  }
  .score {
    font-size: 36rpx;
    font-weight: bold;
  }
}

.reverse {
  flex-flow: row-reverse;
}
.start {
  align-items: self-start;
}
.end {
  align-items: self-end;
}
</style>

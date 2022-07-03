<template>
  <view class="container">
    <DatePicker @change="dateChange" />
    <GameCard
      v-for="g in games"
      :key="g.gameId"
      :status="g.statusNum"
      :tags="g.tags"
      :h-team="g.hTeam"
      :v-team="g.vTeam"
      @click="handleClick(g as any)"
    />
    <view v-if="!games.length" class="empty-data">今日无比赛</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import API from '~/api'
import { Game } from '~/types'

const games = ref<Game[]>([])

async function dateChange(value: string) {
  const { data } = await API.getGamesByDate(value)
  games.value = data.games
}

type GameInfo = {
  gameId: string
  seasonYear: string
  homeStartDate: string
}

function handleClick({
  gameId,
  seasonYear,
  homeStartDate
}: GameInfo) {
  uni.navigateTo({
    url: `./detail?gameId=${gameId}&seasonYear=${seasonYear}&gameDate=${homeStartDate}`
  })
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 20rpx;

  .empty-data {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #969799;
  }
}
</style>

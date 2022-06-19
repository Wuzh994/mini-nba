<template>
  <view class="container">
    <DatePicker @change="dateChange" />
    <GameCard
      v-for="g in games"
      :key="g.gameId"
      :status="g.statusNum"
      :h-team="g.hTeam"
      :v-team="g.vTeam"
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
  console.log(data)
  games.value = data.games
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

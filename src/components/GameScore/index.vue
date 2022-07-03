<template>
  <view class="team-score" :class="{'reverse': reverse}">
    <view class="logo">
      <component :is="teamScore?.triCode" size="4rem" />
    </view>
    <view class="team-score__info" :class="reverse ? 'end' : 'start'">
      <text>{{ TEAM_NAME[teamScore?.triCode] }}</text>
      <text>{{ teamScore?.triCode }}</text>
      <text>{{ teamScore?.win }}-{{ teamScore?.loss }}</text>
    </view>
    <view class="score">{{ teamScore?.score ?? '--' }}</view>
  </view>
</template>

<script lang="ts" setup>
import { Team } from '~/types'
import { TEAM_NAME } from '~/constants'

interface Props {
  teamScore: Team,
  reverse?: boolean
}

withDefaults(defineProps<Props>(), {
  reverse: false
})
</script>

<style lang="less" scoped>
.team-score {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24rpx;
  .logo,
  .score {
    flex-shrink: 1;
  }
  .logo {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    // background-color: #C8C9CC;
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

<template>
  <view class="rate-chart">
    <text class="rate-chart__title">{{ title }}</text>
    <view class="rate-chart__body" :style="cssVars">
      <progress class="v-progress" :percent="100-percent[1]" stroke-width="20" color="#ebebeb" :backgroundColor="color[1]"></progress>
      <progress class="h-progress" :percent="percent[0]" stroke-width="20" :color="color[0]"></progress>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'

const props = defineProps<{
  title: string,
  hScore: number
  vScore: number
}>()

const H_COLOR = '#1d428a'
const V_COLOR = '#b52532'
const GREY = '#b1b2b3'

const cssVars = computed(() => ({
  '--data-h-score': `"${props.hScore}"`,
  '--data-v-score': `"${props.vScore}"`,
}))

const { percent, color  } = unref(computed(() => genData(props.hScore, props.vScore)))

function genData(hScore: number, vScore: number) {
  if(hScore === vScore) {
    return {
      percent: [100, 100],
      color: [H_COLOR, V_COLOR]
    }
  }
  const percent = hScore > vScore ? [100, (100/hScore)*vScore] : [(100/vScore)*hScore, 100]
  const color = hScore > vScore ? [H_COLOR, GREY] : [GREY, V_COLOR]
  return {
    percent,
    color
  }
}
</script>

<style lang="less" scoped>
.rate-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  font-size: 24rpx;

  .rate-chart__title {
    margin-top: .5em;
    line-height: 1.75em;
  }

  .rate-chart__body{
    display: flex;
    width: 100%;
    .h-progress,
    .v-progress {
      position: relative;
      flex: 1;
    }

    .h-progress {
      :deep(.uni-progress-inner-bar) {
        position: relative;
        &::after {
          position: absolute;
          top: 50%;
          right: 0.5em;;
          transform: translate(0, -50%);
          content: var(--data-h-score);
          color: #fff;
        }
      }
    }

    .v-progress {
      :deep(.uni-progress-inner-bar) {
        position: relative;
        &::after {
          position: absolute;
          top: 50%;
          right: -0.5em;
          transform: translate(100%, -50%);
          content: var(--data-v-score);
          color: #fff;
        }
      }
    }
  }
}
</style>

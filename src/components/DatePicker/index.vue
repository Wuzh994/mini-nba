<template>
  <view class="date-picker">
    <view class="date-picker__left" @click="changeDate('sub')">
      <van-icon name="arrow-left" />
    </view>
    <view class="date-picker__conter" @click="show = true">
      <van-icon name="notes-o" size="1.25rem" />
      <view class="date">{{ datetime }}</view>
    </view>
    <view class="date-picker__right" @click="changeDate('add')">
      <van-icon name="arrow" />
    </view>
  </view>
  <van-calendar
    color="#1989FA"
    v-model:show="show"
    :show-confirm="false"
    @confirm="onConfirm"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import {
  formatDate,
  getWeekday,
  addDays,
  subDays,
  getYearRange
} from '~/utils/handleDates'

const emits = defineEmits<{
  (event: 'change', gameDate: string): void
}>()

const date = ref(new Date())
const show = ref(false)
const { minDate,  maxDate} = getYearRange()

const datetime = computed(() => {
  const day = formatDate(date.value, 'MM月DD日')
  const weekday = getWeekday(date.value)
  return `${day} ${weekday}`
})

function changeDate(type: 'sub' | 'add') {
  const fn = {
    sub: subDays,
    add: addDays
  }
  date.value = fn[type](date.value)
}

function onConfirm(value: Date) {
  date.value = value
  show.value = false
}

watch(date, (curDate) => {
  const etDate = subDays(curDate)
  const gameDate = formatDate(etDate)
  emits('change', gameDate)
})
</script>

<style lang="less" scoped>
.date-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96rpx;
  padding: 0 20rpx;
  color: #333;
  background-color: #fff;

  &__conter {
    display: flex;
    align-items: center;
    .date {
      margin-left: 10rpx;
      font-weight: bold;
    }
  }

  &__left,
  &__right {
    padding: 10rpx;
  }
}
</style>

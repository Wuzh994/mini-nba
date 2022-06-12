<template>
  <view class="date-picker">
    <view class="date-picker__left" @click="subDate">
      <van-icon name="arrow-left" />
    </view>
    <view class="date-picker__conter" @click="show = true">
      <van-icon name="notes-o" size="1.25rem" />
      <view class="date">{{ date }}</view>
    </view>
    <view class="date-picker__right" @click="addDate">
      <van-icon name="arrow" />
    </view>
  </view>
  <van-calendar
    color="#1989FA"
    v-model:show="show"
    :show-confirm="false"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const date = ref('')
const show = ref(false)

function subDate() {
  console.log('aaa')
}
function addDate() {
  console.log('bbb')
}
function onConfirm(value: Date) {
  console.log(value)
  date.value = formatDate(value)
  show.value = false
}

function formatDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`
}

onMounted(() => {
  date.value = formatDate(new Date())
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

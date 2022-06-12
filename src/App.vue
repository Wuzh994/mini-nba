<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
page {
  display: flex;
  height: 100%;
}

.container {
  width: 100vw;
  height: 100%;
  padding: 0 28rpx;
  box-sizing: border-box;
  background-color: #f7f8fa;
}
</style>

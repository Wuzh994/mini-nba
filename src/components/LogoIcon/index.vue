<template>
  <!-- #ifdef APP-PLUS || H5 -->
  <component :is="name" size="2em" />
  <!-- #endif -->
  <!-- #ifdef MP-WEIXIN -->
  <IconComp :name="name" size="2em" />
  <!-- #endif -->
</template>

<script lang="ts" setup>
// #ifdef MP-WEIXIN
import * as Logos from 'vue-nba-logos'
// #endif

const props = defineProps<{
  name: string
}>()

// #ifdef MP-WEIXIN
const IconComp = (Logos as any)[props.name]
// #endif
</script>

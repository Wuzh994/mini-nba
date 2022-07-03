<template>
  <scroll-view
    class="a-table"
    scroll-x
    :style="setWidth"
  >
    <view class="th">
      <view
        v-for="(col, idx) in sortColumn"
        :key="idx"
        class="td"
        :class="col.fixed && `fixed-col__${col.fixed}`"
        :style="setDistance(col.fixed!, idx, col.width)"
      >
        <slot name="thCell">
          <text>{{ col.label }}</text>
        </slot>
      </view>
    </view>
    <template v-if="data?.length">
      <view
        v-for="(row, index) in data"
        :key="index"
        class="tr"
      >
        <view
          v-for="(col, idx) in sortColumn"
          :key="idx"
          class="td"
          :class="col.fixed && `fixed-col__${col.fixed}`"
          :style="setDistance(col.fixed!, idx, col.width)"
        >
          <slot
            name="bodyCell"
            :row="row"
            :col="col"
            :index="index"
          >
            <text>{{ row[col.prop] }}</text>
          </slot>
        </view>
      </view>
    </template>
    <view
      v-else
      class="empty-data"
    >暂无数据</view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export type Direction = 'right' | 'left'
export interface Col {
  width?: number,
  label: string,
  prop: string,
  fixed?: Direction
}

const props = defineProps<{
  width?: string,
  data: any[],
  columns: Col[]
}>()

const setWidth = computed(() => {
  return {
    width: props.width || '100%'
  }
})

const sortColumn = computed(() => {
  const copy = props.columns.map(i => {
    return {
      ...i,
      sort: i.fixed === 'left'
        ? -1 : i.fixed === 'right'
          ? 1 : 0
    }
  })
  copy.sort((a, b) => a.sort - b.sort)
  return copy
})

function setDistance(direction: Direction, idx: number, width = 40) {
  const directionIndex = transferIndex(direction, idx)
  const distance = sumWidth(direction, directionIndex)
  return {
    [width === 40 ? '' : 'min-width']: width + 'px',
    [direction]: distance - width + 'px'
  }
}

function sumWidth(direction: Direction, idx: number): number {
  let directionIndex = transferIndex(direction, idx)
  const colWidth = +(sortColumn.value[directionIndex]['width'] || 40)
  if(idx <= 0) return colWidth
  return colWidth + sumWidth(direction, --idx)
}

function transferIndex(direction: Direction, idx: number) {
  return direction === 'right' ? (sortColumn.value.length - idx - 1) : idx
}
</script>

<style lang="less" scoped>
.a-table {
  position: relative;
  margin: auto;
  font-size: 14px;
  box-sizing: border-box;

  .th {
    display: inline-flex;
    font-size: 12px;
    color: #646566;
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }
  .tr {
    display: inline-flex;
    border-bottom: 1px solid #eee;
  }

  .td {
    width: 100%;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    box-sizing: border-box;
    background-color: #f8f9fa;
  }

  .fixed-col__left,
  .fixed-col__right {
    width: fit-content;
    position: sticky;
  }

  .th {
    .td {
      background-color: #fff;
    }
  }

   .tr:nth-child(-n + 6) {
      .td {
        background-color: #fff;
      }
    }


  .empty-data {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

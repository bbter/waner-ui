<template>
  <div class="waner-tabs">
    <div class="waner-tabs-nav">
      <div
        class="waner-tabs-nav-item"
        :ref="el => {if (el) navItems[index] = el}"
        :class="{ selected: t === selected }"
        @click="select(t)"
        v-for="(t, index) in titles"
        :key="index"
      >
        {{ t }}</div>
        <div class="waner-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="waner-tabs-content">
      <component
        :class="{ selected: c.props.title === selected }"
        v-for="(c,index) in defaults"
        :key="index"
        class="waner-tabs-content-item"
        :is="c"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import Tab from "./Tab.vue";
export default {
  props: {
    selected: {
      type: String,
    },
  },
  setup(props, context) {
    const defaults = context.slots.default();
    const navItems = ref<HTMLDivElement[]>([])
    const indicator = ref<HTMLDivElement>(null)
    onMounted(()=>{
        const divs = navItems.value
        const result = divs.filter(div=>div.classList.contains('selected'))[0]
        const {width} = result.getBoundingClientRect()
        indicator.value.style.width = width + 'px'
    })
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 子标签必须是Tab");
      }
    });
    const titles = defaults.map((tag) => {
      return tag.props.title;
    });
    const current = computed(() => {
      return defaults.filter((tag) => {
        return (tag.props.title = props.selected);
      })[0];
    });
    const select = (title: string) => {
      context.emit("update:selected", title);
    };
    return { defaults, titles, current, select,navItems,indicator };
  },
};
</script>

<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;
.waner-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;
    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: $blue;
      }
    }
     &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
    }
  }
  &-content {
    padding: 8px 0;
    &-item {
      display: none;
      &.selected {
        display: block;
      }
    }
  }
}
</style>
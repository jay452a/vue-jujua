<style scoped lang="postcss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 92px;
  background-color: var(--mainColor);
  display: flex;
  align-items: center;
  padding: 0 30px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  z-index:100;
  & .back {
    width: 44px;
    position: absolute;
    left:30px;
  }
  & .title {
    width: 480px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 36px;
  }
  & .right {
    position: absolute;
    right:30px;
  }
  & .left{
     position: absolute;
     left:30px
    }
}
</style>
<template>
  <header>
    <div class="left">
      <slot name="left"></slot>
    </div>
    <img src="@/assets/back.svg" alt="" class="back" v-if="!noBack" @click="back">
    <p class="title">{{title}}</p>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </header>
</template>
<script>
export default {
  name: 's-header',
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: 'Default Title',
    },
    noBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

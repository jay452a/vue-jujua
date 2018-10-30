<style scoped lang="postcss">
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 106px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  background-color: #fdfdfd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #777;
  & .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    & .icon {
      width: 50px;
      margin-bottom: 8px;
    }
    &.router-link-active {
      color: var(--mainColor);
    }
  }
}
</style>
<template>
  <footer>
    <router-link tag="div" to="/index" class="item">
      <img :src="tabbarActive === '/index'?'/static/tab_index_highlighted.png':'/static/tab_index_normal.png'" alt="" class="icon">
      <span>健康养老</span>
    </router-link>
    <router-link tag="div" to="/manage" class="item">
      <img :src="tabbarActive === '/manage'?'/static/tab_index_personal_information_d.png':'/static/tab_index_personal_information.png'" alt="" class="icon">
      <span>健康管理</span>
    </router-link>
    <router-link tag="div" to="/center" class="item">
      <img :src="tabbarActive === '/center'?'/static/tab_index_person_highlighted.png':'/static/tab_index_person.png'" alt="" class="icon">
      <span>个人中心</span>
    </router-link>
  </footer>
</template>
<script>
export default {
  name: 's-action-bar',
  data() {
    return {
    };
  },
  computed: {
    tabbarActive() {
      return this.$route.path;
    },
  },
};
</script>

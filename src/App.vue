<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  computed:{
    ...mapState({
      history: state => state.history,
    })
  },
  methods: {
  ...mapActions({
      saveHistory: 'saveHistory' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  },
  watch:{
    '$route'(to, from){
      console.log(to, from)
      console.log(this.history, 'history')
      let toPath = to.path
      let fromPath = from.path
      if(this.history.indexOf(toPath) == -1) {
        this.history.push(toPath)
        this.saveHistory(this.history)
      }
      if(this.history.indexOf(toPath) > -1) {
          let indexTo = this.history.indexOf(toPath)
          let indexPath = this.history.indexOf(fromPath)
          if(indexTo < indexPath) {
              this.transitionName = 'slide-right'
          }else{
            this.transitionName = 'slide-left'
          }
      }
      if(toPath === '/index') {
        this.saveHistory(['/index'])
      }
    }
  },
  created() {
      window.location.href = '#/index'
  }
};
</script>

<style>

html,
body {
  background-color: #f3f4f5;
}
a {
  text-decoration: none;
}
.md-button.primary.large,
.md-button.primary.small {
  height: 80px !important;
  line-height: 80px !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.s-header {
  margin-top: 92px;
}
.s-action-bar {
  margin-bottom: 106px;
}
.md-button.primary {
  /* background-color: var(--mainColor); */
}
ul{
  list-style: none;
}
.Router {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all .377s ease;
  box-sizing: border-box;
  overflow: auto;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>

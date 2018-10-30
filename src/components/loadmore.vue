<style scoped lang="postcss">
.progress-box {
  background-color: #f3f4f5;
  text-align: center;
  padding: 30px 0;
  color: #dedede;
  font-size: 28px;
  display: flex;
  align-self: center;
  justify-content: center;
  & > .progress {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 2px solid #dedede;
    border-right-color: transparent;
    border-radius: 100%;
    margin-right: 20px;
    animation: rotate 0.6s linear infinite;
  }
  & > .text.nomore {
    position: relative;
    &::after,
    &::before {
      content: "";
      border-top: 1px solid #dedede;
      display: block;
      position: absolute;
      width: 220px;
    }
    &::after {
      right: -236px;
      top: 22px;
    }
    &::before {
      left: -236px;
      top: 22px;
    }
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
    transform: rotateZ(360deg);
    -moz-transform: rotate(360deg);
  }
}
.loadmore-totop {
  position: fixed;
  z-index: 9990;
  right: 20px;
  bottom: 120px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-image: url("/static/loadmore-totop.png");
  background-size: 100% 100%;
}
</style>

<template>
  <div>
    <slot></slot>
    <p ref="loading" class="progress-box" v-show="!nomoreHidden">
      <i class="progress roate" v-show="loadingData && !nomore"></i>
      <span class="text" v-show="loadingData && !nomore">加载数据中....</span>
      <span class="text nomore" v-show="nomore">{{nomoreText}}</span>
    </p>
    <i class="loadmore-totop" @click="scrollTo(0,300)" v-show="showToTop"></i>
  </div>
</template>
<script>
export default {
  name: 'loadmore',
  props: {
    nomoreHidden: {
      type: Boolean,
      default: false,
    },
    nomoreText: {
      type: String,
      default: '没有更多动态',
    },
  },
  data() {
    return {
      uuid: Math.random().toString(36).substring(3, 8),
      loadingData: false,
      innerHeight: window.innerHeight,
      threshold: 30,
      nomore: false,
      showToTop: false,
      radom: Math.random().toString(36).substring(3, 8),
    };
  },
  mounted() {
    // console.log(`mounted_${this.radom}`);
    this.loadingData = true;
    // this.$emit('pullingUp');
    window.onscroll = () => {
      if (window.scrollY > 1200 && !this.showToTop) {
        this.showToTop = true;
      } else if (window.scrollY < 1200 && this.showToTop) {
        this.showToTop = false;
      }
      if (!this.loadingData && !this.nomore) {
        if (
          this.$refs.loading.getBoundingClientRect().bottom - this.innerHeight <
          this.threshold
        ) {
          this.loadingData = true;
          this.$emit('pullingUp');
        }
      }
    };
  },
  beforeDestroy() {
    // console.log(`beforeDestroy_${this.radom}`);
    window.onscroll = () => {};
  },
  // components keep-alive hack
  created() {
    // console.log(`created_${this.radom}`);
  },
  activated() {
    // console.log(`activated_${this.radom}`);
    // this.loadingData = true;
    // this.$emit('pullingUp');
    window.onscroll = () => {
      // console.log('activatedScroll');
      if (window.scrollY > 1200 && !this.showToTop) {
        this.showToTop = true;
      } else if (window.scrollY < 1200 && this.showToTop) {
        this.showToTop = false;
      }
      if (!this.loadingData && !this.nomore) {
        if (
          this.$refs.loading.getBoundingClientRect().bottom - this.innerHeight <
          this.threshold
        ) {
          this.loadingData = true;
          this.$emit('pullingUp');
        }
      }
    };
  },
  deactivated() {
    // console.log(`deactivated_${this.radom}`);
    window.onscroll = () => {};
  },
  methods: {
    endUpLoading(status = true) {
      this.loadingData = false;
      if (status) {
        this.nomore = true;
      }
    },
    scrollTo(y, duration) {
      const translateDuration = duration || 0;
      const nowY = window.scrollY;
      const diff = nowY - y;
      const count = Math.floor(translateDuration / 16.67);
      const step = diff / count;
      let curr = 0;
      const execute = () => {
        if (curr < count) {
          if (curr === count - 1) {
            // 最后一次直接设置y,避免计算误差
            window.scrollTo(0, y);
          } else {
            window.scrollTo(0, window.scrollY - step);
          }
          curr += 1;
          requestAnimationFrame(execute);
        } else {
          window.scrollTo(0, y);
          this.isScrollTo = false;
        }
      };
      requestAnimationFrame(execute);
    },
    resetUpLoading() {
      this.nomore = false;
      this.loadingData = false;
    },
  },
};
</script>

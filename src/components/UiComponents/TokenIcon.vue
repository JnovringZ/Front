<template>
  <div
    class="token-icon-wrap"
    :class="{ 'i-wrap': token === 'FISH' || full, pair: itsGroup, mini }"
  >
    <img :src="tokenIcon" alt="" class="token-icon" />
  </div>
</template>

<script>
const groupBg = require(`@/assets/images/tokens-icon/group_bg.svg`);
export default {
  props: {
    token: {
      type: String,
      default: 'ETH',
    },
    mini: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      groupTokens: [' ', ' ', ' '],
    };
  },
  computed: {
    tokenIcon() {
      try {
        const tokenImage = require(`@/assets/images/tokens-icon/Token_${this.token}.svg`);

        return (
          tokenImage || require('@/assets/images/tokens-icon/Token_FISH.svg')
        );
      } catch (e) {
        return require('@/assets/images/tokens-icon/Token_FISH.svg');
      }
    },
    bgIcon() {
      if (this.groupTokens.indexOf(this.token) !== -1) return groupBg;

      return bg;
    },
    itsGroup() {
      return this.groupTokens.indexOf(this.token) !== -1;
    },
  },
};
</script>

<style lang="scss" scoped>
.token-icon-wrap {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  margin-right: 10px;
  position: relative;

  &.mini {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;

    &.pair {
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
    }
  }

  &.pair {
    width: 46px;
    height: 40px;
    min-width: 46px;
    min-height: 40px;
  }

  &.i-wrap {
    .token-icon {
      width: 32px;
      height: 32px;
      object-fit: contain;
      max-width: 100%;
    }

    .bg {
      opacity: 0;
    }
  }

  .bg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .token-icon {
    max-width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>

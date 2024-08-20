<template>
  <button
    class="btn mini connect-btn"
    :class="{ load: connectLoader }"
    @click="walletBtnHandler()"
    @mouseenter="itsHover = true"
    @mouseleave="itsHover = false"
  >
    {{ walletBtnText }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      itsHover: false,
      connectLoader: false,
      btnText: 'Connect wallet',
    };
  },
  computed: {
    walletBtnText() {
      let account = this.$store.getters.getAccount;

      if (account) {
        let startAddr = account.slice(0, 6);
        let endAddr = account.slice(-6);

        return `${startAddr}...${endAddr}`;
      } else {
        return 'Connect wallet';
      }
    },
    isWalletConnected() {
      return this.$store.getters.getWalletIsConnected;
    },
  },
  methods: {
    async walletBtnHandler() {
      if (this.isWalletConnected) {
        // this.toDashboard();
        return false;
      }

      if (!window.ethereum) return false;

      if (typeof window.ethereum === 'undefined') {
        alert('Install MetaMask, please');
      }

      this.connectLoader = true;
      try {
        await this.$store.dispatch('connectAccount', window.ethereum);
      } catch (e) {
        console.log('e:', e);
      }
      this.connectLoader = false;
    },
    toDashboard() {
      this.$router.push({ name: 'dashboard' });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.connect-btn {
  border: 1px solid $navText;
  margin-left: 15px;
  color: $navText;
  width: 170px;
  min-height: 38px;
  display: flex;
  &:hover {
    background: $clrYellow;
    border: 1px solid $clrYellow;
    color: #000;
  }
}
</style>

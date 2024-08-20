<template>
  <div class="popup-wrap" v-if="popupActiveType">
    <BrowserPopup @close="closePopup" v-if="popupActiveType === 'browser'" />

    <NetworkPopup @close="closePopup" v-if="popupActiveType === 'network'" />
    <WrongNetworkPopup
      @close="closePopup"
      v-if="popupActiveType === 'wrong-network'"
    />
  </div>
</template>

<script>
const BrowserPopup = () => import('@/components/Popups/BrowserPopup');
const WrongNetworkPopup = () => import('@/components/Popups/WrongNetworkPopup');
const NetworkPopup = () => import('@/components/Popups/NetworkPopup');

export default {
  methods: {
    closePopup() {
      this.$store.commit('closePopups');
    },
  },
  computed: {
    popupActiveType() {
      return this.$store.getters.getPopupType;
    },
  },
  components: {
    BrowserPopup,
    NetworkPopup,
    WrongNetworkPopup,
  },
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding-bottom: 60px;
  padding-top: $headerHeight;
}

@media screen and(max-width: 640px) {
  .popup-wrap {
    display: block;
    padding-bottom: 30px;
  }
}
</style>

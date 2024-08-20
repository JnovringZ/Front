<template>
  <div id="app">
    <template v-if="!checkInProcess">
      <Header></Header>

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <Footer></Footer>

      <PopupsWrapper v-if="showPopup" />
    </template>

    <MetamaskChecker
      @checkSuccess="metamaskCheckSuccess()"
      @checkError="metamaskCheckError()"
    />

    <NotificationContainer />
  </div>
</template>
<script>
const Header = () => import('@/components/Header');
const Footer = () => import('@/components/Footer');

const PopupsWrapper = () => import('@/components/Popups/PopupWrapper');
const NotificationContainer = () =>
  import('@/components/Notifications/NotificationContainer');
const MetamaskChecker = () =>
  import('@/components/MetamaskChecker/MetamaskChecker');

export default {
  data() {
    return {
      checkInProcess: true,
    };
  },
  computed: {
    showPopup() {
      return this.$store.getters.getPopupState;
    },
  },
  created() {},
  methods: {
    //check metamask success
    async metamaskCheckSuccess() {
      this.checkInProcess = false;

      this.Timer = setInterval(async () => {}, 6000);
    },
    //check metamask error
    metamaskCheckError(message) {
      this.checkInProcess = false;

      if (message) alert(message);
    },
  },
  beforeDestroy() {
    clearInterval(this.Timer);
  },
  components: {
    Header,
    Footer,
    PopupsWrapper,
    MetamaskChecker,
    NotificationContainer,
  },
};
</script>

<style lang="scss">
@import url('styles/_fonts.scss');
@import url('styles/_animations.scss');
@import '~normalize.css';

#app {
  text-align: center;
  color: $clrText;
  background-color: $clrBg1;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

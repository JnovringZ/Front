<template>
  <header class="app-header">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="logo-wrap">
        <div class="logo">
          <div class="logoimg">
            <img src="../assets/images/Mega沙奈朵.png" weight="50px" height="100px" />
            <p>Beta Version</p>
          </div>
        </div>
      </router-link>
      <nav>
        <router-link :to="{ name: 'home' }" class="nav-link">Homepage</router-link>
        <router-link :to="{ name: 'bond' }" class="nav-link">NFTs</router-link>
        <router-link :to="{ name: 'stake' }" class="nav-link">Stake</router-link>
        <div class="btns-wrap">
          <NetworkButton
            @click="networkClickHandler"
            :networkType="activeNetwork"
          />
          <ConnectButton />
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
const NetworkButton = () => import('@/components/UiComponents/NetworkButton');
const ConnectButton = () => import('@/components/UiComponents/ConnectButton');
const TokenButton = () => import('@/components/UiComponents/AddTokenBtn');
export default {
  mounted() {},
  computed: {
    activeNetwork() {
      return this.$store.getters.getActiveNetwork;
    },
  },
  methods: {
    networkClickHandler() {
      this.$store.commit('setPopupState', {
        type: 'network',
        isShow: true,
      });
    },
  },
  components: {
    NetworkButton,
    ConnectButton,
    TokenButton,
  },
};
</script>

<style lang="scss" scoped>
.logo-wrap {
  text-decoration: none;
}

.app-header {
  height: $headerHeight;
  z-index: 200;
  background-color: $navBgc;

  &.transparent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .logo-bg {
      display: block;
    }
  }

  .logo-bg {
    display: none;
    position: absolute;
    top: -30px;
    left: -125px;
    width: auto;
    z-index: 1;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .logo {
    color: $navText;
    width: 380px;
    height: auto;
    object-fit: contain;
    position: relative;

    .logoimg {
      height: 100px;
    }
  }

  nav {
    display: flex;
    align-items: center;
    margin-left: auto;
    position: relative;
    z-index: 2;
    .btns-wrap {
      margin-left: 30px;
      display: flex;
      align-items: center;
      .btn-margin {
        margin-left: 30px;
      }
    }
    .nav-link {
      font-style: normal;
      font-weight: bolder;
      font-size: 16px;
      line-height: 1.2;
      text-transform: uppercase;
      color: $navText;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        color: $clrNavHover;
      }
    }
  }
}

.offcanvas {
  background-color: #444;
  .offcanvas-title {
    color: #fff;
  }
}
</style>

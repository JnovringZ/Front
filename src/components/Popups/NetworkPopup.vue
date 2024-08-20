<template>
  <div class="network-popup">
    <img
      src="@/assets/images/close-popup.svg"
      alt=""
      class="close-btn"
      @click="closePopup()"
    />
    <p class="title text-start">Choose Network</p>

    <div class="networks-wrap">
      <div v-for="network in networksArr" :key="network.chainId">
        <NetworkButton
          class="networkButton"
          :networkType="network.chainId"
          @click="switchNetwork(network.chainId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
const NetworkButton = () => import('@/components/UiComponents/NetworkButton');
export default {
  data() {
    return {
      networksData: [
        {
          chainId: '0xa869',
          chainName: 'FUJI',

          rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpcs'],

          iconUrls: [
            'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
          ],

          blockExplorerUrls: ['https://testnet.snowtrace.io/'],

          nativeCurrency: {
            name: 'Test-AVAX',
            symbol: 'Test-AVAX',
            decimals: 18,
          },
        },
        {
          chainId: '0x38',
          chainName: 'Binance Smart Chain Mainnet',
          rpcUrls: ['https://bsc-dataseed1.binance.org/'],
          iconUrls: [
            'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
          ],
          blockExplorerUrls: ['https://bscscan.com/'],
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
        },
        {
          chainId: '0x61',
          chainName: 'Binance Smart Chain Test',
          rpcUrls: ['https://data-seed-prebsc-2-s2.binance.org:8545/'],
          iconUrls: [
            'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
          ],
          blockExplorerUrls: ['https://testnet.bscscan.com/'],
          nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
          },
        },

        {
          chainId: '0xaa36a7',
          chainName: 'Sepolia Testnet',
          rpcUrls: ['https://rpc.sepolia.org'],
          iconUrls: [
            'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
          ],
          blockExplorerUrls: ['https://sepolia.etherscan.io'],
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
        },
      ],
    };
  },
  computed: {
    networksArr() {
      return this.$store.getters.getAvailableNetworks;
    },
    currentNetwork() {
      const activeNewtork = this.$store.getters.getActiveNetwork;
      if (activeNewtork === '0x61') return 'Binance Smart Chain Test';

      // if (activeNewtork === '0xa86a') return 'Avalanche Mainnet';

      // if (activeNewtork === '0x1') return 'Ethereum Mainnet'

      // if (activeNewtork === '0x38') return 'Binance Smart Chain'

      // if (activeNewtork === '0xfa') return 'Fantom Opera'

      return '';
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    async switchNetwork(chainId) {
      //don't must newtork is avax
      // if (chainId === '0xa86a') {
      //   alert('Change in Metamask:(')
      //   return false
      // }

      const data = this.networksData.find((item) => item.chainId === chainId);

      let resp = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [data],
      });

      if (resp === null) {
        this.$store.commit('setActiveNetwork', chainId);
        this.closePopup();
      }
    },
  },
  components: {
    NetworkButton,
  },
};
</script>

<style lang="scss" scoped>
.networkButton {
}
.network-popup {
  padding: 20px;
  background: #ccc;
  border: 1px solid #000;
  width: 95%;
  max-width: 590px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    object-fit: contain;
    z-index: 3;
  }
}
</style>

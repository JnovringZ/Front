<template>
  <div class="metamask-checker"></div>
</template>

<script>
import detectEthereumProvider from '@metamask/detect-provider';
export default {
  data() {
    return {
      checkInProgress: true,
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
    availableNetworks() {
      return this.$store.getters.getAvailableNetworks;
    },
    walletIsConnected() {
      return this.$store.getters.getWalletIsConnected;
    },
    chainId() {
      return this.$store.getters.getChainId;
    },
  },
  watch: {
    walletIsConnected(value) {
      if (value && !this.checkInProgress) {
        this.compareNetworkSupport(this.chainId);
        this.setAccountListeners();
        this.$emit('checkSuccess');
      }
    },
  },
  methods: {
    async checkProvider() {
      const provider = await detectEthereumProvider();

      if (!provider) {
        this.$store.commit('setPopupState', {
          type: 'browser',
          isShow: true,
        });
        this.$emit('checkError', '請安裝 MetaMask！');
        return false;
      }

      if (provider !== window.ethereum) {
        this.$emit('checkError', '你安裝了多個錢包嗎？');
        return false;
      }

      const userProvider = new this.$ethers.providers.Web3Provider(
        window.ethereum
      );

      const userSigner = userProvider.getSigner();

      this.$store.commit('setMetamaskActive', true);
      this.$store.commit('setProvider', userProvider);
      this.$store.commit('setSigner', userSigner);

      await this.checkConnection();
    },
    async checkConnection() {
      const address = await this.$store.dispatch(
        'fetchAccount',
        window.ethereum
      );

      if (!address) {
        this.$emit('checkError', '');
        this.checkInProgress = false;
        return false;
      }

      this.$store.commit('setWalletConnection', true);
      const chainId = await this.$store.dispatch(
        'fetchChainId',
        window.ethereum
      );
      this.compareNetworkSupport(chainId);
      this.setAccountListeners();

      this.checkInProgress = false;
      this.$emit('checkSuccess');
    },
    async compareNetworkSupport(chainId) {
      const networkObject = this.availableNetworks.find(
        (network) => network.chainId === chainId
      );
      if (chainId != '0x61' || chainId != '0x38') {
        // const data = this.networksData.find((item) => item.chainId === '0x38');
        // let resp = await window.ethereum.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [data],
        // });
        // if (resp === null) {
        //   this.$store.commit('setActiveNetwork', chainId);
        //   this.closePopup();
        // }
      }

      if (networkObject) this.$store.commit('setActiveNetwork', chainId);
    },
    setAccountListeners() {
      window.ethereum.on('chainChanged', this.onChainIdChange);
      window.ethereum.on('accountsChanged', this.onAccountChange);
    },
    //metamask is change
    onAccountChange(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts

        this.disconnectHandler();
      } else {
        this.$store.commit('setAccount', accounts[0]);
        window.location.reload();
      }
    },
    onChainIdChange() {
      window.location.reload();
    },
    //put out metamask
    disconnectHandler() {
      this.$store.commit('closePopups');
      this.$store.commit('setAccount', null);
      this.$store.commit('setWalletConnection', false);
      this.$store.commit('setChainId', null);
      this.$store.commit('setActiveNetwork', '0x61');
      this.$store.commit('setFarmPools', []);
      this.$store.commit('setPools', []);
      this.$store.commit('setSwapObject', null);

      const routeName = this.$route.name;
      if (routeName !== 'Home') this.$router.push({ name: 'Home' });

      this.$emit('checkError', '請再次斷開處理程序');
    },
  },
  created() {
    this.checkProvider();
  },
};
</script>

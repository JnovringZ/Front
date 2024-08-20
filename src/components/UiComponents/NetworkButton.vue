<template>
  <button class="btn mini network-btn" @click="clickHandler()">
    <img :src="activeNetwork.icon" alt="" />
    {{ activeNetwork.title }}
  </button>
</template>

<script>
import avaxIcon from '@/assets/images/networks/avax-icon.png';
import ethIcon from '@/assets/images/networks/ethereum-icon.svg';
import binanceIcon from '@/assets/images/networks/binance-icon.svg';
import fantomIcon from '@/assets/images/networks/fantom-icon.svg';

export default {
  props: {
    networkType: {
      type: String,
      default: '0x61',
    },
  },
  data() {
    return {
      networks: [
        {
          chainid: '0xa869',
          title: 'FUJI',
          icon: avaxIcon,
        },
        {
          chainid: '0xa86a',
          title: 'Avax',
          icon: avaxIcon,
        },
        {
          chainid: '0x1',
          title: 'ERC-20',
          icon: ethIcon,
        },
        {
          chainid: '0x38',
          title: 'BSC',
          icon: binanceIcon,
        },
        // {
        //   chainid: '0xfa',
        //   title: 'FANTOM',
        //   icon: fantomIcon,
        // },
        {
          chainid: '0x61',
          title: 'BSC TEST',
          icon: binanceIcon,
        },
        {
          chainid: '0xaa36a7',
          title: 'Sepolia',
          icon: ethIcon,
        },
      ],
    };
  },
  computed: {
    activeNetwork() {
      return this.networks.find((item) => item.chainid == this.networkType);
    },
  },
  methods: {
    clickHandler() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.network-btn {
  border: 1px solid $navText;
  color: $navText;
  width: 130px;
  img {
    width: 12px;
    height: auto;
    margin-right: 8px;
    vertical-align: middle;
    font-size: 0;
  }
}
</style>

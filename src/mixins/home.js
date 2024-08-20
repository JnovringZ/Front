
export default {
    computed: {
        chainId() {
            return this.$store.getters.getChainId;
        },
        signer() {
            return this.$store.getters.getSigner;
        },
        account() {
            return this.$store.getters.getAccount;
        },
    },
    methods: {






        async updateInfo() {

        },
    },
    async mounted() {

        await this.updateInfo();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    data() {
        return {
            usdcBalance: '...',
            pirce: '...',
            amt: 1,
            roi: '...',
            profit: 0,
            peekSpot: 0
        };
    },
};

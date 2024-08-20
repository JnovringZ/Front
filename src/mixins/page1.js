import createPage1Info from "@/utils/contracts/page1.js";

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
        _createInfo() {
            const _Info = createPage1Info.find(
                (contract) => contract.contractChain === this.chainId
            );
            return _Info
        },
        async createContract() {
            const Contract = new this.$ethers.Contract(
                this._createInfo().token.address,
                JSON.stringify(this._createInfo().token.abi),
                this.signer
            );
            return Contract;
        },

        async tokenBalance() {
            return await this.Contract.balanceOf(this.account);
        },

        async mint(_val) {
            var inputNumber_ = this.$ethers.utils.parseUnits(
                _val,
                18
            );
            return await this.Contract.mint(this.account, inputNumber_);
        },

        async updateInfo() {
            this.balance = await this.tokenBalance() / 1e18;
        },
    },
    async mounted() {
        this.Contract = await this.createContract();

        this.timer = setInterval(async () => {
            await this.updateInfo();
        }, 6000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    data() {
        return {
            input_: 0,
            balance: '...',
            usdcBalance: '...',
        };
    },
};

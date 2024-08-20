import createPage2Info from "@/utils/contracts/page2.js";

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
            const _Info = createPage2Info.find(
                (contract) => contract.contractChain === this.chainId
            );
            return _Info
        },
        async createClaimContract() {
            const Contract = new this.$ethers.Contract(
                this._createInfo().claim.address,
                JSON.stringify(this._createInfo().claim.abi),
                this.signer
            );
            return Contract;
        },
        async createTokenContract() {
            const Contract = new this.$ethers.Contract(
                this._createInfo().token.address,
                JSON.stringify(this._createInfo().token.abi),
                this.signer
            );
            return Contract;
        },
        async createATokenContract() {
            const Contract = new this.$ethers.Contract(
                this._createInfo().aToken.address,
                JSON.stringify(this._createInfo().aToken.abi),
                this.signer
            );
            return Contract;
        },
        async createUSDCContract() {
            const Contract = new this.$ethers.Contract(
                this._createInfo().usdc.address,
                JSON.stringify(this._createInfo().usdc.abi),
                this.signer
            );
            return Contract;
        },
        async createWLContract() {
            const Contract = new this.$ethers.Contract(
                this._createInfo().whiteList.address,
                JSON.stringify(this._createInfo().whiteList.abi),
                this.signer
            );
            return Contract;
        },
        async tokenBalance_() {
            return await this.tokenContract.balanceOf(this.account) / 1e18;
        },
        async name() {
            return await this.tokenContract.name();
        },
        async mint(val_) {
            var inputNumber_ = this.$ethers.utils.parseUnits(
                val_,
                18
            );
            console.log(inputNumber_)
            await this.Contract.mint(this.account, inputNumber_);
        },
        //我的假USDC餘額：
        async usdcBalance_() {
            return await this.usdcContract.balanceOf(this.account) / 1e18;
        },
        //approve
        async approve() {
            try {
                let tx = await this.usdcContract.approve(this.whiteListContract.address, '1000000000000000000000000000');
                await tx.wait();
                alert('成功提交');
            } catch (e) {
                alert(e.message)
            }

        },

        async approveToClaim() {
            try {
                let tx = await this.aTokenContract.approve(this.claimContract.address, '1000000000000000000000000000');
                await tx.wait();
                alert('成功提交');
            } catch (e) {
                alert(e.message)
            }

        },
        //提交
        async buy(amt_) {
            try {
                var inputNumber_ = this.$ethers.utils.parseUnits(
                    amt_,
                    18
                );
                let tx = await this.whiteListContract.participate(inputNumber_);
                await tx.wait();
                alert('成功提交');
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);

            }
        },
        //atoken
        async aTokenBalance_() {
            return await this.aTokenContract.balanceOf(this.account) / 1e18;
        },
        //領取按鈕
        async claim() {
            try {
                let tx = await this.claimContract.goClaim();
                await tx.wait();
                alert('成功提交');
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);

            }
        },

        async updateInfo() {
            this.tokenBalance_().then((data) => {
                this.tokenBalance = data;
            })

            this.name().then((data) => {
                this.tokenName = data;
            })

            this.usdcBalance_().then((data) => {
                this.usdcBalance = data;
            })

            this.aTokenBalance_().then((data) => {
                this.aTokenBalance = data;
            })
        },
    },
    async mounted() {
        this.tokenContract = await this.createTokenContract();
        this.usdcContract = await this.createUSDCContract();
        this.aTokenContract = await this.createATokenContract();
        this.whiteListContract = await this.createWLContract();
        this.claimContract = await this.createClaimContract();

        this.timer = setInterval(async () => {
            await this.updateInfo();
        }, 6000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    data() {
        return {
            aTokenBalance: '...',
            usdcBalance: '...',
            tokenName: '...',
            tokenBalance: '...',
            input_: 0,
        };
    },
};

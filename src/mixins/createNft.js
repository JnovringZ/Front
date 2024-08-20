import createNftInfo from "@/utils/contracts/createNft.js";

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
    watch: {
        amt() {
            if (this.amt > 20) {
                this.amt = 20;
            }
        }
    },
    methods: {
        cutAmt() {
            if (this.amt - 1 < 0) {
                this.amt = 0;
            } else {
                this.amt = Number(this.amt) - 1
            }
            return this.amt;
        },
        addAmt() {
            this.amt = Number(this.amt) + 1;
            if (this.amt > 20) {
                this.amt = 20;
            }
            return this.amt
        },

        //输入数字, 和保留几位小数
        retain(num, d) {
            return (parseInt(num * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
        },
        _createNftInfo() {
            const _createNftInfo = createNftInfo.find(
                (contract) => contract.contractChain === this.chainId
            );
            // console.log(_createNftInfo);
            return _createNftInfo
        },
        async createBuyNFTLogicContract() {
            const buyNFTLogicContract = new this.$ethers.Contract(
                this._createNftInfo().usdcBuyNftLogic.address,
                JSON.stringify(this._createNftInfo().usdcBuyNftLogic.abi),
                this.signer
            );
            return buyNFTLogicContract;
        },
        async createFishContract() {
            const fishContract = new this.$ethers.Contract(
                this._createNftInfo().FISH.address,
                JSON.stringify(this._createNftInfo().FISH.abi),
                this.signer
            );
            return fishContract;
        },
        async createUSDCContract() {
            const USDCContract = new this.$ethers.Contract(
                this._createNftInfo().USDC.address,
                JSON.stringify(this._createNftInfo().USDC.abi),
                this.signer
            );
            return USDCContract;
        },
        async checkCreateNftApprove() {
            //查询 this.account 账户授权给 buyNFTLogicContract.address 账户的代币数量
            let apporveNum = await this.USDCContract.allowance(this.account, this.buyNFTLogicContract.address);
            console.log(apporveNum)
            if (apporveNum > 100000000000000000000000) {
                this.createNftApprove = true
            } else {
                this.createNftApprove = false
            }
        },
        async getUSDCBalanceOf() {
            this.BalanceOf_ = await this.USDCContract.balanceOf(this.account);
            const balanceOf = this.retain(parseFloat(this.$ethers.utils.formatUnits(this.BalanceOf_.toString(), 18)), 4);
            return balanceOf;
        },

        async getPirce() {
            this.pirce_ = await this.buyNFTLogicContract.price();
            const pirce_ = this.retain(parseFloat(this.$ethers.utils.formatUnits(this.pirce_.toString(), 18)), 4);
            return pirce_;
        },

        async getRoi() {
            this.roi_ = await this.buyNFTLogicContract.ROI();
            return this.roi_ / 100;
        },

        async getPeekSpot() {
            this.peekSpot_ = await this.buyNFTLogicContract.peekSpot();
            const peekSpot_ = this.retain(parseFloat(this.$ethers.utils.formatUnits(this.peekSpot_.toString(), 18)), 4);

            return peekSpot_;
        },
        async apporve() {
            try {
                let tx = await this.USDCContract.approve(this.buyNFTLogicContract.address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
                await tx.wait() //等待交易被矿工打包刀区块并获得确认, 会返回一个TransactionReceipt 对象,包含有关交易的详细信息，比如交易的状态、区块号、交易日志等。
                await this.updateInfo();
                alert('Successful');
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }

        },
        async create() {
            try {
                // let gasLimit = await this.buyNFTLogicContract.estimateGas.buyNft(this.amt);
                // gasLimit = gasLimit * 2
                let tx = await this.buyNFTLogicContract.buyNft(this.amt);
                await tx.wait();
                await this.updateInfo();
                alert('Successful');
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }
        },



        async updateInfo() {
            this.getUSDCBalanceOf().then((d) => {
                this.usdcBalance = d;
            })
            this.getPirce().then((d) => {
                this.pirce = d;
            })
            this.getRoi().then((d) => {
                this.roi = d;
            })
            this.getPeekSpot().then((d) => {
                this.peekSpot = d;
            })
            this.checkCreateNftApprove();
        },
    },
    async mounted() {
        this.fishContract = await this.createFishContract();
        this.USDCContract = await this.createUSDCContract();
        this.buyNFTLogicContract = await this.createBuyNFTLogicContract();

        // this.timer = setInterval(async () => {
        await this.updateInfo();
        // }, 6000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    data() {
        return {
            usdcBalance: 0,
            fishBalance: 0,
            pirce: 0,
            amt: 0,
            roi: 0,
            profit: 0,
            peekSpot: 0,
            apporveLoader: false,
            createLoader: false,
            createNftApprove: false,
        };
    },
};

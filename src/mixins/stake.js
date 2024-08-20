import stakeInfo from "@/utils/contracts/stake.js";
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
        retain(num, d) {
            return (parseInt(num * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
        },
        // change(val) {
        //     this.ATokenInfo.input = Number(val);
        //     if (+val > +this.ATokenInfo.balance) {
        //         this.amountError = `The value cannot be greater than ${this.ATokenInfo.balance}`;
        //         return false;
        //     } else {
        //         this.amountError = ``;
        //     }
        //     if (this.stakeState) {
        //         this.$set(this.BTokenInfo, 'input', Number(this.sFish_FishPrice) * Number(val));
        //     } else {
        //         this.$set(this.BTokenInfo, 'input', Number(val) / Number(this.sFish_FishPrice));
        //     }
        // },
        _stakeInfo() {
            const _stakeInfo = stakeInfo.find(
                (contract) => contract.contractChain === this.chainId
            );

            return _stakeInfo
        },
        async createFishContract() {
            const fishContract = new this.$ethers.Contract(
                this._stakeInfo().FISH.address,
                JSON.stringify(this._stakeInfo().FISH.abi),
                this.signer
            );
            return fishContract;
        },
        async createSFishContract() {

            const sfishContract = new this.$ethers.Contract(
                this._stakeInfo().sFISH.address,
                JSON.stringify(this._stakeInfo().sFISH.abi),
                this.signer
            );
            return sfishContract;
        },
        async createFISH_USDC_LPContract() {
            const FISH_USDC_LPContract = new this.$ethers.Contract(
                this._stakeInfo().FISH_USDC_LP.address,
                JSON.stringify(this._stakeInfo().FISH_USDC_LP.abi),
                this.signer
            );
            return FISH_USDC_LPContract;
        },
        async createUSDCContract() {
            const USDCContract = new this.$ethers.Contract(
                this._stakeInfo().USDC.address,
                JSON.stringify(this._stakeInfo().USDC.abi),
                this.signer
            );
            return USDCContract;
        },

        async getFISHBalanceOf() {
            this.FISHBalanceOf_ = await this.fishContract.balanceOf(this.account);
            const FISHBalanceOf = this.retain(parseFloat(this.$ethers.utils.formatUnits(this.FISHBalanceOf_.toString(), 18)), 4);
            return FISHBalanceOf;
        },

        async getSFISHBalanceOf() {
            this.SFISHBalanceOf_ = await this.sFishContract.balanceOf(this.account);
            const SFISHBalanceOf = this.retain(parseFloat(this.$ethers.utils.formatUnits(this.SFISHBalanceOf_.toString(), 18)), 4);
            return SFISHBalanceOf;
        },

        // sFish_usdc 
        // sFish_Fish => (一個fish 價值sFish )  sFish/Fish
        // fish_usdc  => LPtoken =>  usdc /fish (一個fish 價值多少U)

        async getSFish_FishPrice() {
            const totalSupply = await this.sFishContract.totalSupply();
            const totalTokens = await this.fishContract.balanceOf(this.sFishContract.address);
            return parseFloat(totalSupply) / parseFloat(totalTokens);
        },

        async getFish_SFishPrice() {
            if (parseFloat(this.sFish_FishPrice) == 0) {
                return 0
            }
            return Number(1 / this.sFish_FishPrice)
        },

        async getUSD_FishPrice() {
            const fishAmt = await this.fishContract.balanceOf(this.FISH_USDC_LPContract.address);
            const USDCAmt = await this.USDCContract.balanceOf(this.FISH_USDC_LPContract.address);
            return parseFloat(USDCAmt) / parseFloat(fishAmt);
        },

        async getSFish_USDPrice() {
            var SFish_Fish = await this.getSFish_FishPrice();
            var USD_Fish = await this.getUSD_FishPrice();
            if (SFish_Fish == 0) {
                return 0
            }
            return (USD_Fish / SFish_Fish).toFixed(6);
        },

        async checkApporve() {

            var Aapporve1 = await this.fishContract.allowance(this.account, this.sFishContract.address);
            if (Aapporve1 > 100000000000000000000000000) {
                this.fishIsApporve = true;
            }

            var Aapporve2 = await this.sFishContract.allowance(this.account, this.sFishContract.address);
            if (Aapporve2 > 100000000000000000000000000) {
                this.sFishIsApporve = true;
            }

        },

        async apporve() {
            try {
                if (this.stakeState) {
                    var tx = await this.fishContract.approve(this.sFishContract.address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
                } else {
                    tx = await this.sFishContract.approve(this.sFishContract.address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
                }
                await tx.wait()
                await this.updateInfo();
                alert('成功')
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }
        },

        async stake() {
            try {
                var inputNumber_ = this.$ethers.utils.parseUnits(
                    this.fishInput,
                    18
                );

                let tx = await this.sFishContract.mint(inputNumber_);
                await tx.wait();
                await this.updateInfo();
                alert('成功')
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }
        },



        async unStake() {
            try {
                var inputNumber_ = this.$ethers.utils.parseUnits(
                    this.sFishInput,
                    18
                );
                let tx = await this.sFishContract.burn(this.account, inputNumber_);
                await tx.wait();
                await this.updateInfo();
                alert('成功')
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }
        },
        reverse() {
            this.stakeState = !this.stakeState;
        },
        async updateInfo() {
            this.getFISHBalanceOf().then((d) => {
                this.FISHBalanceOf = d;
            });
            this.getSFISHBalanceOf().then((d) => {
                this.SFISHBalanceOf = d;
            });
            this.getSFish_FishPrice().then((d) => {
                this.sFish_FishPrice = parseFloat(d);
                this.getFish_SFishPrice().then((d) => {
                    this.Fish_SFishPrice = parseFloat(d).toFixed(10);
                });
            });

            this.getSFish_USDPrice().then((d) => {
                this.SFish_USDPrice = parseFloat(d);
            });

            this.getUSD_FishPrice().then((d) => {
                this.USD_FishPrice = parseFloat(d);
            });

            this.checkApporve();
        },
    },
    async mounted() {
        this.fishContract = await this.createFishContract();
        this.sFishContract = await this.createSFishContract();
        this.FISH_USDC_LPContract = await this.createFISH_USDC_LPContract();
        this.USDCContract = await this.createUSDCContract();

        await this.updateInfo();
    },
    data() {
        return {
            FISHBalanceOf: 0,
            SFISHBalanceOf: 0,
            stakeState: true,

            fishInput: 0,
            sFishInput: 0,

            fishIsApporve: false,
            sFishIsApporve: false,


            sFish_FishPrice: 0,
            Fish_SFishPrice: 0,
            SFish_USDPrice: 0,
            USD_FishPrice: 0,
            amountError: ''
        };
    },
};

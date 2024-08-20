import bondsInfo from "@/utils/contracts/bonds.js";
import { prettifySeconds } from '../utils/prettifySeconds.js'

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

        _bondsInfo() {
            const _bondsInfo = bondsInfo.find(
                (contract) => contract.contractChain === this.chainId
            );

            return _bondsInfo
        },
        async createfishNftContract() {
            const fishNftontract = new this.$ethers.Contract(
                this._bondsInfo().fishNft.address,
                JSON.stringify(this._bondsInfo().fishNft.abi),
                this.signer
            );
            return fishNftontract;
        },

        //给vue提供的函数
        prettifySeconds(val) {
            return prettifySeconds(val);
        },

        async getNftBalance() {
            this.nftBalanceOf_ = await this.fishNftContract.balanceOf(this.account);
            return this.nftBalanceOf_;
        },
        async getUserInfo() {
            this.userInfo_ = await this.fishNftContract.userInfo(this.account);
            return this.userInfo_;
        },
        async getPending() {
            this.pending_ = await this.fishNftContract.pending();
            return this.pending_;
        },
        async updateInfo() {

            this.getUserInfo().then((d) => {
                this.claimble = this.retain(parseFloat(this.$ethers.utils.formatUnits(d.claimble.toString(), 18)), 4);
                this.lastClaimTimestamp = d.lastClaimTimestamp;
                this.releaseSecond = d.releaseSecond;
            });
            this.getPending().then((d) => {
                const pending = this.retain(parseFloat(this.$ethers.utils.formatUnits(d.toString(), 18)), 4);
                this.pending = pending
            })
        },
        async updateYourNFTs() {
            this.youNftInfo = [];
            this.youNftId = [];
            this.getNftBalance().then((d) => {
                this.nftBalance = d;
                for (let i = 0; i < this.nftBalance; i++) {
                    this.fishNftContract.tokenOfOwnerByIndex(this.account, i).then((f) => {
                        this.fishNftContract.nftInfo(f).then((g) => {
                            this.youNftId.push(f);
                            this.youNftInfo.push(g);
                        })
                    })
                }
            })
        },

        async burn(id) {
            try {
                let gasLimit = await this.fishNftContract.estimateGas.burn(id);
                gasLimit = gasLimit * 2
                let tx = await this.fishNftContract.burn(id, { gasLimit });
                await tx.wait();
                await this.updateInfo();
                await this.updateYourNFTs();
                alert('Successful');
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }
        },
        async claim() {
            try {

                let tx = await this.fishNftContract.claim();
                await tx.wait();
                await this.updateInfo();
                alert('Successful');
            } catch (e) {
                e.data ? alert(e.data.message) : alert(e.message);
            }
        },


    },
    async mounted() {

        this.timer = setInterval(async () => {
            this.now = Math.round(new Date() / 1000);
            this.releaseTimestamp = Number(this.lastClaimTimestamp) + Number(this.releaseSecond) - Number(this.now);
        }, 1000);
        this.fishNftContract = await this.createfishNftContract();
        this.timer1 = setInterval(async () => {
            await this.updateInfo();
        }, 5000);
        await this.updateYourNFTs();

    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.timer1);
    },
    data() {
        return {
            now: null,
            nftBalance: 0,
            youNftInfo: [],
            youNftId: [],
            claimble: 0,
            pending: 0,
            releaseTimestamp: 0,

            lastClaimTimestamp: 0,
            releaseSecond: 0,

            burnLoader: false,
            claimLoader: false,
        };
    },
};

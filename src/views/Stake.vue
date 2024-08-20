<template>
  <div class="stake-view">
    <div class="container mini">
      <h1>Stake</h1>
      <div>
        <div>
          <div>
            <p>sFISHBONE 价格 ｜ {{ SFish_USDPrice }}</p>
            <p>价值 ｜ 1个 sFISHBONE = {{ Fish_SFishPrice }} 个FISHBONE</p>
            <p>你的 FISHBONE 余额 ｜ {{ FISHBalanceOf }} （FISHBONE）</p>
            <p>你已质押 sFISHBONE ｜ {{ SFISHBalanceOf }} （sFISHBONE）</p>
          </div>

          <div>
            <div>
              <div>
                <div class="row">
                  <div class="col-6">
                    <div
                      type="button"
                      @click="reverse()"
                      :class="!stakeState ? '' : 'action'"
                    >
                      Deposit
                    </div>
                  </div>
                  <div class="col-6">
                    <div
                      type="button"
                      @click="reverse()"
                      :class="stakeState ? '' : 'action'"
                    >
                      Withdraw
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="col text-start stake-left-table-thead">
                    {{ stakeState ? 'FISHBONE Balance' : 'sFISHBONE Balance' }}
                  </div>
                  <div class="col text-end">
                    {{ stakeState ? FISHBalanceOf : SFISHBalanceOf }}
                  </div>
                </div>
                <div class="input-group mb-3" v-if="stakeState">
                  <span class="input-group-text" id="inputGroup-sizing-default"
                    >FISHBONE</span
                  >
                  <input
                    type="number"
                    class="form-control"
                    v-model="fishInput"
                  />
                </div>
                <div class="input-group mb-3" v-else>
                  <span class="input-group-text" id="inputGroup-sizing-default"
                    >sFISHBONE</span
                  >
                  <input
                    type="number"
                    class="form-control"
                    v-model="sFishInput"
                  />
                </div>
              </div>

              <button
                type="button"
                class="btn btn-warning stake-btn"
                @click="apporve()"
                v-if="
                  (stakeState && !fishIsApporve) ||
                  (!stakeState && !sFishIsApporve)
                "
              >
                APPROVE
              </button>
              <button
                type="button"
                class="btn btn-warning stake-btn"
                @click="stake()"
                v-if="fishIsApporve && stakeState"
              >
                Deposit
              </button>
              <button
                type="button"
                class="btn btn-warning stake-btn"
                @click="unStake()"
                v-if="sFishIsApporve && !stakeState"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TokenIcon = () => import('@/components/UiComponents/TokenIcon');
import stakeMixin from '@/mixins/stake.js';
export default {
  mixins: [stakeMixin],
  components: {
    TokenIcon,
  },
  data() {
    return {
      connectLoader: 0,
      cefreshLoader: false,
    };
  },
  computed: {
    pools() {
      return this.$store.getters.getPools;
    },
  },
  created() {
    const isConnected = this.$store.getters.getWalletIsConnected;

    if (!isConnected) {
      this.$router.push({ name: 'home' });
      alert('请先连接钱包');
      return false;
    }
  },
};
</script>

<style lang="scss" scoped>
.action {
  background-color: #ffc107;
  color: #000;
}
</style>

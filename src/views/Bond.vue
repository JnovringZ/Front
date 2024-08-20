<template>
  <div class="bond-view">
    <div class="container main">
      <h1>NFT Bonds</h1>

      <div class="plate-1">
        <div class="card youbond-card">
          <div class="card-body">
            <h5 class="card-title text-start">Your NFTs Bonds</h5>
            <div class="row">
              <div class="col-md-2 text-start item-table">
                <p class="p14">&nbsp;</p>
                <p class="p11 item-table-val">FISHBONE</p>
              </div>
              <div class="col-md-2 text-start">
                <p>Claimble</p>
                <p>{{ claimble }}</p>
              </div>
              <div class="col-md-2 text-start">
                <p class=" ">Pending</p>
                <p>{{ pending }}</p>
              </div>
              <div class="col-md-4 text-start item-table">
                <p class=" ">Fully Vested</p>
                <p class=" ">
                  {{ prettifySeconds(this.releaseTimestamp).day }}days
                  {{ prettifySeconds(this.releaseTimestamp).hour }}hours
                  {{ prettifySeconds(this.releaseTimestamp).minutes }}min
                </p>
              </div>
              <div class="col-md-2 text-start">
                <p class="p14">&nbsp;</p>
                <button
                  type="button"
                  class="btn btn-warning claim-btn"
                  @click="claim()"
                  :disabled="claimLoader || pending == '...'"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="youbond-card">
          <h5 class="card-title text-start">Your NFTs ({{ nftBalance }})</h5>

          <div class="container">
            <div class="row">
              <h1 class="empty" v-if="youNftInfo.length == 0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"
                  />
                </svg>
              </h1>
              <div class="col" v-for="(item, index) in youNftInfo" :key="index">
                <div class="card youNft-card" style="width: 18rem">
                  <span class="badge bg-warning text-dark" v-if="item.lv == 0"
                    >#{{ youNftId[index] }} {{ getLv(item.lv) }}</span
                  >
                  <span class="badge bg-primary" v-if="item.lv == 1"
                    >#{{ youNftId[index] }} {{ getLv(item.lv) }}</span
                  >
                  <span class="badge bg-danger" v-if="item.lv == 2"
                    >#{{ youNftId[index] }} {{ getLv(item.lv) }}</span
                  >
                  <svg
                    class="nftImg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="300"
                    height="300"
                    style="background-color: #dcdcdc"
                    :style="getBGC(item.lv)"
                  >
                    <text
                      x="50%"
                      y="50%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      font-size="60px"
                      :fill="getColor(item.lv)"
                    >
                      {{ item.fishStr }}
                    </text>
                  </svg>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6 text-start p11-g">Claimble</div>
                      <div class="col-md-6 text-end p11">
                        {{ (item.remainingReward / 10 ** 18).toFixed(4) }}FISH
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 text-start p11-g">Release time</div>
                      <div class="col-md-6 text-end p11">
                        {{ getFully(item.lv) }} Days
                      </div>
                    </div>

                    <p class="text-start"></p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-secondary burn-btn"
                    @click="burn(youNftId[index])"
                  >
                    BURN & BOND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bonds from '@/mixins/bonds.js';
export default {
  mixins: [bonds],
  data() {
    return {};
  },
  name: 'Bond',
  methods: {
    getFully(lv) {
      if (lv == 0) {
        return 14;
      } else if (lv == 1) {
        return 10;
      } else {
        return 5;
      }
    },
    getLv(lv) {
      if (lv == 0) {
        return 'FRESHWATER FISH (CLASS C)';
      } else if (lv == 1) {
        return 'SHALLOW SEA FISH (CLASS B)';
      } else {
        return 'DEEP SEA FISH (CLASS A)';
      }
    },
    getBGC(lv) {
      if (lv == 0) {
        return { 'background-color': 'rgb(220, 220, 220)' };
      } else if (lv == 1) {
        return { 'background-color': 'rgb(169, 169, 169)' };
      } else {
        return { 'background-color': 'rgb(0, 0, 0)' };
      }
    },
    getColor(lv) {
      if (lv == 0) {
        return '#000';
      } else if (lv == 1) {
        return '#000';
      } else {
        return '#fff';
      }
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.card {
  background-color: $clrBg1;
}
.claim-btn {
  float: left;
  display: flex;
  min-width: 140px;
  min-height: 38px;
}
.burn-btn {
  display: flex;
  margin: 0 auto 10px;
  width: 100%;
  min-height: 38px;
}
.nftImg {
  letter-spacing: -13px;
}

.youbond-card {
  margin: 20px auto;
  border-radius: 20px;
  // max-width: 1000px;
  .item {
    padding-left: 40px;
  }
}

.youNft-card {
  margin: 20px auto;
  border-radius: 15px;
  overflow: hidden;
  border: none;
  &:hover {
    box-shadow: 0px 10px 20px 5px #d0dbeb;
  }
}

.plate-1 {
  svg {
    width: 100%;
  }
}
.grey-title {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  /* identical to box height */

  letter-spacing: 0.205em;

  color: #6d8097;
}
.bond-view {
  padding-top: 50px;
  padding-bottom: 200px;
  flex: 1;

  .plate-1,
  .plate-2,
  .plate-3,
  .plate-4 {
    // padding: 100px 0;
    .title {
      font-size: 50px;
      font-weight: bolder;
    }

    .subtitle {
    }

    .content {
      margin: 60px;
    }

    .nftIntroduce {
      h3 {
        margin: 20px 0;
      }
    }
  }

  .title-wrap {
    margin-left: 20px;
  }
  .title {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 20px;
    letter-spacing: -0.02em;
  }
  .subtitle {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 0px;
    /* identical to box height */

    letter-spacing: -0.02em;
  }
}
.empty {
  margin-top: 100px;
}
// .bond-view .content-wrap .main-col .title-wrap {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 30px;
// }
</style>

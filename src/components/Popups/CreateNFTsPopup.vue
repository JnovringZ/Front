<template>
  <!-- Modal data-bs-dismiss="modal"-->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title popup-title" id="staticBackdropLabel">
            创建 NFT
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 left">
              <svg
                class="nftImg"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
              >
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="35px"
                  fill="#000"
                >
                  {{ '<°)????≤' }}
                </text>
              </svg>
            </div>
            <div class="col-md-7 right">
              <div class="nftAmt-btn-wrap">
                <div class="input-group mb-3 amtbtn">
                  <button
                    class="btn btn-warning"
                    type="button"
                    id="button-addon1"
                    @click="cutAmt()"
                    :disabled="!createNftApprove"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    class="form-control text-center"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    v-model="amt"
                    :disabled="!createNftApprove"
                    onkeyup="this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                  />
                  <button
                    class="btn btn-warning"
                    type="button"
                    id="button-addon1"
                    @click="addAmt()"
                    :disabled="!createNftApprove"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="col-4 text-start p11-g lh10">balance:</div>
                  <div class="col-8 text-end p11 lh10">
                    {{ this.usdcBalance }} BUSD
                  </div>
                </div>

                <div class="row">
                  <div class="col-4 text-start p11-g lh10">Pirce:</div>
                  <div class="col-8 text-end p11 lh10">
                    {{ this.pirce }} BUSD
                  </div>
                </div>

                <div class="row">
                  <div class="col-4 text-start p11-g lh10">ROI :</div>
                  <div class="col-8 text-end p11 lh10">{{ this.roi }}%</div>
                </div>

                <div class="row">
                  <div class="col-5 text-start p11-g lh10">Bond profit :</div>
                  <div class="col-7 text-end p11 lh10">
                    {{
                      this.peekSpot * this.pirce * amt * (this.roi / 100 + 1)
                    }}FISH ({{ this.pirce * amt * (this.roi / 100 + 1) }}BUSD)
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary goCreate"
                v-if="createNftApprove"
                :disabled="createLoader"
                @click="create()"
              >
                ({{ pirce * amt }} BUSD) Create
              </button>
              <button
                type="button"
                class="btn btn-primary goCreate"
                v-else
                @click="apporve()"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
const TokenIcon = () => import('@/components/UiComponents/TokenIcon');
import createNft from '@/mixins/createNft.js'; //创建逻辑文件
export default {
  mixins: [createNft],

  components: {
    TokenIcon,
  },

  methods: {
    shown() {
      var myModal = document.getElementById('staticBackdrop');
      var myInput = document.getElementById('staticBackdrop');

      myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//
.nftImg {
  width: 100%;
  height: auto;
  margin: 0 auto;
  border: 1px solid #c6c6c6;
  border-radius: 20px;
  background-color: rgb(220, 220, 220);
  text {
    font-family: 'Work Sans';
  }
}
.modal-content {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 20px;
}
.modal-header {
  border-bottom: none;
}
.goCreate {
  margin-top: 20px;
  width: 100%;
  display: flex;

  min-height: 37px;
  border: none;
  background-color: $clrYellow;
  color: #000;
}
.amtBtn {
  width: (100%)/6;
  margin: 0 5px;
  background-color: $clrYellow;
  color: #000;
  border: 2px solid #000;
}
.nftAmt-btn-wrap {
}

.balance {
  margin: 10px 27px;
}
.info {
}
.left {
  padding: 10px;
}
.right {
  padding: 20px;
}
.amtbtn {
  height: 50px;
}

.lh10 {
  line-height: 35px;
}
@media screen and(max-width: 980px) {
  .lh10 {
    line-height: 15px;
  }
}
</style>

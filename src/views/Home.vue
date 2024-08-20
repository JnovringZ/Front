<!--<template>-->
<!--  <div class="home-view">-->
<!--    <div class="main">-->
<!--      <div class="plate-1">-->
<!--        <div class="banner">-->
<!--          <img src="">-->
<!--&lt;!&ndash;          <svg&ndash;&gt;-->
<!--&lt;!&ndash;            class="bigBanner"&ndash;&gt;-->
<!--&lt;!&ndash;            xmlns="http://www.w3.org/2000/svg"&ndash;&gt;-->
<!--&lt;!&ndash;            width="500"&ndash;&gt;-->
<!--&lt;!&ndash;            height="300"&ndash;&gt;-->
<!--&lt;!&ndash;            style="font-style: no"&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;            <text&ndash;&gt;-->
<!--&lt;!&ndash;              x="50%"&ndash;&gt;-->
<!--&lt;!&ndash;              y="50%"&ndash;&gt;-->
<!--&lt;!&ndash;              dominant-baseline="middle"&ndash;&gt;-->
<!--&lt;!&ndash;              text-anchor="middle"&ndash;&gt;-->
<!--&lt;!&ndash;              font-size="100px"&ndash;&gt;-->
<!--&lt;!&ndash;              fill="#fff"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              🐟&ndash;&gt;-->
<!--&lt;!&ndash;            </text>&ndash;&gt;-->
<!--&lt;!&ndash;          </svg>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="text-center">-->
<!--          <button-->
<!--            type="button"-->
<!--            class="btn createNftBtn"-->
<!--            data-bs-toggle="modal"-->
<!--            data-bs-target="#staticBackdrop"-->
<!--          >-->
<!--            Create NFTs-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="content">-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->

<!--    <CreateNFTsPopup />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--const CreateNFTsPopup = () => import('@/components/Popups/CreateNFTsPopup');-->
<!--import home from '@/mixins/home.js';-->
<!--export default {-->
<!--  mixins: [home],-->
<!--  data() {-->
<!--    return {};-->
<!--  },-->
<!--  name: 'Home',-->
<!--  methods: {-->
<!--    goOtherPage(url) {-->
<!--      window.open(url);-->
<!--    },-->
<!--  },-->
<!--  components: {-->
<!--    CreateNFTsPopup,-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.createNftBtn {-->
<!--  max-width: 500px;-->
<!--  height: 60px;-->
<!--  width: 90%;-->
<!--  margin: 0 auto;-->
<!--  color: #000 !important;-->
<!--  border: 1px solid #000;-->
<!--  font-size: 26px;-->
<!--  // font-weight: bolder;-->
<!--  &:disabled {-->
<!--    opacity: 0.4;-->
<!--  }-->

<!--  &:hover {-->
<!--    background-color: $clrYellow;-->
<!--    border: 1px solid $clrYellow;-->
<!--    color: #000 !important;-->
<!--  }-->
<!--}-->
<!--</style>-->



<template>
  <div class="home-view">
    <div class="main">
      <div class="plate-1">
        <div class="banner">
<!--          <img src="" alt="Banner Image">-->
        </div>
        <div class="text-center">
          <button
              type="button"
              class="btn createNftBtn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
          >
            Create NFTs
          </button>
        </div>
      </div>
    </div>

    <CreateNFTsPopup />
  </div>
</template>

<script>
const CreateNFTsPopup = () => import('@/components/Popups/CreateNFTsPopup');
import home from '@/mixins/home.js';
export default {
  mixins: [home],
  data() {
    return {};
  },
  name: 'Home',
  methods: {
    goOtherPage(url) {
      window.open(url);
    },
  },
  components: {
    CreateNFTsPopup,
  },
};
</script>

<style scoped lang="scss">
.home-view {
  //background-image: url('https://ts1.cn.mm.bing.net/th/id/R-C.e88369ea8e2cb8b104ea6e8dfc902c15?rik=uTZzR4F8WODnQw&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2019%2f01-21%2f60867%2fwater_60867_698_698_.png&ehk=J1V%2fN7GKLeHqsixEc%2bIWp1Gc%2bWyrbz7ryl3DLBxjJ90%3d&risl=&pid=ImgRaw&r=0');
  background-image: url('../assets/images/Fish.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.createNftBtn {
  max-width: 500px;
  height: 60px;
  width: 100%;
  margin: 20px auto;
  color: #000 !important;
  border: 2px solid #000;
  font-size: 26px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.4;
  }

  &:hover {
    background-color: #ffd700;
    border-color: #ffd700;
    color: #000 !important;
    transform: scale(1.05);
  }
}

.banner img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.text-center {
  text-align: center;
  height: 500px;
}



.content {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
}
</style>


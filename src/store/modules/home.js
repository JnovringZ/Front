export default {
  state: {
    usdcBalance: 0,
    pirce: 0,
    roi: 0,
    peekSpot: 0,
    createNftApprove: null,
  },
  mutations: {
    setUSDCBalance(state, val) {
      state.usdcBalance = val
    },
    setPirce(state, val) {
      state.pirce = val
    },
    setRoi(state, val) {
      state.roi = val
    },
    setPeekSpot(state, val) {
      state.peekSpot = val
    },
    setCreateNftApprove(state, val) {
      state.createNftApprove = val
    },

  },
  getters: {
    getUSDCBalance: (state) => state.usdcBalance,
    getPirce: (state) => state.pirce,
    getRoi: (state) => state.roi,
    getPeekSpot: (state) => state.peekSpot,
    getCreateNftApprove: (state) => state.createNftApprove,
  },
};

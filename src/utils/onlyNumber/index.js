import onlyNumber from './onlyNumber'
const install = Vue => {
  Vue.directive('only-number', onlyNumber)
}


if (window.Vue) {
  window['onlyNumber'] = onlyNumber
  Vue.use(install); // eslint-disable-line
}

onlyNumber.install = install
export default onlyNumber

export default {
  inserted (el, vDir, vNode) {
    let content
    const setVal = val => {
      if (vNode.componentInstance) {
        vNode.componentInstance.$emit('input', val)
      } else {
        el.value = val
        el.dispatchEvent(new Event('input'))
      }
    }
    el.addEventListener('keypress', event => {
      const e = event || window.event
      const inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
      const re = /\d|\.|-/
      content = e.target.value
      function preventInput () {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
      if (!re.test(inputKey) && !e.ctrlKey) {
        preventInput()
      } else if (content.indexOf('.') > 0 && inputKey === '.') {
        preventInput()
      }
    })
    el.addEventListener('keyup', event => {
      const e = event || window.event
      content = parseFloat(e.target.value)
      if (!content) {
        content = 0.00
      }
      let argMax = ''
      let argMin = ''
      if (vDir.value) {
        argMax = parseFloat(vDir.value.max)
        argMin = parseFloat(vDir.value.min)
      }
      if (argMax !== undefined && content > argMax) {
        setVal(argMax)
        content = argMax
      }
      if (argMin !== undefined && content < argMin) {
        setVal(argMin)
        content = argMin
      }
    })
    el.addEventListener('focusout', event => { 
      const e = event || window.event
      content = parseFloat(e.target.value)
      if (!content) {
        content = 0.00
      }
      let argPrecision = 0
      if (vDir.value.precision) {
        argPrecision = parseFloat(vDir.value.precision)
      }
      e.target.value = content.toFixed(argPrecision)
      setVal(e.target.value)
     
    })
  }
}

export default {
  clipboard: {
    bind (el, binding, vnode) {
      /**
       * @author Cyan
       * @param {ElementNode} copyDom 需要复制的目标节点
       * @param {RangeObject} range 浏览器内置Range对象
       * @param {VueObject} context 自身组件实例
       * @description 获取需要复制的目标节点 => 选中目标节点 => 取消所有选取状态 => 选中目标 => 复制内容进剪切板
       */
      function clickHandler () {
        const copyDom = document.querySelector(`.${binding.arg}`)
        const range = document.createRange()
        const { context } = vnode
        range.selectNode(copyDom)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        if (document.execCommand('copy')) {
          document.execCommand('copy')
          // ui toast 组件提醒
          context.$toast({
            message: '复制成功~',
            duration: 1800
          })
        } else {
          // ui toast 组件提醒
          context.$toast({
            message: '您的浏览器可能不支持该复制功能，请尝试手动复制~',
            duration: 1800
          })
        }
      }
      el.__vueClickOutside__ = clickHandler
      el.addEventListener('click', clickHandler)
    },
    unbind (el) {
      el.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  }
}

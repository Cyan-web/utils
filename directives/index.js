export default {
  clipboard: {
    bind (el, binding, vnode) {
      /**
       * @author Cyan
       * @description 获取需要复制的目标节点 => 选中目标节点 => 取消所有选取状态 => 选中目标 => 复制内容进剪切板
       * @example v-clipboard:.copy-target 则复制 class='copy-target' 内容
       */
      function clickHandler () {
        /**
          * @var {ElementNode} copyDom 需要复制的目标节点
          * @var {RangeObject} range 浏览器内置Range对象
          * @var {VueObject} context 自身组件实例
         */
        const copyDom = document.querySelector(binding.arg)
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
  },
  drag: {
    inserted: (el, a, vm) => {
      let x = 0
      let y = 0
      let px = 0
      let py = 0
      let nx = 0
      let ny = 0
      let onDrag = false
      el.ontouchstart = function (e) {
        x = e.touches[0].clientX
        y = e.touches[0].clientY
        px = el.offsetLeft
        py = el.offsetTop
        let cH = document.documentElement.clientHeight - 88
        let cW = document.body.clientWidth - 44
        onDrag = true
        el.style.transition = 'none'
        el.ontouchmove = function (e) {
          if (onDrag) {
            nx = e.touches[0].clientX + px - x
            ny = e.touches[0].clientY + py - y
            el.style.left = (nx < 0 ? '.15rem' : nx > cW ? `calc(${cW}px - .15rem)` : `${nx}px`)
            el.style.top = (ny < 100 ? '100px' : ny > cH ? `${cH}px` : `${ny}px`)
          }
        }
        el.ontouchend = function (e) {
          el.style.transition = 'all 0.4s ease'
          let half = document.body.clientWidth / 2
          if (el.style.left || el.style.right) {
            if (nx < (half - 22)) {
              el.style.left = '.15rem'
              vm.context.childClass.left = 1
            } else {
              el.style.left = `calc(${cW}px - .15rem)`
              vm.context.childClass.left = 0
            }
          }
          if (onDrag) {
            onDrag = false
          }
        }
      }
    }
  }
}

const Edge = 2

const START = 'START',
      MOVE = 'MOVE',
      END = 'END'

class Dragtive {
  constructor(element, binding) {
    console.log(binding, 'binding')
    const haloX = localStorage.getItem('HALO_POSITION_X') || 0,
          haloY = localStorage.getItem('HALO_POSITION_Y') || 0

    element.style.position = 'fixed'
    element.style.top = 0
    element.style.left = 0

    element.style.transform = `
        translate(${haloX}px,${haloY}px) 
      `

    element.ontouchstart = ev => {
      const {width, height} = element.getBoundingClientRect()
      this.elWidth = width
      this.elHeight = height
      this.widthCenter = width / 2
      this.heightCenter = height / 2
      element.style.transition = 'none'

      binding.value && binding.value({state: START})
    }

    element.ontouchmove = ev => {
      event.preventDefault()


      const widthCenter = this.widthCenter,
            heightCenter = this.heightCenter

      let {pageX, pageY} = ev.targetTouches[0]

      pageX = (pageX + widthCenter > innerWidth && (innerWidth - widthCenter - Edge)) || (pageX < widthCenter && (widthCenter + Edge)) || pageX
      pageY = (pageY + heightCenter > innerHeight && (innerHeight - heightCenter - Edge)) || (pageY< heightCenter && (heightCenter + Edge)) || pageY

      element.style.transform = `
        translate(${pageX.toFixed() - widthCenter}px,${pageY.toFixed() - heightCenter}px) 
      `
      binding.value && binding.value({state: MOVE})
    }

    element.ontouchend = ev => {
      const widthCenter = this.widthCenter,
            heightCenter = this.heightCenter

      let {innerHeight, innerWidth} = window,
          {pageX, pageY} = ev.changedTouches[0]

      pageX = (pageX + widthCenter > innerWidth && (innerWidth - widthCenter - Edge)) || (pageX < widthCenter && (widthCenter + Edge)) || pageX
      pageY = (pageY + heightCenter > innerHeight && (innerHeight - heightCenter - Edge)) || (pageY< heightCenter && (heightCenter + Edge)) || pageY

      pageX = pageX.toFixed()
      pageY = pageY.toFixed()


      let haloX = pageX > innerWidth/Edge ? innerWidth - this.elWidth - Edge : Edge,
          haloY = (pageY < 50 && (haloX = pageX - widthCenter) && Edge ) ||
        (pageY > innerHeight - 50 && (haloX = pageX - widthCenter) && innerHeight - this.elHeight - Edge ) || pageY - heightCenter;



      element.style.transition = 'transform 0.4s'
      element.style.transform = `
        translate(${haloX}px,${haloY}px) 
      `

      // cache
      localStorage.setItem('HALO_POSITION_X', haloX)
      localStorage.setItem('HALO_POSITION_Y', haloY)

      binding.value && binding.value({state: END})
    }

  }
}

export default {
  inserted(el, binding) {
    new Dragtive(el, binding)
  },
}
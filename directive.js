const Edge = 2

class Dragtive {
  constructor(element) {

    element.ontouchstart = ev => {
      const {width, height} = element.getBoundingClientRect()
      this.elWidth = width
      this.elHeight = height
      this.widthCenter = width / 2
      this.heightCenter = height / 2
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


      element.style.transform = `
        translate(${haloX}px,${haloY}px) 
      `
    }

  }
}


export default {
  inserted(el, binding) {
    new Dragtive(el)
  },
}
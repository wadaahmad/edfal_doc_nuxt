<template>
  <div>
    <div
      class="bg-main text-white p-3"
      style="height:75px; width: 100%; text-align: center"
    >
      <b-button variant="light" @click="exit" class="float-left mr-2">
        <i class="fa fa-reply"></i>
      </b-button>
      <h4 class="float-left">Tanda tangan</h4>
      <b-button variant="info" class="float-right" @click="storeImage">
        Simpan
      </b-button>
    </div>
    <canvas
      id="myCanvas"
      width="100%"
      height="100%"
      @mousedown="beginDrawing"
      @mousemove="keepDrawing"
      @mouseup="stopDrawing"
      @touchstart="beginDrawing"
      @touchmove="keepDrawing"
      @touchend="stopDrawing"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    let c = document.getElementById('myCanvas')
    this.canvas = c.getContext('2d')
    let ctx = c
    //console.log(ctx)
    this.image = ctx
    c.width = window.innerWidth
    c.height = window.innerHeight
  },
  data: function () {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
      image: null,
    }
  },
  computed: {},

  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath()
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 1
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.closePath()
    },
    beginDrawing(e) {
      //console.log('begin')
      if (typeof e.touches != 'undefined') {
        this.x = e.touches[0].clientX
        this.y = e.touches[0].clientY
      } else {
        this.x = e.offsetX
        this.y = e.offsetY
      }
      this.isDrawing = true
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        //console.log('keep2')
        if (typeof e.touches != 'undefined') {
          this.drawLine(
            this.x,
            this.y,
            e.touches[0].clientX,
            e.touches[0].clientY
          )
          this.x = e.touches[0].clientX
          this.y = e.touches[0].clientY
        } else {
          this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
          this.x = e.offsetX
          this.y = e.offsetY
        }
      }
    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
        this.x = 0
        this.y = 0
        this.isDrawing = false
      }
    },

    async storeImage() {
      let image = await this.uploadBase64Image(
        this.trim(this.image).toDataURL()
      )
      this.$emit('store',image)
    },
    exit(){
      this.$emit('exit',true)
    },
    trim(c) {
      var ctx = c.getContext('2d'),
        copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
          top: null,
          left: null,
          right: null,
          bottom: null,
        },
        x,
        y

      for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
          x = (i / 4) % c.width
          y = ~~(i / 4 / c.width)

          if (bound.top === null) {
            bound.top = y
          }

          if (bound.left === null) {
            bound.left = x
          } else if (x < bound.left) {
            bound.left = x
          }

          if (bound.right === null) {
            bound.right = x
          } else if (bound.right < x) {
            bound.right = x
          }

          if (bound.bottom === null) {
            bound.bottom = y
          } else if (bound.bottom < y) {
            bound.bottom = y
          }
        }
      }

      var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight)

      copy.canvas.width = trimWidth
      copy.canvas.height = trimHeight
      copy.putImageData(trimmed, 0, 0)

      // open new window with trimmed image:
      return copy.canvas
    },
  },
}
</script>

<style>
* {
  -webkit-touch-callout: none;

  /* iOS Safari */
  -webkit-user-select: none;

  /* Safari */
  -khtml-user-select: none;

  /* Konqueror HTML */
  -moz-user-select: none;

  /* Firefox */
  -ms-user-select: none;

  /* Internet Explorer/Edge */
  user-select: none;

  /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>

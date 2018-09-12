<template>
    <div class="halo-widget" :class="['size-'+size, 'theme-'+theme]" v-drag>

    </div>
</template>

<script>
  import directive from './directive'
  export default {
    name: "halo",
    directives: {
      drag: directive
    },
    props: {
      size: {
        type: String,
        default: () => 'normal'
      },
      theme: {
        type: String,
        default: () => 'default'
      }
    }
  }
</script>

<style scoped lang="scss">
    .halo-widget {
        position: fixed;
        /*left: 80vw;*/
        /*top: 60vh;*/
        left: 0;
        top: 0;
        border-radius: 50%;

        &.size-small {}
        &.size-normal {
            width: 50px;
            height: 50px;
        }
        &.size-large {}

        &.theme-default {
            border: 2px solid red;
            background: #000;
        }
    }
</style>
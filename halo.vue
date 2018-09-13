<template>
    <div class="halo-widget" :class="['size-'+size, 'theme-'+theme]" v-halo="onHaloEv">

    </div>
</template>

<script>
  import directive from './directive'
  export default {
    name: "halo",
    directives: {
      halo: directive
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
    },
    methods: {
      onHaloEv({state}) {
        switch (state) {
          case 'START':
            console.log(state)
            break;
          case 'MOVE':
            console.log(state)
            break;
          case 'END':
            console.log(state)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .halo-widget {
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
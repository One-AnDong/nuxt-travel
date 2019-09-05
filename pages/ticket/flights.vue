<style lang='stylus' scoped></style>
<template lang='pug'>
.filghts 特价机票

</template>
<script>
export default {
  name: 'filghts',
  validate ({ query }) {
    console.log("TCL: validate -> query", query)
    return true
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {

  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

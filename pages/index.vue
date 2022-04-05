<template>
  <SpaceGraphNetwork :initial-space-id="initialSpaceId"/>
</template>

<script>
export default {
    name: "IndexPage",
    data() {
      return {
        initialSpaceId: this.$route.query.space,
      }
    }
}
</script>

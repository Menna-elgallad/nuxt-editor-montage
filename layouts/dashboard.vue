<template lang="pug">
.main
  dashboardNav
  .mycontainer
    slot
</template>

<style lang="scss" scoped>
.main {
  height: 100vh;
  overflow: hidden;
}
</style>

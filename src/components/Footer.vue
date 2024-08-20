<template>
  <footer class="app-footer">
    <div class="container">
      <div class="links-wrap">
        <a target="_blank" href="/" class="link-item">超链接</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {},
};
</script>
<style scoped lang="scss">
.app-footer {
  height: $footerHeight;
  overflow: hidden;

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;

    .links-wrap {
      display: flex;
      align-items: center;
      margin-left: auto;

      .link-item {
        display: block;
        color: $navFooter;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

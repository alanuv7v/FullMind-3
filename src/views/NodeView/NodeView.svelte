<script>
    import Node from "./Node.svelte";
  let tile = [10, 10]

</script>

<main>
  <Node {tile}/>
</main>

<style lang="stylus">
  main {
    width: 100%
    height: 100%
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
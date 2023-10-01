<script>
  import Node from "./Node.svelte";
  export let thots
</script>

<main>
  {#each thots as thot}
   <Node {thot}/>
  {/each}
</main>

<style>
  main {
    margin-right: -1px
  }
</style>
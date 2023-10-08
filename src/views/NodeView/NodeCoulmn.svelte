<svelte:options accessors />

<script>
  import Node from "./Node.svelte";
  export let i, thots

  export let Nodes = []

  let self

</script>

<main>
  {#each thots as thot, ii}
    <Node bind:this={Nodes[ii]} {i} {ii} {thot}/>
  {/each}
</main>

<style>
  main {
    margin-right: -1px
  }
</style>
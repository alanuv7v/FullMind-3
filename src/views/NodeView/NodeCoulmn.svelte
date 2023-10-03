<svelte:options accessors />

<script>
  import Node from "./Node.svelte";
  export let i, fetched

  export let Nodes = []

  let self

</script>

<main>
  {#await fetched}
    <p>...Loading</p>
  {:then thots} 

    <!-- {#each thots as thot, ii}
    <Node bind:this={Nodes[ii]} {i} {ii} {thot}/>
    {/each} -->
  {:catch error}
    <p>오류가 발생했습니다.</p>
  {/await}
</main>

<style>
  main {
    margin-right: -1px
  }
</style>
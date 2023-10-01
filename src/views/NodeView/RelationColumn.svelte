<svelte:options accessors />

<script>
  import Node from "./Node.svelte";
  import { writable } from "svelte/store";
  
  export let relations = writable([])
  
  let main

  $: if ($relations.length > 0) {
    main.style.height = "fit-content"
  }

</script>
  
<main bind:this={main} class="border">
  <div>relations</div>
  {#if relations}
    {#each $relations as relation}
      <div class="relation">
        <button>{Object.keys(relation)[0]}</button>
        <button>{Object.keys(relation)[1]}</button>
      </div>
    {/each}
  {/if}
</main>

<style lang="stylus">
  main {
    position: absolute;
    width: 20em;
  }
  main > *:first-child {
    margin-top: 0.5em
    margin-bottom: 0.5em
  }
  .relation {
    display: flex
    flex-direction: column
    padding: 0px 0.5em 0.5em 0.5em
  }
  .relation button {
    width: 100%
    padding: 0.5em;
  }
</style>
<svelte:options accessors />

<script>
  import Node from "./Node.svelte";
  import Entry from "./Entry.svelte";
  import { writable } from "svelte/store";
  import { state } from "../../data/states/state_01";
  import importModule from "../../lib/importModule";

  let head
  importModule(state.loadedHead).then(obj => {
    head = obj.head;
    
    
  })
  


  export let relations = writable([])
  
  let main

  $: if ($relations.length > 0) {
    main.style.height = "fit-content"
  }
  function delProp() {

  }

</script>
  
<main bind:this={main} class="border">
  <div>relations</div>
  {#if relations}
    {#each $relations as key}
      <div class="relation">
        <Entry {key} on:delProp={delProp}>
          <button>{Object.keys(key)[0] + " ["+ Object.values(Object.values(key)[0]).length + "]"}</button>
        </Entry>
        <Entry {key} on:delProp={delProp}>
          <button>{Object.keys(key)[1] + " ["+ Object.values(Object.values(key)[1]).length + "]"}</button>
        </Entry>
      </div>
    {/each}
  {/if}
</main>

<style lang="stylus">
  main {
    width: 20em;
    hieght: fit-content;
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
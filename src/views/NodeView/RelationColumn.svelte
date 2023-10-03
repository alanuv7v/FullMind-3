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
  
  export let show = "signpost"

  export let relations = writable([])
  
  let main

  $: if ($relations.length > 0) {
    main.style.height = "fit-content"
  }
  function delProp() {

  }
  /* function clickListener(e) {
    if(!e.target.className.includes("relations")) { //relations 바깥 클릭 시
      document.removeEventListener("click", clickListener)
      show = "signpost"
    }
  }
  $: if (show==="relations") {
    document.addEventListener("click", clickListener)
  } */

</script>
  
<main bind:this={main} class="border">
  {#if show === 'relations'}
    <div id="relations">
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
    </div>
  {:else if show === 'signpost'}
    <div id="signpost" class="sign">
      <button class="sign">◀ [A]</button>
      <button class="sign">[B] ▶</button>
    </div>
  {/if}
</main>

<style lang="stylus">
  main {
    width: 20em;
    hieght: fit-content;
  }
  #relations > *:first-child {
    margin-top: 0.5em
    margin-bottom: 0.5em
  }
  .relation {
    display: flex
    flex-direction: column
    margin: 0em 1em 0.5em 1em
  }
  .relation:last-child {
    margin-bottom: 1em;
  }
  .relation button {
    width: 100%
    padding: 0.5em;
  }
  #signpost {
    display: flex
    flex-direction: column
  }
  #signpost * {
    font-size: 1.5em;
    padding: 0.5em;
  }
</style>
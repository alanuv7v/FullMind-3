<svelte:options accessors />


<script>
  import {panzoom} from "../../lib/panzoom"
  
  import {onMount, setContext} from "svelte"
  import { writable, derived } from "svelte/store";
  import {default_thot, default_container_data} from "../../default.js"

  import Node from "./Node.svelte";
  import NodeColumn from "./NodeCoulmn.svelte"
  import RelationColumn from "./RelationColumn.svelte"

  import { state } from "../../data/states/state_01";
  import importModule from "../../lib/importModule";

  
  let head
  let fetched = (async function () {
    return importModule(state.loadedHead).then(obj => {
      head = obj.head;
      console.log(head.thots)
      return head.thots
    })
  })()
  
    

  /* let thot = default_thot
  let thots = [thot, thot, thot] */
  let relations = []

  let columnsNo = [0]
  let Columns = []
  let relationsColumn

  let space, main

  //states
  let focusedNode = null



  function getNodeByAdress(adress) {
    return Columns[adress[0]].Nodes[adress[1]]
  }

  function focusNode(adress) {
    /* console.log(adress)
    console.log(Columns[adress[0]].Nodes[adress[1]]) */
    if (focusedNode) {
      getNodeByAdress(focusedNode).unfocusSelf()
    } 
    focusedNode = adress
    getNodeByAdress(adress).focusSelf()

    /* if (focusedNode) {
      focusedNode.unfocusSelf
    } 
    target.focusSelf()
    focusedNode = target */

    relationsColumn.relations.set(getNodeByAdress(adress).thot.relations)
    relationsColumn.show = "relations"

  }

  setContext('focusNode', focusNode)

  onMount(() => {
    document.addEventListener("DOMContentLoaded", (e) => {
      panzoom(space, {bound:'outer'}, main.children);
    });
    disablePanzoom()
  })

  function enablePanzoom() {
    for (let c of main.children) {
      c.style.pointerEvents = "none"
    }
    /* let elems = document.querySelectorAll("#space > *")
    for (let i = 0; i < elems.length; i++) {
      let elem = elems[i];
      elem.style.pointerEvents = "none"
    } */
  }
  function disablePanzoom() {
    console.log("disablepanzoom " + main)
    for (let c of main.children) {
      c.style.pointerEvents = "auto"
    }
    /* let elems = document.querySelectorAll("#space > *")
    for (let i = 0; i < elems.length; i++) {
      let elem = elems[i];
      elem.style.pointerEvents = "auto"
    } */
  }

  //와 이거 대박인데.
  /* document.addEventListener("click", function(evnt){
    console.log(evnt.target.id);
  }); */
  
  document.addEventListener("keydown", function(e){
    if (e.shiftKey) {
      enablePanzoom()
    }
  });

  document.addEventListener("keyup", function(e){
    if (!e.shiftKey) {
      disablePanzoom()
    }
  });

  function onSpaceClick(e) {
    if (e.target === space) {
      relationsColumn.relations.set([])
      relationsColumn.show = "signpost"
    }
  }
  /* function onSpaceAuxclick(e) {
    switch (e.button) {
      case 1: //middle mouse button down
        e.preventDefault();
        enablePanzoom()
        break;
    
      default:
        break;
    }
  }
 */


  /* function onSpaceClick() {
    relationsColumn.relations.update((data) => {return []})
  } */

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={space} id="space" on:click={onSpaceClick}>
  <main bind:this={main}>
    {#each columnsNo as cN, i}
    <NodeColumn bind:this={Columns[i]} {i} {fetched} />
    {/each}
    <div id="page">
      <RelationColumn bind:this={relationsColumn} />
    </div>
  </main>
</div>

<style lang="stylus">
  #space {
    position: absolute
    width: 1000em
    height: 1000em
    display: flex;
    justify-content: center;
    align-items: center
    overflow: hidden;
    cursor: move
    pointer-events: auto;
  }
  main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    pointer-events: none;
  }
  main > * {
    pointer-events: auto;
  }
  #page {
    display: flex
    flex-direction: column
  }
</style>
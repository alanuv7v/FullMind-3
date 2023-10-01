<svelte:options accessors />

<script>
    import {onMount, setContext} from "svelte"
    import { writable, derived } from "svelte/store";
    import {thisHead} from "../../heads/head_1.js"
    import {default_thot, default_container_data} from "../../default.js"
    import Node from "./Node.svelte";
    import NodeColumn from "./NodeCoulmn.svelte"
    import RelationColumn from "./RelationColumn.svelte"


  let thot = default_thot
  let thots = [thot, thot, thot]
  let relations = []

  let columnsNo = [0]
  let Columns = []
  let relationsColumn

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

  }

  setContext('focusNode', focusNode)

</script>

<main>
  {#each columnsNo as cN, i}
    <NodeColumn bind:this={Columns[i]} {i} {thots} />
  {/each}
  <RelationColumn bind:this={relationsColumn} />
</main>

<style lang="stylus">
  main {
    width: 100%
    height: 100%
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
</style>
<script>
    import {onMount, setContext} from "svelte"
    import { writable, derived } from "svelte/store";
    import {thisHead} from "../../heads/head_1.js"
    import {default_thot, default_container_data} from "../../default.js"
    import Node from "./Node.svelte";
    import NodeColumn from "./NodeCoulmn.svelte"
    import RelationColumn from "./RelationColumn.svelte"

  let tile = [10, 10]

  let thot = default_thot

  let Columns

  let thots = [thot, thot]

  let relations = []

  function focusNode(target) {
    
  }

  setContext('focusNode', focusNode)

</script>

<main>
  <Node {thot}/>
  <NodeColumn {thots}/>
  <RelationColumn {relations} />
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
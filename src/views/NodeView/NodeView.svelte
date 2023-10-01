<script>
    import {onMount, setContext} from "svelte"
    import { writable, derived } from "svelte/store";
    import {thisHead} from "../../heads/head_1.js"
    import {default_thot, default_container_data} from "../../default.js"
    import Node from "./Node.svelte";

  let tile = [10, 10]

  let thot = default_thot

</script>

<main>
  <Node {tile} {thot}/>
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
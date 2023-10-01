<script>
  import {tile} from "./NodeViewStore.svelte"
  import Node from "./Node.svelte";
  export let thots
</script>

<main>
  {#each thots as thot}
    <Node {tile} {thot}/>
  {/each}
</main>
<script>
  import Node from "./Node.svelte";
  export let thots
</script>

<main>
  {#each thots as thot}
   <Node {thot}/>
  {/each}
</main>
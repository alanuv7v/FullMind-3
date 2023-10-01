<script>
  import Node from "./Node.svelte";
  export let relations
</script>
  
<main class="border">
  {#each relations as relation}
    {relation}
  {/each}
</main>

<style>
  main {
    width: 10em;
    height: 20em;
  }
</style>
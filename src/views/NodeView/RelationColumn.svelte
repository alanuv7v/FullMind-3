<script>
  import Node from "./Node.svelte";
  export let relations
</script>
  
<main class="border">
  <div>relations</div>
  {#each relations as relation}
    {relation}
  {/each}
</main>

<style>
  main {
    width: 20em;
    height: 30em;
  }
  main > *:first-child {
    margin-top: 0.5em
  }
</style>
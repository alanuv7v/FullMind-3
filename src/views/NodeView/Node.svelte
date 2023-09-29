<script>
  import {onMount} from "svelte"
  export let tile

  let main
  
  onMount(() => {
    main.style.width = tile[0] + 'px'
    main.style.height = tile[1] + 'px'
  })


</script>

<main bind:this={main} class="border">
  Node
</main>

<style lang="stylus">
  main {
    padding: 10px;
  }
</style>
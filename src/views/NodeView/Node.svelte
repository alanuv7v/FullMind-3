<script>
  import {onMount} from "svelte"
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  export let tile

  //settings
    let typewritter = false

  let main

  function typewrite(target, toChange) {
    if (!toChange) {
      let toChange = "innerText"
    }
    let original = target[toChange]
    target[toChange] = ""
    let i = 0
    var Interval = setInterval(
      function() {
        target[toChange] += original[i]
        i++
        if (i >= original.length) {
          clearInterval(Interval)
        }
      }, 100
    )
  }
  
  onMount(() => {
    main.style.width = tile[0] + 'px'
    main.style.height = tile[1] + 'px'
    if (typewritter) {
      typewrite(main, 'innerText')
    }
  })


</script>

<main bind:this={main} class="border">
  Node
  <MultilineTextarea placeholder="Heading" color="white"/>
</main>

<style lang="stylus">
  main {
    padding: 10px;
  }
  
</style>
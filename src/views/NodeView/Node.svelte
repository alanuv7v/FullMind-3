<script>
  import {onMount} from "svelte"
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  export let tile

  //settings
    let initGrow = true
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
    if (typewritter) {
      typewrite(main, 'innerText')
    }
    if (initGrow) {
      //대충 css 애니메이션. 점에서 가로선이 됬다가 세로로 길어져 열리는.
    }
    main.style.minWidth = tile[0] + 'px'
    main.style.minHeight = tile[1] + 'px'
  })


</script>

<main bind:this={main} class="border">
  Node
  <MultilineTextarea placeholder="why am I floating on this earth alone? I always wondered." color="white"/>
</main>

<style lang="stylus">
  main {
    padding: 10px;
    overflow: hidden;
    transition: width 0.5s ease, height 0.5s ease;
  }
  
</style>
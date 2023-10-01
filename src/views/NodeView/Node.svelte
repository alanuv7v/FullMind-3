<script>
  import {onMount} from "svelte"
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  export let tile, thot
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
    main.style.minWidth = tile[0] + 'em'
    main.style.minHeight = tile[1] + 'em'
  })


</script>

<!-- <template lang="pug">
  div#pug.pug asdf
</template> -->

<main bind:this={main} class="border">
  <div class="entry">
    Node
  </div>
  <div class="entry">
    <MultilineTextarea placeholder="why am I floating on this earth alone? I always wondered." color="white"/>
  </div>
  {#each Object.entries(thot.props) as p}
    <div class="entry">
    {#if typeof p[1] != "object"}
      <MultilineTextarea placeholder={p[0]} value={p[1]} color="white"/>
    {:else}
      {#if p[1].type === "Int"}
        <input type="number" placeholder={p[0]} min="1" max="100">
      {/if}
    {/if}
    </div>
  {/each}
</main>

<style lang="stylus">
  @import "../../themes/Space/global_variables"
  main {
    padding: 1em;
    overflow: hidden;
    transition: width 0.5s ease, height 0.5s ease;
  }
  main {
  }
  .entry {
    border: 1px solid gray
  }
  .entry > * {
    width: 100%
  }
  .entry:nth-child(n+1):not(:last-child) {
    margin-bottom: 1em
  }

</style>
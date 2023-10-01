<svelte:options accessors />

<script>
  import {tile} from "./NodeViewStore"
  import {onMount, getContext} from "svelte"
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  export let i, ii, thot

  //settings
    let initGrow = true
    let typewritter = false

  let main

  let adress = [i, ii]

  //styling
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
    /* main.style.minWidth = tile[0] + 'em'
    main.style.minHeight = tile[1] + 'em' */
  })


  //focusing
    let focusNode = getContext('focusNode')

    let focusedStyle = "inset 0px 0px 0px 4px white"
    export function focusSelf() {
      main.style.boxShadow = focusedStyle
    }
    export function unfocusSelf() {
      main.style.boxShadow = null
    }

    function onTextareaFocus() {
      focusNode(adress)
    }

  

</script>

<!-- <template lang="pug">
  div#pug.pug asdf
</template> -->

<div id="main" bind:this={main} class="border">
  {#each Object.entries(thot.props) as p}
    {#if p[0] === "heading"}
    <div id='heading'>
      <button id="focus">F</button>
      <div class="entry">
        <MultilineTextarea placeholder={p[0]} value={""} color="white" textAlign={p[1].textAlign} on:focus={onTextareaFocus}/>
      </div>
    </div>
    {:else}
      <div class="entry">
      {#if typeof p[1] != "object"}
        <MultilineTextarea placeholder={p[0]} value={p[1]} color="white" on:focus={onTextareaFocus}/>
      {:else}
        {#if p[1].type === "Int"}
          <input type="number" placeholder={p[0]} min="1" max="100">
          {:else}
          <MultilineTextarea placeholder={p[0]} value={""} color="white" textAlign={p[1].textAlign} on:focus={onTextareaFocus}/>
        {/if}
      {/if}
      </div>
    {/if}
  {/each}
  <div class="entry">
    <MultilineTextarea placeholder="why am I floating on this earth alone? I always wondered." color="white"/>
  </div>
</div>

<style lang="stylus">
  @import "../../themes/Space/global_variables"
  #main {
    width: 20em;
    padding: 1em;
    overflow: hidden;
    transition: width 0.5s ease, height 0.5s ease;
    margin-bottom: -1px
  }
  .entry {
    //border: 1px solid gray
    box-shadow: inset 0px 0px 0px 1px gray;
  }
  
  .entry > * {
    width: 100%
    padding: 0.5em;
  }
  .entry:nth-child(n+1):not(:last-child) {
    margin-bottom: 1em
  }
  #heading {
    display: flex
    flex-direction: row
    align-items: center
    margin-bottom: 1em
  }
  #focus {
    margin-right: 0.5em
    width: 2em
    height: 2em
  }

</style>
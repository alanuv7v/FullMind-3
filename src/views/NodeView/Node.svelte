<svelte:options accessors />

<script>
  /* import {tile} from "./NodeViewStore" */
  import {onMount, afterUpdate, getContext} from "svelte"
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  import Entry from "./Entry.svelte";
  import {menuItems, menuItem} from "../../fixedContextMenu_store"
  export let i, ii, thot

  /* thot['asdf'] = 'asdfsadff' */

  //settings
    let initGrow = true
    let typewritter = false

  let main
  let adress = [i, ii]
  
  let menu

  //States
  let screen = "default" //possible screen states: ["default", "fullscreen", "zen"]


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
  
  onMount (() => {
    main.style.height = "fit-content" 
    
    //Context menu setting
    menu = [
      new menuItem({name: "Fullscreen", target: main, function: (target) => {console.log(target)}}),
      new menuItem({name: "Zen", target: main,  function: (target, screen) => {
        if (screen === "zen") {
          screen = "default"
          target.style.position = "inherit"; target.style.width = "20em"
        } else {
          screen = "zen"
          /* let popup = target.cloneNode(true)
          document.querySelector("#space").append(popup)
          console.log(popup)
          popup.style.position = "absolute"
          popup.style.width = "50vw"
          popup.style.zIndex = "2" */
        }
      
      }}),
    ]
    //Animation setting
      if (typewritter) {
        typewrite(main, 'innerText')
      }
      if (initGrow) {
        //대충 css 애니메이션. 점에서 가로선이 됬다가 세로로 길어져 열리는.
      }
    
  })


  //focusing
    let focusNode = getContext('focusNode')

    let focusedStyle = "inset 0px 0px 0px 4px white"
    export function focusSelf() {
      main.style.boxShadow = focusedStyle
      menuItems.set(menu)
      
    }
    export function unfocusSelf() {
      main.style.boxShadow = null
    }

    function onTextareaFocus() {
      focusNode(adress)
    }

    function onTextareaInput(e) {
      //어쩌면 focus out 시에 저장하는게 나을수도.
      thot.props[
        Object.keys(thot.props).find((k) => {return k === e.detail.key})
      ] = e.detail.value

    }
    function onHeadingKeyUp(e) {
      if (e.detail.keyevent.key === 'Enter') {
        let contentValue = e.detail.keyevent.target.value.substr(
          e.detail.keyevent.target.selectionStart,
          e.detail.keyevent.target.value.length
        ) 
        console.log(contentValue)
        e.detail.keyevent.target.value.pop()
      }

    }

    function delProp(e) {
      delete thot.props[e.detail]
      thot = thot
      console.log(thot.props)
    }

  let animal = "s"

</script>

<!-- <template lang="pug">
  div#pug.pug asdf
</template> -->
<div id="main" bind:this={main} class="border">
  <!-- {#if !Object.keys(thot.props).includes("heading")}
  <div id='heading'>
    <button id="focus">F</button>
  </div>
  {/if} -->
  <div id='heading'>
    <button id="focus">F</button>
    <Entry key={"content"}>
      <MultilineTextarea key={"content"} placeholder={"...write..."} on:focus={onTextareaFocus} on:input={onTextareaInput} on:keyup={onHeadingKeyUp}/>
    </Entry>
  </div>
  {#each Object.entries(thot.props) as p}
    {#switch p[0]}
      {:case "content"}
      {:default}
      <div class="entry">
        {#switch p[1].type}
          {:case "int"}
            <Entry key={p[0]} on:delProp={delProp}>
              <input type="number" placeholder={p[0]} min="1" max="100">
            </Entry>
          {:default}
            <Entry key={p[0]} on:delProp={delProp}>
              <MultilineTextarea key={p[0]} placeholder={p[0]} value={""} textAlign={p[1].textAlign} on:focus={onTextareaFocus} on:input={onTextareaInput}/>
            </Entry>
        {/switch}
      </div>
    {/switch}
    
    <!-- {#if p[0] === "heading"}
    {:else}
        {#if typeof p[1] != "object"}
        {:else}
          {#if p[1].type === "Int"}
            {:else}
          {/if}
        {/if}
      </div>
    {/if} -->
  {/each}
</div>

<style lang="stylus">
  @import "../../themes/Space/global_variables"
  #main {
    width: 40em;
    height: fit-content
    transition: height 1s ease

    padding: 1em;
    overflow: hidden;
    transition: width 0.5s ease, height 0.5s ease;
    margin-bottom: -1px

    background-color: dark
  }
  .entry {
    //border: 1px solid gray
    box-shadow: inset 0px 0px 0px 1px gray;
  }
  .entry:nth-child(n+1):not(:last-child) {
    margin-bottom: 1em
  }
  #heading {
    width: 100%
    display: flex
    flex-direction: row
    align-items: center
  }
  #focus {
    margin-right: 0.5em
    width: 2em
    height: 2em
  }
  input {
    width: 100%;
  }

</style>
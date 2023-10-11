<svelte:options accessors />

<script>
  //import from svelte
   import {onMount, afterUpdate, getContext} from "svelte"
  //import modules
  import stringify from "json-stringify-pretty-compact";
  //import child components
  import MultilineTextarea_ from "../lib/MultilineTextarea_.svelte";
  import Entry from "./Entry.svelte";
  import {menuItems, menuItem} from "../fixedContextMenu_store"

  //props to inherit
    export let obj

  //bind child components
    let main

  //States of this component
    let menu
    let screen = "default" //possible screen states: ["default", "fullscreen", "zen"]
    let Entries_Inputs = []
  
  //settings
    let initGrow = true
    let typewritter = false


  //just pure styling
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
          target.style.height = "fit-content"
        } else {
          screen = "zen"
          target.style.height = "20em"
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

    let focusedInput = ""
    $: if (Entries_Inputs[focusedInput]) {
      Entries_Inputs[focusedInput].focus()
    }

  //Event Handlers

    function onTextareaInput(e, key) {
      //어쩌면 focus out 시에 저장하는게 나을수도.
      thot.props[
        Object.keys(thot.props).find((k) => {return k === key})
      ] = e.target.value

    }
    function onHeadingKeydown(e, key) {
      onTextareaInput(e, key)
      if (e.key === 'Enter') {
        e.preventDefault() //no linebreak!

        let contentValue = e.target.value.substr( //get value for new "Content" prop key
          e.target.selectionStart,
          e.target.value.length
        ) 
        
        let heading_value = e.target.value.substr(0, e.target.selectionStart)
        
        delete thot.props['content']
        thot.props['heading'] = heading_value
        thot.props['content'] = contentValue

        /* e.target.value = heading_value //leave only from 0 to caretPosition value for heading
        e.target.nextElementSibling.value = heading_value //visibleTextarea value set */
        
        focusedInput = 'content'
      }
    }

    function delProp(e) {
      delete thot.props[e.detail]
      thot = thot
      console.log(thot.props)
    }

    function InputInit(a, b) {
      Entries_Inputs[b.key] = a
      console.log(Entries_Inputs)
    }

</script>



<div id="main" bind:this={main} class="border">
  <!-- {#if !Object.keys(thot.props).includes("heading")}
  <div id='heading'>
    <button id="focus">F</button>
  </div>
  {/if} -->

  {#each Object.entries(obj) as obj, i}
  <!-- {#switch p[0]}
    {:case "heading"}
    {:case "content"}
    {:default}
  {/switch} -->
  {#switch obj[1].type}
    {:case "object"}
      <svelte:self {obj}/>
    {:case "string"}
      <MultilineTextarea_> <!-- create textarea for synchronous I/O ! -->
        <textarea 
        use:InputInit={{key: entry[0]}}
        placeholder={entry[0]} 
        value={entry[1]} 
        on:focus={(e) => {onTextareaFocus(e)}} 
        on:input={(e) => {onTextareaInput(e, entry[0])}}></textarea>
        <textarea value={entry[1]}></textarea>
      </MultilineTextarea_>
    {:case "Number"}
    {:case "Bool"}
    {:default} <!-- textarea -->
  {/switch}
  {/each}








  {#if Object.keys(thot.props).length===1 && Object.keys(thot.props)[0]==='content'}
    <div id='heading'>
      <button id="focus">F</button>
      <Entry key={"content"}>
        <MultilineTextarea_>
          <textarea 
          use:InputInit={{key: 'content'}}
          placeholder={'content'} 
          value={thot.props['content']} 
          on:focus={(e) => {onTextareaFocus(e)}} 
          on:keydown={(e) => {onHeadingKeydown(e, 'content')}}></textarea>
          <textarea
          value={thot.props['content']}></textarea>
        </MultilineTextarea_>
      </Entry>
    </div>
    {:else}
      {#each Object.entries(thot.props) as p, i}
        {#switch p[0]}
          {:case "heading"}
            <div id='heading'>
              <button id="focus">F</button>
              <Entry key={"heading"}>
                <MultilineTextarea_>
                  <textarea 
                  use:InputInit={{key: p[0]}}
                  placeholder={p[0]} 
                  value={p[1]} 
                  on:focus={(e) => {onTextareaFocus(e)}} 
                  on:input={(e) => {onTextareaInput(e, p[0])}}></textarea>
                  <textarea value={p[1]}></textarea>
                </MultilineTextarea_>
              </Entry>
            </div>
          {:case "content"}
            <Entry key={"content"}>
              <MultilineTextarea_>
                <textarea 
                use:InputInit={{key: p[0]}}
                placeholder={p[0]} 
                value={p[1]} 
                on:focus={(e) => {onTextareaFocus(e)}} 
                on:input={(e) => {onTextareaInput(e, p[0])}}></textarea>
                <textarea value={p[1]}></textarea>
              </MultilineTextarea_>
            </Entry>
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
      {/each}
  {/if}
  
    
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
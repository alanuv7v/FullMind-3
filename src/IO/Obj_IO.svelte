<svelte:options accessors />

<script>
  //import from svelte
   import {onMount, afterUpdate, getContext} from "svelte"
  //import modules
  import stringify from "json-stringify-pretty-compact";
  //import child components
  import MultilineTextarea_ from "../lib/MultilineTextarea_.svelte";
  
  //props to inherit
    export let obj
    export let entry


  //bind child components
    let main

  //States of this component

  onMount(() => {
    obj = entry
  })

</script>


<div id="main" bind:this={main} class="border">
  {#each Object.entries(obj) as entry, i}
  <!-- {#switch p[0]}
    {:case "heading"}
    {:case "content"}
    {:default}
  {/switch} -->
  {#switch entry[1].type}
    {:case "object"}
      <svelte:self {entry}/>
    {:case "string"}
      <MultilineTextarea_> <!-- create textarea for synchronous I/O ! -->
        <textarea 
        placeholder={entry[0]} 
        value={entry[1]} 
        on:focus={(e) => {onTextareaFocus(e)}} 
        on:input={(e) => {onTextareaInput(e, entry[0])}}></textarea>
        <textarea value={entry[1]}></textarea>
      </MultilineTextarea_>
    {:case "Number"}
    {:case "Bool"}
    {:default} <!-- textarea -->
      <MultilineTextarea_> <!-- create textarea for synchronous I/O ! -->
        <textarea 
        placeholder={entry[0]} 
        value={entry[1]} 
        on:focus={(e) => {onTextareaFocus(e)}} 
        on:input={(e) => {onTextareaInput(e, entry[0])}}></textarea>
        <textarea value={entry[1]}></textarea>
      </MultilineTextarea_>
  {/switch}
  {/each}
</div>

<style lang="stylus">
  //@import "../../themes/Space/global_variables"
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
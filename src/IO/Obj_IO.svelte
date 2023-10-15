<svelte:options accessors />

<script>
  //import from svelte
   import {onMount, afterUpdate, getContext} from "svelte"
  //import modules
  import stringify from "json-stringify-pretty-compact";
  //import child components
  import MultilineTextarea_ from "../lib/MultilineTextarea_.svelte";
  
  //props to inherit
   /*  export let obj
    export let entry
 */
   export let data

    let children = []


    /* export let adress = []
    let lastAdress = adress[adress.length-1] */


  //bind child components
    let main

  //States of this component

  onMount(() => {
   /*  key = data.key
    values = data.values
    values = values.filter((v) => {return (typeof v === 'object' && !Array.isArray(v) && v !== null) })
    for (let e of values) {
      children.push({key: Object.keys(e)[0], values: Object.values(e)})
    }
    console.log(children)
     */

    if (Array.isArray(data.values)) {
      for (let v of data.values) {
        children.push({key: v[0], values: Object.entries(v[1])})
        children = children
        /* if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
          children.push({key: Object.keys(v)[0], values: Object.values(v)})
        } else {
          children.push({key: v})
        } */
      }
    }
    console.log(children)
  })

</script>


<div id="main" bind:this={main} class="border">

  {data.key}
  {#each children as data}
    values: {data.values}
  
    <!-- <div>
      {stringify(data.key)}</div>
    <div>
      {stringify(data.values)}</div> -->
    <svelte:self {data}/>
    <!-- {#if data.values}
        <svelte:self {data}/>
      {:else}
    {/if} -->
  {/each}

  <!--{#each Object.entries(obj) as entry, i}
   {#switch p[0]}
    {:case "heading"}
    {:case "content"}
    {:default}
  {/switch
  {#switch entry[1].type}
    {:case "object"}
      <svelte:self {entry}/>
    {:case "string"}
      <MultilineTextarea_>
        <textarea 
        placeholder={entry[0]} 
        value={entry[1]} 
        on:focus={(e) => {onTextareaFocus(e)}} 
        on:input={(e) => {onTextareaInput(e, entry[0])}}></textarea>
        <textarea value={entry[1]}></textarea>
      </MultilineTextarea_>
    {:case "Number"}
    {:case "Bool"}

    {:default}} -->

      <!-- {#if Object.values(entry[1]) > 0}
        {#each Object.values(entry[1]) as entry}
         <svelte:self {entry}/>
        {/each}
      {:else}
        
      {/if} -->
      <!-- <MultilineTextarea_>
        <textarea 
        placeholder={entry[0]} 
        value={entry[1]} 
        on:focus={(e) => {onTextareaFocus(e)}} 
        on:input={(e) => {onTextareaInput(e, entry[0])}}></textarea>
        <textarea value={entry[1]}></textarea>
      </MultilineTextarea_> -->
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
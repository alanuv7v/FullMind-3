<script>
  import Container from './Container.svelte'
  import { writable } from "svelte/store";
  import { getContext, onMount } from 'svelte';
  export let data, page_data

  let Containers = []
  let line

</script>

{#each page_data as data, i}
  <Container {data} 
  {line}
  bind:this={Containers[i]} 
  on:expandRelationExtreme/>
{/each}
<div id="line" bind:this={line}></div>


<style>
  .page {
    width: fit-content;
    /* border-right: 1px solid gray; */
  }
  #line {
    margin-left: 100px;
    width: 1px;
    background-color: black;
  }
</style>
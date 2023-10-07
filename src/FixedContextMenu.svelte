<svelte:options accessors />

<script>
  //import from svelte
  import {getContext, setContext, createEventDispatcher, onMount} from 'svelte'
  import { menuItems } from './fixedContextMenu_store';
  const dispatch = createEventDispatcher()
  //import modules
  //import child components

  //bind child components

  //props to inherit

  //States of this component
  
  //Event handlers

</script>

<main>
  {#each $menuItems as Item}
   <button on:click={Item.function}>Item.name</button>
  {/each}
</main>

<!-- <main>
</main> -->


<style lang="stylus">
  //@import "/themes/Space/___"

  main {
    display: flex
    flex-direction: row

  }

</style>



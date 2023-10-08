<svelte:options accessors />

<!-- 유념할 점: 결국 menu의 item의 이름과 함수를 동시에 준다는 가정 하에 쓰인다.
 -->

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
   <button on:click={Item.function(Item.target)}>{Item.name}</button>
  {/each}

  <!-- {#each $menus as menuItems}
    {#each menuItems as Item}
    <button on:click={Item.function(Item.target)}>{Item.name}</button>
    {/each}
  {/each} -->
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



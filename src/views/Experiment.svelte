<svelte:options accessors />

<script>
  //import from svelte
  import {getContext, setContext, createEventDispatcher, onMount} from 'svelte'
  import {default_thot} from '../default'
  const dispatch = createEventDispatcher()
  //import modules
  import stringify from "json-stringify-pretty-compact";
  //import child components
  import Obj_IO from '../IO/Obj_IO.svelte'

  //bind child components

  //props to inherit

  //States of this component
  
  //Event handlers

  let obj = default_thot
  let data = {
    key: "default_thot",
    values: Object.entries(obj)
  }
</script>

<main>
  {stringify(obj)}
  <Obj_IO {data}/>
</main>


<style lang="stylus">
  
</style>



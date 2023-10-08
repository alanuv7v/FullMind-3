<script>
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()

  export let key

  let main

</script>
<main bind:this={main} id={key} class="entry" >
  <slot>

  </slot>
  <!-- <MultilineTextarea key={data.key} placeholder={data.key} value={data.value} textAlign={data.style.textAlign} 
  on:focus={() => dispatch('onTextareaFocusdispatch')} 
  on:input={() => dispatch('onTextareaInput')}/> -->
  <button id="delProp" on:click={() => {dispatch("delProp", key)}}>-</button>
  <button id="addProp">+</button>
</main>

<style>
  .entry {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .entry > *:first-child {
    width: 100%
  }
  .entry > * {
    padding: 0.5em;
  }
</style>
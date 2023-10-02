<script>
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()

  export let key

</script>
<div class="entry">
  <slot>

  </slot>
  <!-- <MultilineTextarea key={data.key} placeholder={data.key} value={data.value} textAlign={data.style.textAlign} 
  on:focus={() => dispatch('onTextareaFocusdispatch')} 
  on:input={() => dispatch('onTextareaInput')}/> -->
  <button id="delProp" on:click={() => {dispatch("delProp", key)}}>-</button>
  <button id="addProp">+</button>
</div>

<style>
  .entry {
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
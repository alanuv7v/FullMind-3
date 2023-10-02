<script>
  import MultilineTextarea from "../../lib/MultilineTextarea.svelte";
  import {createEventDispatcher} from 'svelte'
  export let data

  const dispatch = createEventDispatcher()

</script>
<div class="entry">
  <MultilineTextarea key={data.key} placeholder={data.key} value={data.value} 
  color="white" textAlign={data.style.textAlign} 
  on:focus={() => dispatch('onTextareaFocusdispatch')} 
  on:input={() => dispatch('onTextareaInput')}/>
  <div id="util">
    <button id="addProp">+</button>
    <button id="delProp">-</button>
  </div>
</div>

<style>
  .entry {
    display: flex;
    flex-direction: row;
  }
  #util {
    display: flex;
    flex-direction: column;
  } 
</style>
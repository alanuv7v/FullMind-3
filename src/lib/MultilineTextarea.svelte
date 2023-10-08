<svelte:options accessors />

<script>
  import {createEventDispatcher, onMount} from 'svelte'
  
  let inputTextarea;
  let visibleTextarea;

  export let placeholder = ""
  export let key = ""
  export let value = ""
  export let color = "white"
  export let textAlign = "left"
  

  function resizeTextarea() {
    inputTextarea.style.height = "0px" //리셋해서 scrollHeight 다시 계산
    inputTextarea.style.height = (inputTextarea.scrollHeight) + "px"
    visibleTextarea.style.height = inputTextarea.style.height
    visibleTextarea.value = inputTextarea.value //높이 먼저 변한 후 value 변경됨
  }

  function onTextareaInput() {  
    resizeTextarea() 
    dispatch('input', {key: key, value: inputTextarea.value}) 
  }

  const dispatch = createEventDispatcher()
  
  function onTextareaKeydown(e) {
    /* console.log('KEY DOWN: '+e.key) */
    dispatch('keydown', {keyevent: e})
  }
  function onTextareaKeyUp(e) {
    /* console.log('KEY UP: '+e.key) */
    dispatch('keyup', {keyevent: e, inputTextarea: inputTextarea, visibleTextarea: visibleTextarea})
  }
  function onTextareaFocus(e) {
    dispatch('focus')
  }

  function setValues() {
    if (color) {
      visibleTextarea.style.color = color;
      inputTextarea.style.caretColor = color;
      
    }
    else {
      inputTextarea.style.caretColor = "DimGray";
    }

  }

  onMount(
    ()=>{
      resizeTextarea();
      setValues();
    }
  )

</script>

<div id="MultilineTextarea">
  <textarea
    bind:this={inputTextarea}
    on:keydown={(e) => {onTextareaKeydown(e)}}
    on:keyup={(e) => {onTextareaKeyUp(e)}}
    on:input={() => onTextareaInput()}
    on:focus={() => onTextareaFocus()}
    class="inputTextarea" rows="1" spellcheck="false"
    placeholder={placeholder}
    value={value}
    style:textAlign
    style={"text-align:"+textAlign}></textarea>
  <textarea
    bind:this={visibleTextarea}
    on:focus={() => inputTextarea.focus()}
    class="visibleTextarea" spellcheck="false" rows="1"
    style={"text-align:"+textAlign}></textarea>
</div>

<style lang="stylus">
  @import "../themes/Space/MultilineTextarea"
  * {
    box-sizing: border-box; /* 중요 */
  }
  #MultilineTextarea {
    position:relative; /* 중요 */
    width: 100%;
    height: fit-content;
    display: flex; /* 중요 */
  }
  textarea {
    background-color: transparent;
    font-size: inherit;
    width: 100%;
    padding: 1em;
    overflow-y: hidden;
    resize: none;
  }
  .visibleTextarea {
    color: white;
    background-color: transparent;
    border:none;
  }
  .inputTextarea {
    position:absolute;
    border: none;
    color: transparent;
    background-color: transparent;
    z-index: 1;
    /* transition: none !important; */ /* 진짜 중요 */
    caret-color: white;
  }
  .inputTextarea::selection {
    color: white;
    background: #be9eff;
  }
</style>

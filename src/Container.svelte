<svelte:options accessors />


<!-- {@debug user} -->

<script>
  //import modules
    import {getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte'
  //import children components
    import MultilineTextarea from './lib/MultilineTextarea.svelte'
  
  //data to be given by the parent component
    export let data;
    export let i;
  //data to expose
    export let root;
    export let container_elem;

  //variables to be used inside this component
  function formatIndex(array) {
    if (array) {
      return array.join(".")
    }
  }
  export let index = data.index
  export let string_index = formatIndex(data.index) //이거 바꾸자. 이름을 string_index로. 

  //states of this container
    let foldContent = false
    let foldChildren = false

  //bind components to variables
    let foldButton;
    export let contentTextarea;

  //getContext 
    const createBrotherContainer = getContext('createBrotherContainer')
    const moveContainerFocus = getContext('moveContainerFocus')
    const focusContainerAt = getContext('focusContainerAt')
    const onCtrlShiftArrowKeydown = getContext('onCtrlShiftArrowKeydown')
    const onCtrlShiftArrowKeyUp = getContext('onCtrlShiftArrowKeyUp')
    const onArrowKeyUp = getContext('onArrowKeyUp')

  let createNewContainer = getContext('createNewContainer')
  let foldContainerChildren = getContext('foldContainerChildren')
 

  //Indent self
  let indentSize = 20
  let style = "margin-left:" + indentSize*data.index.length + "px;"
  

  //Event handlers

  let CtrlShiftArrowKeyDown = false
  
  //on keydown in textareas
  function onTextareaKeydown(e) {
    let keyevent = e.detail.keyevent
    if(keyevent.key === 'Enter' && keyevent.ctrlKey) { //ctrl + Enter
      //goto or create new Container, and focus on it 
      createBrotherContainer(data, i) 
    }
    else if (keyevent.key.search("Arrow")>-1 && keyevent.ctrlKey && !keyevent.shiftKey) { //ctrl + arrow key
      //move focus
      moveContainerFocus(string_index, i, keyevent.key)
    }
    else if (keyevent.key.search("Arrow")>-1 && keyevent.ctrlKey && keyevent.shiftKey) { //ctrl + shift + arrow key
      CtrlShiftArrowKeyDown = true
      onCtrlShiftArrowKeydown(keyevent.key)
    }
  }

  function onTextareaKeyUp(e) {
    let keyevent = e.detail.keyevent
    if (CtrlShiftArrowKeyDown && (!(keyevent.ctrlKey)||!(keyevent.shiftKey))) { //ctrl, shift, arrow 전체가 다 up됬을때
      onCtrlShiftArrowKeyUp(keyevent)
      CtrlShiftArrowKeyDown = false
    }
    else if (CtrlShiftArrowKeyDown) {
      onArrowKeyUp(keyevent)
    }
  }

  function onTextareaFocus() {
    focusContainerAt(i)
  }

  function onFoldButtonClick() {
    /* function foldContainerChildren(index) {
    }
    foldContainerChildren(index) */
    //이 컨테이너의 index(n.n.n 형식으로 된것) 스트링을 그대로, 이 컨테이너 아래 것들부터 검색해서 display:none으로 설정한 뒤, 이 컨테이너의 fold 버튼의 비주얼을 바꾸는 것(fold/unfold 글씨변경, 일단)이 제일 단순무식하나 최적일듯 하다. 
    //foldChildren = !foldChildren
    ;
  }

  function onDiveButtonClick() {
    ;
  }

  export function focusSelf() {
    root.classList.add('focused')
  }
  export function unfocusSelf() {
    root.classList.remove('focused')
  }
  
  function getValidRelations(relation) {
    for (let extremes of relation.extremes) {
     let idBindedExtremes = extremes.filter((e) => {return e.length > 0})
    }
    if (idBindedExtremes) {
      return idBindedExtremes
    }
    
  }
  
</script>

<main bind:this={root}>
  <div id="container" bind:this={container_elem} style={style}>
    <div id="options">
      <button type="button" class="dive">Dive</button>
      <button type="button" class="fold"
      bind:this={foldButton}
      on:click={() => onFoldButtonClick()}>
      {foldChildren ? 'unfold' : 'fold'}</button>
    </div>
    <div id="props">
      <span id="index">{string_index}</span>
      <div style="display:flex; flex-direction:column; width:100%;">
        <div id="heading">
          <MultilineTextarea placeholder={data.thot.heading} on:keydown={onTextareaKeydown} on:keyup={onTextareaKeyUp} on:focus={onTextareaFocus}/>
        </div>
        <div id="contentTextarea">
          <MultilineTextarea placeholder={data.thot.content} on:keydown={onTextareaKeydown} on:keyup={onTextareaKeyUp} on:focus={onTextareaFocus} bind:inputTextarea={contentTextarea}/>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="root_second_border" bind:this={root_second_border}></div> -->
</main>

<style lang="stylus">
  /* :global로 적은건 아예 모든, 어떤 svelte 파일의 element든지 다 적용되니까 여기서는 쓰지 말고 *로 대체하자. 
  아예 글로벌하게 만들 스타일은 다른데에 적자.*/
  
  :global(div#content:hover) {
    border-color: rgba(240, 255, 239, 1) !important;
    /* background-color: #f5ead5; */
  }
  :global(button:hover, textarea:hover) {
    border-color: rgba(52, 74, 70, 0.5) !important;
    /* background-color: #f5ead5; */
  }
  :global(button:focus, button:focus-visible, textarea:focus, textarea:focus-visible) {
    border-color: rgba(52, 74, 70, 0.5) !important;
    outline: 1px solid rgba(52, 74, 70, 0.5) !important;
    box-shadow: 
      inset 1px 1px 1px 0px rgba(52, 74, 70, 0.5),
      inset 2px 2px 3px 0px rgba(52, 74, 70, 0.25);
    /* outline: none; */
  }

  button:active {
    background-color: blue;
    color: white;
  }

  * {
    box-sizing: border-box;
    /* transition: background-color 1s steps(200); */
    transition: all 0.5s ease;
  }

  main {
    position: relative;
    /* height: 100px; */
    border: 4px solid;
    border-color: transparent;
    transition: border-color 0.2s ease-out, background-color 0.5s ease-out, height 0.5s cubic-bezier(.49,.16,.2,.98);
    overflow: hidden;

    #container {
      display: flex
      flex-direction: rows
      
      #options {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 44px;
        margin-right: 4px;

        font-size: 12px;
        
        > * {
          text-align: center;
          font-weight: 700;
        }
        button.dive {
          background-color: rgba(52, 74, 70, 1);
          color: white;
        }
        button.fold {
          background-color: rgba(151, 200, 128, 1);
          color: black;
          }
        button:hover {
          font-size: @font-size*1.25
        }
      }
      
      #props {
        width: 100%;
        box-sizing: content-box;


        height: fit-content;
        display: flex;
        
        font-weight: 100;
        font-style: normal;
        font-size: 14px;
        
        position: relative;
        z-index: 2;
              
        #index {
          height: fit-content;
          margin-right: 8px;
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 10px;
          
          box-shadow: inset 1px 1px 0px 0px rgba(0,0,0,0.5),
          inset -1px -1px 0px 0px rgba(226, 247, 228, 1);
        }
        
        #heading {
          text-align: left;
          width: 100%;
          height: fit-content;
          margin-bottom: 4px;
        }
        #content {
          background-color: rgba(188, 230, 187, 1);
          box-shadow: inset 1px 1px 4px -2px rgba(0,0,0,0.75);

          border: 1px solid rgba(52, 74, 70, 0.56);
          /* border: 1px solid #e0e0e0; */
          
          width: 100%;
          height: fit-content;

          display: flex;
          align-items: stretch;
          align-content: flex-start;

          padding: 8px;

          /* background-color: #bdceff; */
        }
      }
    }
  }
  button {
    /* border: 1px inset rgba(52, 74, 70, 0.5); */
    border-radius: 8px;

    /* width: fit-content; */
    height: 2em;
    
    font-size: inherit;
    background-color: white;

  }
  #contentTextarea {
    position:relative; /* 중요 */
    width: 100%;
    height: fit-content;
    display: flex; /* 중요 */
  }

</style>

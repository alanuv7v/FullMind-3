<svelte:options accessors />


<!-- {@debug user} -->

<script>
  //import modules
    import {getContext, onMount, createEventDispatcher} from 'svelte'
    //import Portal from "svelte-portal";
  //import children components
    import MultilineTextarea from '../../lib/MultilineTextarea.svelte'
    import RelationExtreme from './RelationExtreme.svelte';

  const dispatch = createEventDispatcher()
  
  //data to be given by the parent component
    export let data;
    export let i;
    export let page_index = 0
  //data to expose
  function formatIndex(array) {
    if (array) {
      return array.join(".")
    }
  }

  let index = data.index
  let string_index = formatIndex(data.index) //이거 바꾸자. 이름을 string_index로. 

  //(initial) states of this container
    let foldContent = false
    let foldChildren = false
    let expandRelationToLeft = true
    let relationsPanelWidth = "fit-content"/* "200px" */

  //bind components to variables
    let root
    let container_elem
    let foldButton
    export let contentTextarea
    let relationsPanel
    let leftRelationsPanelWrapper
    let rightRelationsPanelWrapper

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
      focusContainerAt(page_index, i)
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
  
  /* function getValidRelations(relation) {
    for (let extremes of relation.extremes) {
     let idBindedExtremes = extremes.filter((e) => {return e.length > 0})
    }
    if (idBindedExtremes) {
      return idBindedExtremes
    }
    
  } */


  function toggleRelationsPanel(left) {
    
    function toggle(r) {
      setTimeout(() => {
        if (r.style.width != relationsPanelWidth) {
          r.style.width = relationsPanelWidth
        } 
        else {
          r.style.width = "0px"
        }
      }
        , 1
      )

      
    }
    if (left) {
      if (leftRelationsPanelWrapper.children[0]) {
        toggle(leftRelationsPanelWrapper.children[0])
      } else {
        leftRelationsPanelWrapper.append(relationsPanel.cloneNode(true))
        toggle(leftRelationsPanelWrapper.children[0])
      }
    } else {
      if (rightRelationsPanelWrapper.children[0]) {
        toggle(rightRelationsPanelWrapper.children[0])
      } else {
        rightRelationsPanelWrapper.append(relationsPanel.cloneNode(true))
        toggle(rightRelationsPanelWrapper.children[0])
      }
    }
  }

  onMount(
    () => { /* 
      if (expandRelationToLeft) {
        leftRelationsPanelWrapper.append(relationsPanel)
      } else {
        rightRelationsPanelWrapper.append(relationsPanel)
      } */
      //leftRelationsPanelWrapper.append(relationsPanel.cloneNode(true))
    }
  )

  export let line

 

  
</script>

<main bind:this={root}>
  <!-- <button on:click={()=>{toggleRelationsPanel(true)}}>.</button> -->
  <div id="container" bind:this={container_elem} style={style}>
    <div id="options">
    </div>
    <div bind:this={leftRelationsPanelWrapper}></div>
    <div id="props">
      <span id="index">123</span>
      <div style="display:flex; flex-direction:column; width:100%;">
        <div id="heading">
          <MultilineTextarea placeholder={data.thot.heading} on:keydown={onTextareaKeydown} on:keyup={onTextareaKeyUp} on:focus={onTextareaFocus}/>
        </div>
        <div id="contentTextarea">
          <MultilineTextarea placeholder={data.thot.content} on:keydown={onTextareaKeydown} on:keyup={onTextareaKeyUp} on:focus={onTextareaFocus} bind:inputTextarea={contentTextarea}/>
        </div>
      </div>
    </div>
    <div bind:this={rightRelationsPanelWrapper}></div>
    <div bind:this={relationsPanel} id="relations"><!-- relations: -->
      <!-- <button id="expand_to_left">L</button>
      <button id="expand_to_right">R</button> -->
      {#each Object.keys(data.thot.relations) as relation, i}
        <!-- <button on:click={expandRelationExtreme()}>
          {relation}
        </button> -->
        <div class="relation" style="display: flex; flex-direction: column;">

          <RelationExtreme 
          targetExtreme={Object.keys(data.thot.relations[relation])[1]} 
          sourceExtreme={Object.keys(data.thot.relations[relation])[0]}
          page_index={page_index}
          line={line}
          on:expandRelationExtreme={(e)=>{console.log(e); dispatch(
            "expandRelationExtreme", 
            {extreme_values: Object.values(data.thot.relations[relation][e.detail]), 
            page_index: page_index}) }}
          />

          <RelationExtreme 
          targetExtreme={Object.keys(data.thot.relations[relation])[0]} 
          sourceExtreme={Object.keys(data.thot.relations[relation])[1]}
          page_index={page_index}
          line={line}
          on:expandRelationExtreme={(e)=>{console.log(e); dispatch(
            "expandRelationExtreme", 
            {extreme_values: Object.values(data.thot.relations[relation][e.detail]), 
            page_index: page_index}) }}
          />

        </div>
      {/each}
    </div>
  </div>
  <!-- <button on:click={()=>{toggleRelationsPanel(false)}}>.</button> -->
  <!-- <div id="root_second_border" bind:this={root_second_border}></div> -->
</main>
<style lang="stylus">
  @import "../../themes/green_cozy/global_variables"

  /* :global로 적은건 아예 모든, 어떤 svelte 파일의 element든지 다 적용되니까 여기서는 쓰지 말고 *로 대체하자. 
  아예 글로벌하게 만들 스타일은 다른데에 적자.*/
  

  :global(div#content:hover) {
    border-color: rgba(240, 255, 239, 1) !important;
    /* background-color: #f5ead5; */
  }
  :global(button:hover, textarea:hover) {
    border-color: rgba(52, 74, 70, 0.5) /*!important*/;
    /* background-color: #f5ead5; */
  }
  :global(button:focus, button:focus-visible, textarea:focus, textarea:focus-visible) {
    border-color: rgba(52, 74, 70, 0.5) /*!important*/;
    outline: 1px solid rgba(52, 74, 70, 0.5) /*!important*/;
    
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
    /* transition: background-color 1s steps(200); */\
    transition: all 0.5s ease;
  }

  main {
    padding: 10px;
    margin: 10px;
    border-radius: 10px;

    position: relative;

    display: flex;
    flex-direction: row;

    overflow: visible;

    /* height: 100px; */
    border: 1px solid gray;
    /* border-color: transparent; */
    border-color: black;
    transition: border-color 0.2s ease-out, background-color 0.5s ease-out, height 0.5s cubic-bezier(.49,.16,.2,.98);

    font-size: 14px;
  }
  main > button {
    height: auto;
  }
  #container {
    display: flex;
    flex-direction: row;
  }
  
  #root_second_border {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;

    border: 4px solid;
    border-color: transparent;
  }
  #props {
    box-sizing: content-box;
    width: 400px;

    height: fit-content;
    display: flex;
    
    font-weight: 100;
    font-style: normal;
    
    position: relative;
    z-index: 2;
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
  #options {
    /* display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 40px;
    margin-right: 4px;

    font-size: 12px; */
  }
  /* #options > * {
    text-align: center;
    font-weight: 700;
  }
  #options button.dive {
    background-color: rgba(52, 74, 70, 1);
    color: white;
  }
  #options button.fold {
    background-color: rgba(151, 200, 128, 1);
    color: black;
  } */

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
  div #relations {
    overflow: visible;
    display: flex;
    flex-direction: column;
    overflow: visible;
    width: 40px;
    border: 1px solid transparent;
    border-radius: 10px;
    
    &:hover {
      border-color: gray;
      .dot-line {
        background-color: gray;
      }
    }
    
  }
  /* textarea {
    background-color: transparent;

    border: 1px solid transparent;
    font-size: inherit;
    
    width: 100%;
    height: fit-content;
    
    padding: 0px;
    overflow-y: hidden;
    resize: none;
  }
  #visibleTextarea {
    background-color: transparent;
  }
  #inputTextarea {
    position:absolute;
    
    border: none;
    color: transparent;
    background-color: transparent;
    z-index: 1;
    
  }
  #inputTextarea::selection {
    color: white;
    background: #be9eff;
  } */
</style>

<script>
  import { writable, derived } from "svelte/store";
  import Container from './Container.svelte'
  import Page from "./Page.svelte";

  import { default_container_data } from '../../default';
  import {setContext} from "svelte"
  import {thisHead} from "../../heads/head_1"



  let Containers = []

  //test
    let data = structuredClone(default_container_data)
    let test_target_data = structuredClone(default_container_data)

    test_target_data.thot.id = 1
    test_target_data.thot.heading = "test_reason"

    data.thot.relations['conclusions-reasons'].reasons = [test_target_data.thot.id]

  let page_data = []
  const pages_data = writable([
    [data]
  ])

  //states
    const pageWidth = "400px"

  
  /* on keydown(event)
  if (event.key == ctrl+shift+arrow):
    create new ghostContainer, horizontalCursor under the focus-readyContainer */
  
  let focusedContainer 

  function focusContainer(C) {
    if (focusedContainer) {
      focusedContainer.unfocusSelf()
    }
    focusedContainer = C
    C.focusSelf()
    //중앙에 그 컨테이너 오도록 스크롤값 고치기(IndentedThots 뷰의 경우, 패닝 대신)
  }

  function focusContainerAt(page_index, i) {
    focusContainer(Containers[i])
  }
  
  setContext("focusContainerAt", focusContainerAt)

  

  function expandRelationExtreme(e) {
    console.log(e.detail)
    let extreme_values = e.detail.extreme_values
    let source_page_index = e.detail.page_index

    //fetch related thots that are close to the extreme
    //get left or right section
    //if needed, add one more page in pages var
    //>>>
    let related_thots = []
    for (let id of extreme_values) {
      //related_thots.push(thisHead.thots[id]) 사실 이게 맞지만 지금은:
      related_thots.push(test_target_data)
    }
    
    let target_page_data = related_thots
    
    if (!pages_data[source_page_index+1]) { //if the target page does not exist yet:
      pages_data.update(data => [...data, target_page_data]) //pages_data가 변함에 따라 ui 자동 업데이트.
    } else {
      target_page_data = pages_data[source_page_index+1]
    }
    console.log($pages_data)
    
  }
  setContext('expandRelationExtreme', expandRelationExtreme)
  
  let lines = []

  function getPageDividerPos(i) {
    return lines[i].getBoundingClientRect()
  }

</script>
PhamphletView
<main>
  {#each $pages_data as page_data, i}
   <Page data={data} page_data={page_data}/>
    <!-- <div class='page'>
      {#each page_data as data, i}
        <Container {data} 
        bind:this={Containers[i]} 
        on:expandRelationExtreme={expandRelationExtreme}/>
      {/each}
    </div> 
    <div id="line" bind:this={lines[i]}></div> -->
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }
  .page {
    width: fit-content;
    /* border-right: 1px solid gray; */
  }
  #line {
    width: 1px;
    background-color: black;
  }
</style>
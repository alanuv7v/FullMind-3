<script>
  import Container from "./Container.svelte"
  import { writable, derived } from "svelte/store";
  import {thisHead} from "./heads/head_1.js"
  import {default_thot, default_container_data} from "./default.js"
  import {onMount, setContext} from "svelte"

  let fetchedContainers = writable()
  
  let seedThot = thisHead.thots[0];

  let max_find_repetition = 30; //한번에 찾을 thot들의 최대 개수

  let fetched_times = 0

  const fetchContainers = function (seedThot) {
    fetched_times++
    console.log('fetching containers: '+fetched_times)
    
    let find_repetition = 0;
    let result = [];
    let index = [0];

    function handleThot(thot) {
      find_repetition++;
      index[index.length - 1]++;
      let i = [...index]; //deep copy!
      result = [...result, { index: i, thot: thot }];
      if (thot.children.length > 0) {
        //if thot.children exist
        index.push(0);
        for (let id of thot.children) {
          //여기에 문제가? ...let을 안붙인 거였다. array 안 item에게. id가 정의가 안되있던것.
          let child = thisHead.thots.find((thot) => thot.id === id);
          if (find_repetition < max_find_repetition) {
            handleThot(child);
          } else {
            break;
          }
        }
      } else {
        index.pop();
      }
    }
    handleThot(seedThot);
    fetchedContainers.update((c) => {return result})
    return result; //list of container data
  };
  
  $: Containers = []

  onMount(
    fetchContainers(seedThot)
  )
  
  /* const newContainer = () => {
    return {
      index ,
      thot: default_thot
    }
  } */

  function createBrotherContainer(data, i) {
    let index = data.index
    let new_thot = JSON.parse(JSON.stringify(default_thot))

    let parent_index = [...index].pop()
    let parent = $fetchedContainers.find((data) => {return data.index === parent_index})
    parent.thot.children = [...parent.thot.children, new_thot.id]
    
    //! need to update children data of the parent thot.
    //Why the hell can't I use "update"?
  }

  let ghost_data;
  let ghost;
  // 그렇다 전역변수다. 
  function createGhostContainer(index) {
    
    if (ghost) {
      ghost.root.classList.remove('ghost')
    }
    
    ghost_data = JSON.parse(JSON.stringify(default_container_data))
    
    ghost_data.index = JSON.parse(JSON.stringify(index))
    
    //let parentIndex = ghost.index.pop()
    // 부모 thot에 자식으로 ghost 등록

    fetchedContainers.update((c) => {return [...c, ghost_data]}) 

    ghost = Containers.find((c) => {return JSON.stringify(c.index) === JSON.stringify(ghost_data.index)}) //index 리스트들 간 동일성 체크. 즉 고스트 컨테이너와 같은 인덱스인 컨테이너 찾기.

    ghost.root.classList.add('ghost')
    
    return ghost
    //잠깐만. 고스트는 다르게 생겨야 하잖아. 어떡하지. 그냥 height를 0으로 하고, border를 퍼렇게 주고, overflow 없게 하자. 그냥 css class로 해결하면 되겠네뭐. 


    //멍청아! index를 직접 주지 말고, 그냥 같은 부모에게 자식으로 등록해야지. 그러고나서 fetcn_containers_date()를 싫행해야 할지도.
  }

  function realizeGhost() {
    ghost.root.classList.remove('ghost')
    ghost = null
  }

  /*
  ctrl shift arrow 누르던 중에 esc 눌리면, 고스트를 삭제. 

  지금 생각해보니, thots를 이 indentedThots 뷰에 맞게 컨테이너로 만들로 fetch해주는 함수는, 이 스벨트 컴포넌트에 넣거나 따로 thots_to_containers_functions.js 라이브러리에 넣어야겠다. 스토어 파일에는 thot들만 넣자. 

  그래서 이 뷰 컴포넌트에서 자체적인 displayedContainers 변수를 갖고, 그 안에 ghost를 추가하고,
  ctrl shift arrow 된 채에서 keyup되서 ghost가 realized되면 head 스토어의 thots 변수에도 추가되는 걸로 하자. 그리고 변수명을 thisHead로 하지말고, 그냥 thots로. (Head 이름).thots로 접근할 수 있게. 


  */

  setContext('createBrotherContainer', createBrotherContainer)

  let focusedContainer = null //초기값
  let focusReadyContainer = null

  function focusContainer(C) {
    if (focusedContainer) {
      focusedContainer.unfocusSelf()
    }
    focusedContainer = C
    C.focusSelf()
    //중앙에 그 컨테이너 오도록 스크롤값 고치기(IndentedThots 뷰의 경우, 패닝 대신)
    console.log(document.activeElement)
    console.log(C.contentTextarea)
    
  }

  function focusContainerAt(i) {
    let C = Containers[i]
    focusContainer(C)
  }
  setContext('focusContainerAt', focusContainerAt)

  $: if (focusReadyContainer) {
    focusContainer(focusReadyContainer)
  }


  function moveContainerFocus(index, i, key) {

    //Containers[0].root.style.border = "1px solid red"

    let max_find_repetition = 50;
    let parentIndex = "0";
    if ("1".search(/\./)<0) {
      parentIndex = index.slice(0, index.search(/.\d$/)) //index에서 마지막 .과 숫자 지워서 parentIndex 찾기
    }
    let childIndex = index + ".1"
    let c = null;
    let found = null;
    switch (key) { //이걸 Content.svelte로 옮기자
        case 'ArrowUp':
          //find and focus a brother who is above the current focused container
          //자기보다 위에 있는 컨테이너들 중, index에서 마지막 숫자만 -1한 컨테이너 찾기. findLast() 메소드로 역방향으로 찾기.
          if (parentIndex != "0") {
            for (let find = i-1; (-1 < find)&&(max_find_repetition-find >= 0)&&(Containers.length-1>=find); find--) {
              c = Containers[find]
              if (index.match(/\./g)&&c.string_index.match(/\./g)) {
                if (index.match(/\./g).length === c.string_index.match(/\./g).length 
                && c.string_index.search(parentIndex)===0 
                && c.string_index!=parentIndex) { //형제라면:
                  found = c
                  break;
                }
              }
            }
          }
          if (found === null) {//부모를 못찾는다면:
            if (-1<i-1) {
              found = Containers[i-1]
            }
            //대신 바로 아래 컨테이너를 focus
          }
          break;
        case 'ArrowDown':
          if (parentIndex != "0") { //이게 최상위라 부모가 없고 따라서 형제도 못찾는 경우가 아니라면:
            for (let find = i+1; (-1 < find)&&(find < find+max_find_repetition)&&(Containers.length-1>=find); find++) {
              c = Containers[find]
              if (index.match(/\./g)&&c.string_index.match(/\./g)) {
                if (index.match(/\./g).length === c.string_index.match(/\./g).length &&
                c.string_index.search(parentIndex)===0 
                && c.string_index!=parentIndex) { //형제라면:
                  found = c
                  break;
                }
            }
            }
          }
          if (found === null) {//아래 형제를 못찾았다면:
            if (i+1<=Containers.length-1) {
              found = Containers[i+1]
            }
            //대신 바로 아래 컨테이너를 focus
          }
          break;
        case 'ArrowLeft':
        //부모 찾기
        //자기보다 위에 있는 컨테이너들 중, index에서 마지막 숫자 제거한 스트링으로 컨테이너 찾기. 역방향으로.
          for (let find = i; (-1 < find)&&(max_find_repetition-find >= 0)&&(Containers.length-1>=find); find--) {
            c = Containers[find]
            if (c.string_index === parentIndex) { //부모 인덱스를 그대로 갖고있다면:
              found = c
              break;
            }
          }
          break;
        case 'ArrowRight':
          //자기 인덱스 +'.1', 즉 첫번째 자식을 정방향으로 찾기. 
          for (let find = i; (-1 < find)&&(find < find+max_find_repetition)&&(Containers.length-1>=find); find++) {
            c = Containers[find]
            if (c.string_index === childIndex) { //첫번째 자식이라면:
              found = c
              break;
            }
          }
          break;
      }
    if (found) {
      focusContainer(found)
    }
  }
  setContext('moveContainerFocus', moveContainerFocus)


  let continuedDown = false

  export function onCtrlShiftArrowKeydown(key) {
    console.log(key)
    console.log(continuedDown)
    if (!continuedDown) {
      continuedDown = true
    }
    else {
      return //이미 down once면 function 끝내기
    }
    switch(key) {

      case 'ArrowUp':
        ;
        break
      case 'ArrowDown':
        console.log('ghost: '+ghost)
          if (ghost) {
            ghost_data.index[ghost_data.index.length-1]++
            console.log(ghost_data.index)
          }
          else {
            createGhostContainer(
              [
                ...focusedContainer.index.slice(0,-1),
                (focusedContainer.index[focusedContainer.index.length-1]+1) 
              ]
            ) //아래 형제 만들기
          }
        break
    }
  }
  setContext('onCtrlShiftArrowKeydown', onCtrlShiftArrowKeydown)


  function onCtrlShiftArrowKeyUp(keyevent) {
    continuedDown = false
    
    console.log('ctrlshiftarrow up')
    if (ghost) {
      realizeGhost()
    }
  
  }
  setContext('onCtrlShiftArrowKeyUp', onCtrlShiftArrowKeyUp)

  function onArrowKeyUp(keyevent) {
    continuedDown = false
  }
  setContext('onArrowKeyUp', onArrowKeyUp)



  /* function foldContainerChildren(children_indexes) {
    let children = Containers.filter(c => {return c.index.search(index)>0})
    
    let children = Containers.filter(c => {return children_indexes.includes(c.index)})
    
    if (children) {
      children.style.display = "none" //토글도 해야되는데...
    }
    //잠깐만. 이러지 말자. 바로 직속 자식들 visibility만 바꿔야 해. 일부러 닫아둔 손자까지 열리면 곤란하다. 손자들도 다 여는 옵션은 따로 추가해야 해. 메뉴를 통해서든, 버튼을 통해서든 다른 ui로 행하도록 하자. 
  }
  //이거를 Containers 뒤로 옮기기. 아니 솔직히 container랑 Container랑 너무 헷갈리잖아. store에서 가져오는 데이터 변수는 이름 바꾸자. "data"같은 걸로.

  setContext('foldContainerChildren', foldContainerChildren) */


</script>

<main>
  가로축 = "conclusion-reason"
  {#each $fetchedContainers as data, i}
    <Container bind:this={Containers[i]} on:focus={focusContainer} {data} {i}/>
    <!-- <Container bind:root={Containers[i]} {container}{i}/> -->
  {/each}
  <button on:click={()=>{console.log($fetchedContainers)}}>log $fetchedContainers</button>
  <button on:click={()=>{console.log(Containers)}}>log Containers</button>
  <button on:click={()=>{console.log(ghost)}}>log ghost</button>
  <button on:click={()=>{console.log(ghost_data)}}>log ghost_data</button>
  <button on:click={()=>{realizeGhost()}}>realize ghost</button>
</main>


<style lang="stylus">
  @import "/themes/green_cozy/IndentedThotsView"
</style>

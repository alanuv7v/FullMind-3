//import { writable, derived } from "svelte/store";

//이 store.js 파일은 Head의 내용을 다루는 함수들을 모아넣는 "Head.js"로 바꾸고, Head의 내용은 각자 다른 ""Head 이름".json 파일에 담겨야 할 것이다.

export let thisHead = {
  thots: [
    {
      id: 0,
      heading: "1st",
      content: "thot 1",
      children: [1, 4],
      metadata: {},
      customMetadata: {},
    },
    { id: 1, heading: "2nd", content: "thot 1.1", children: [5] },
    { id: 2, heading: "5th", content: "thot 1.2.1", children: [3] },
    { id: 3, heading: "6th", content: "thot 1.2.1.1", children: [] },
    { id: 4, heading: "4th", content: "thot 1.2", children: [2] },
    { id: 5, heading: "3th", content: "thot 1.1.1", children: [] },
  ],
};

/*
let seedThot = thisHead.thots[0];

let max_find_repetition = 30; //한번에 찾을 thot들의 최대 개수

let fetched_times = 0

export const fetchContainers_indentedThotsView = function (seedThot) {
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
  return result;
};

// 핵심!
export let fetchedContainers = writable(
  fetchContainers_indentedThotsView(seedThot)
);
*/

/*
fetchedContainers 예시:
fetchedContainers = [
  {
    index: [1,1,1],
    thot: {id: 5, heading: '3th', content: 'thot 1.1.1', children: []}
  }
]
*/

/* 
function addMetadata(thot, metadataName, metadata) {
  let target = thisHead.thots.find((t) => {return thot.id === t.id})
  let changed = thot
  changed.metadata[metadataName] = metadata
  target = changed
}

function addCustomMetadata(thot, metadataName, metadata) {
  thot.customMetadata.metadataName = metadata
  thisHead.thots.find((t) => {return thot.id === t.id})
}

addMetadata(thisHead.thots[0], "done", true)
console.log(thisHead.thots)
 */

/* function returnFetchedContainers() {
  const result = derived(containers, $containers => $containers)
}

export const returnFetchedContainers */

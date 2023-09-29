function findfrom() {
  let max_find_repetition = 50;
  for (let find = i; 0 < find > max_find_repetition; find++) {
    find++
    let c = Containers[find]
    commonIndex = index.slice(0, index.search(/.\d$/))
    if (c.commonIndex.search(index)>-1) { //형제라면:
      break;
    }
  }
}

//Content.svelte 참고할 것
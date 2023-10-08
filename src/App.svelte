<script>
//import
  import Fontfetcher from "./Fontfetcher.svelte"
  import Header from "./Header.svelte"
  import NodeView from "./views/NodeView/NodeView.svelte"
  import MultilineTextarea from './lib/MultilineTextarea.svelte'
  import FixedContextMenu from "./FixedContextMenu.svelte"
  import {getContext, onMount} from 'svelte'

  import * as glob from './themes/green_cozy/global_variables.json';

  import { state } from "./data/states/state_01";
  import importModule from "./lib/importModule";
  import stringify from "json-stringify-pretty-compact";

  function save(content, contentType) {
    var a = document.createElement("a");
    var file = new Blob([stringify(content, {maxLength: 60, indent: 2})], {type: contentType});
  }

  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([stringify(content, {maxLength: 60, indent: 2})], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  let loadedHead
  let fetched = (async function () {
    return importModule(state.loadedHeadPath).then(obj => {
      loadedHead = obj.head;
    })
  })() //async head import


let container = {
  index: [1,1,1],
  thot: {id: 5, heading: '3th', content: 'thot 1.1.1', children: []}
}

//keyboard_toolbar
  let keyboard_toolbar;
  function locate_keyboard_toolbar() {
    keyboard_toolbar.style.top = (window.visualViewport.height - Number(getComputedStyle(keyboard_toolbar).height.match(/(\d+)/)[0])) +"px"
  }
  visualViewport.onresize = () => {
    locate_keyboard_toolbar()
  };

  onMount(() => {
    locate_keyboard_toolbar()
  })



//command_pallette
  let command_palette;

  window.onkeydown = function(e) {
    if ((e.key === "p")&&(e.altKey)) {
      if (command_palette.style.display === "none") {
        command_palette.style.display = "inline-block"
      }
      else {
        command_palette.style.display = "none"
      }
    }
  }


//debug
  
  let i = 1
  let hi = window.innerHeight
  let hi2 = window.outerHeight
  let hi3 = document.documentElement.clientHeight
  let hi4 = window.visualViewport.height



</script>

<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
<main id="App">
  <Fontfetcher />
  <FixedContextMenu />
  <div id="command_palette" bind:this={command_palette}>
    <MultilineTextarea
    placeholder={
    `command pallete...
(search a thot by typing its heading / specific prop value / directory, modify settings, ect.)`
    }
    color={glob.light}
    />
  </div>
  <Header />
  <div id="content" class="border">
    <NodeView />
  </div>
  <div id="keyboard_toolbar" bind:this={keyboard_toolbar}>
    <button>⮝</button>
    <!-- <button on:click={() => {IndentedThotsView_elem.onCtrlShiftArrowKeydown('ArrowDown')}}>⮟</button> -->
    <button>⮟</button>
    <button>⮜</button>
    <button>⮞</button>
    <button on:click={() => {download(loadedHead, loadedHead.name +'.txt', 'text/plain')}}>download this head</button>
    <button on:click={() => {}}>save this head</button>
    <button>download focused thot</button>
  </div>
  <div id='background'></div>
  <!-- <div id='test'>
    폰트 테스트
    가나다라마바사 ABCDEFG
    The quick brown fox jumps over the lazy dog
    다람쥐 헌 쳇바퀴에 타고파
    !@#$%^&*
    <div>{hi} / {hi2} / {hi3} / {hi4}</div>
  </div> -->
  
  <!-- <div id="noise"></div> -->
  
</main>


<style lang="stylus">
  @import "/themes/Space/App"
  
</style>
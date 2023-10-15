<script>
//import
  import Fontfetcher from "./Fontfetcher.svelte"
  import Header from "./Header.svelte"
  import NodeView from "./views/NodeView/NodeView.svelte"
  import MultilineTextarea from './lib/MultilineTextarea.svelte'
  import FixedContextMenu from "./FixedContextMenu.svelte"
  import Experiment from "./views/Experiment.svelte"


  import {onMount} from 'svelte'
  import {writable} from 'svelte/store'

  import * as glob from './themes/green_cozy/global_variables.json';
  
  import importModule from "./lib/importModule";
  import stringify from "json-stringify-pretty-compact";

  import * as settings from "./data/settings/settings.json"
  
  import {menuItems} from "./fixedContextMenu_store"

  let menu = [
    {name: "Head", target: null, function: () => {menuItems.set([
      {name: "Download", target: null, function:null}
    ])}},
    {name: "Thot", target: null, function: null}
  ]

  menuItems.set(menu)


function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([stringify(content, {maxLength: 60, indent: 2})], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

let head = async function () {return await import('/home/alanuv7v/FullMind-3/src/data/heads/head_1.json')}
/* importModule(settings.lastState) //state.js
.then(obj => {
  return obj.state
})
.then(state => {
  return importModule(state.loadedHeadPath) //head_1.json
});*/

let loadedHead = writable(head) 

//No need for save function, since textarea value is binded to loadedHead.thots[n].props['something']. 
//The user only needs to download the head, and then load it when the app is refreshed




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

  let experiment = true



</script>

<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
<main id="App">
  <Fontfetcher />
  
  <Header />
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
  <label>experiment?<input type="checkbox" bind:checked={experiment}></label>
  <div id="content">
    {#if experiment}
      <Experiment />
    {:else}
      {#await $loadedHead}
        <div>...Loading</div>
      {:then loadedHead} 
        <NodeView {loadedHead} />
      {:catch error}
        <p>오류가 발생했습니다.</p>
      {/await}
    {/if}
  </div>
  <div id="keyboard_toolbar" bind:this={keyboard_toolbar}>
    <button>⮝</button>
    <!-- <button on:click={() => {IndentedThotsView_elem.onCtrlShiftArrowKeydown('ArrowDown')}}>⮟</button> -->
    <button>⮟</button>
    <button>⮜</button>
    <button>⮞</button>
    <button on:click={async () => {let head = await $loadedHead; 
      download(head, head.name +'.json', 'application/json')}}>
      download this head</button>
    <button>download focused thot</button>
    <button on:click={async () => {console.log(await $loadedHead)}}>log this head</button>
    <button>
      <label>load a head... 
        <input type="file" id="file-selector" accept=".txt, .json" style="display:none" on:change={async (e) => {
          let json = await e.target.files[0].text()
          loadedHead.set(JSON.parse(json))
          console.log($loadedHead.default)
        }}>
      </label>
    </button>
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
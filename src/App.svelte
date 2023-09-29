<!-- UI 라이브러리 참고: https://joyofcode.xyz/svelte-ui-libraries
특히 요거 맘에듬 https://carbon-components-svelte.onrender.com/components/Tooltip
그 외
https://illright.github.io/attractions//docs/components/text-field
https://daisyui.com/components/

라이브러리의 장점은 잘 알겠다. 그러나 단점이 있다면?:
https://armadillo-dev.github.io/ui/ux/benefit-and-cost-of-ui-component-framework/

...결국 CSS가 중요한 상황이 오기 전까진 일단 쓰지 말자.
로직부터 짜고, 나중에 생각하자. UI 라이브러리는 미관을 고려할 때 사용하자. 지금은 미관은 제껴두자.

-->
<script>
import Fontfetcher from "./Fontfetcher.svelte"
import Header from "./Header.svelte"
import NodeView from "./views/NodeView/NodeView.svelte"
import MultilineTextarea from './lib/MultilineTextarea.svelte'
import {getContext, onMount} from 'svelte'

import * as glob from './themes/green_cozy/global_variables.json';


let container = {
  index: [1,1,1],
  thot: {id: 5, heading: '3th', content: 'thot 1.1.1', children: []}
}

let i = 1
let hi = window.innerHeight
let hi2 = window.outerHeight
let hi3 = document.documentElement.clientHeight
let hi4 = window.visualViewport.height

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

//setInterval(() => alert(hi + "/" + hi2 + "/" + hi4), 10000);

let IndentedThotsView_elem;
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

</script>


<main id="App">
  <Fontfetcher />
  <div id="keyboard_toolbar" bind:this={keyboard_toolbar}>
    <button>⮝</button>
    <button on:click={() => {IndentedThotsView_elem.onCtrlShiftArrowKeydown('ArrowDown')}}>⮟</button>
    <button>⮜</button>
    <button>⮞</button>
  </div>
  <div id="command_palette" bind:this={command_palette}>
    <MultilineTextarea
    placeholder={
    `command pallete...
(search a thot by typing its heading / specific prop value / directory, modify settings, ect.)`
    }
    color={glob.light_green}
    />
  </div>
  <Header />
  <div id="content">
    <NodeView />
  </div>
  <div id='background'></div>
  <div id='test'>
    폰트 테스트
    가나다라마바사 ABCDEFG
    The quick brown fox jumps over the lazy dog
    다람쥐 헌 쳇바퀴에 타고파
    !@#$%^&*
    asdfsaf
    <div>{hi} / {hi2} / {hi3} / {hi4}</div>
  </div>
  
  <!-- <div id="noise"></div> -->
  
</main>


<style lang="stylus">
  @import "/themes/Space/App"
  
</style>
<script>
  import {onMount, createEventDispatcher} from "svelte"
  import Two from "two.js"
  import anime from 'animejs/lib/anime.es.js';

  export let targetExtreme, sourceExtreme, page_index
  const dispatch = createEventDispatcher()

  export let line
  let wrapper
  let dotLine

  let OnHoverLength
  let PathOnHoverLength

  $: if (line && dotLine) {
    OnHoverLength = 2*(line.getBoundingClientRect().left - wrapper.getBoundingClientRect().left)
    PathOnHoverLength = 2*(line.getBoundingClientRect().left - pathWrapper.getBoundingClientRect().left)
    updatePath()
  }

  let pathWrapper;

  let two = new Two();
  let Path
  
  function updatePath() {
    two.clear()
    let points = [
      new Two.Anchor(0, 0, 0, 0, 0, 0),
      new Two.Anchor(PathOnHoverLength, 0, 0, 0, 0, 0)
    ]
    Path = two.makePath(points)
    Path.linewidth = 2
    Path.closed = false
    Path.cap = 'round'
    Path.stroke = "rgba(151, 200, 128, 1)"
    two.update()
    return Path
  }

  function PathAnim(direction) {
      let targetPath = pathWrapper.querySelector("path")
      console.log(pathWrapper)
      console.log(targetPath)
      anime({
        targets: targetPath,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "linear",
        duration: 100,
        direction: direction
      });

  }
  onMount(() => {
      two.appendTo(pathWrapper);
      updatePath()
      pathWrapper.querySelector("svg").style = 'overflow:visible'
    }
  )

  function onWrapperHover() {
    //wrapper.style.width = (OnHoverLength + 'px')
    //updatePath()
    PathAnim('normal')


  }
  function onWrapperNotHover() {
    //wrapper.style.width = '100%'
    PathAnim('reverse')
  }
  
  
</script>


<button class="dot-line-wrapper" 
bind:this={wrapper}
on:click={() => {dispatch("expandRelationExtreme", targetExtreme)}}
on:mouseenter={()=>{onWrapperHover()}}
on:mouseleave={()=>{onWrapperNotHover()}}>
  <div class="target-extreme extreme">{targetExtreme}</div>
  <button class="dot-line" bind:this={dotLine}></button>
  
  <div id="dot">
    <div id="pathWrapper" bind:this={pathWrapper}></div>
  </div>
  
  <div class="source-extreme extreme">{sourceExtreme}</div>
</button>

<style lang="stylus">
@import "../../themes/green_cozy/global_variables"
* {
  box-sizing: border-box;
}
wrapper * {

  pointer-events: none;
}
#dot {
  position:relative;

  background-color: vivid_green;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  border: none;
  box-shadow: none;

}
#pathWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
}
svg {
  position: absolute;
  transition: none !important; 
}
svg * {
  transition: none !important; 
} 
.dot-line-wrapper {

  /*display: flex;
  flex-direction: column;*/

  transition: all 0.5s ease;
  width: 100%;
  
  height: 100%;
  padding: 15px;
  border: 2px solid gray;
  background: none;
  box-shadow: none;

  &:hover {
    /*width: 200px;*/
    #dot, .dot-line {
      background-color: vivid_green;
    }
  }
  &:not(:hover) {
    border-color: transparent !important;
    outline-color: transparent !important;
    .extreme {
      color: transparent;
    }
    #dot, .dot-line {
      background-color: gray;
    }
  }
}
&:hover {
  border-color: gray;
  #dot, .dot-line {
    background-color: gray;
  }
}
.target-extreme {
  margin-left: auto;
}
.source-extreme {
  margin-right: auto;
}
.dot-line {
  background-color: transparent;
  width: 100%;
  height: 6px;
  border-radius: 100px;
  border: none;
  background: none;
  box-shadow: none;

  display: none;
  
}
</style>
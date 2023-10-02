<script>
  export let data

</script>
<div class="entry">
  {input}
  <div id="util">
    <button id="addProp">+</button>
    <button id="delProp">-</button>
  </div>
</div>

<style>
  .entry {
    display: flex;
    flex-direction: row;
  }
  #util {
    display: flex;
    flex-direction: column;
  } 
</style>
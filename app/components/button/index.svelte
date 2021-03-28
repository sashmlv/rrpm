<script>
   export let name;
   export let className;
</script>

<style>
   .start {
      position: absolute;
      bottom: 2%;
      left: 2%;
      padding: 0 15%;
   }
   .stop {
      position: absolute;
      bottom: 2%;
      right: 2%;
      padding: 0 15%;
   }
</style>

<button class='btn btn-sm {className}'>{name}</button>

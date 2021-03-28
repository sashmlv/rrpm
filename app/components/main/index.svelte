<script>
   import Button from 'components/button';
</script>

<style>
   .main {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2%;
   }
</style>

<div class='main'>
   <div class='bar'>
      <div class='bar-item tooltip' data-tooltip='70%' style='width:70%;'>70%</div>
   </div>
   <Button className={'start btn-success'} name={'start'}/>
   <Button className={'stop btn-error'} name={'stop'}/>
</div>

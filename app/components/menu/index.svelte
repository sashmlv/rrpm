<script>
   import { Router, Link, Route } from 'svelte-routing';
   import Home from '../home';
   import About from '../about';
   export let url = '';
</script>

<style>
</style>

<Router url='{url}'>
   <nav>
      <Link to='/'>Home</Link>
      <Link to='about'>About</Link>
   </nav>
   <div>
      <Route path='about' component='{About}' />
      <Route path='/'><Home /></Route>
   </div>
</Router>

import '../node_modules/spectre.css/dist/spectre.min.css';
import './styles.css';
import App from './App.svelte';
// import { ssr } from './stores';

const app = new App( {

   target: document.getElementById( 'app' )
} );

window.app = app;

export default app;

<script lang="ts">
  import Nav from '$lib/Nav.svelte';
  import '../app.css';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<Nav />

<main>
  {@render children?.()}
</main>

<footer>
  <p>Built with <a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte</a> and <a href="https://www.vexflow.com" target="_blank" rel="noreferrer">VexFlow</a></p>
</footer>

<style>
  main {
    width: 100%;
    min-height: 100vh;
  }

  footer {
    margin-top: 56px;
    text-align: center;
    font-size: 0.875rem;
    color: #86868b;
  }
  
  footer a {
    color: #007AFF;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
</style>

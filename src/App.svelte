<script lang="ts">
  import { onMount } from 'svelte';
  import NotationControl from './lib/NotationControl.svelte';
  import Nav from './lib/Nav.svelte';
  import NotePage from './lib/NotePage.svelte';
  import type { NoteKey } from './lib/types';

  let currentPath = '/';
  let activeNote: NoteKey | null = null;

  const handleNavigation = () => {
    currentPath = window.location.pathname;
    const match = currentPath.match(/^\/note\/([A-G])$/);
    activeNote = match ? match[1] as NoteKey : null;
  };

  onMount(() => {
    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  });

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.href.startsWith(window.location.origin)) {
      e.preventDefault();
      const url = new URL(anchor.href);
      window.history.pushState({}, '', url.pathname);
      handleNavigation();
    }
  };
</script>

<main on:click={handleClick}>
  <Nav {activeNote} />
  
  <div class="app-container">
    {#if currentPath === '/'}
      <header>
        <h1>Music Notation</h1>
        <p>Select a note to hear how it sounds</p>
      </header>
      
      <NotationControl />
    {:else if activeNote}
      <NotePage noteName={activeNote} />
    {/if}
    
    <footer>
      <p>Built with <a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte</a> and <a href="https://www.vexflow.com" target="_blank" rel="noreferrer">VexFlow</a></p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f5f5f7;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #1d1d1f;
    line-height: 1.5;
  }
  
  main {
    width: 100%;
    min-height: 100vh;
  }
  
  .app-container {
    width: 100%;
    max-width: 900px;
    padding: 24px 16px;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: #1d1d1f;
  }
  
  header p {
    font-size: 1.125rem;
    color: #6e6e73;
    margin-top: 8px;
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
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    header p {
      font-size: 1rem;
    }
    
    .app-container {
      padding: 16px 12px;
    }
  }
</style>
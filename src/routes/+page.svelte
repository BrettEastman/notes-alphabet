<script lang="ts">
  import NotationControl from '$lib/NotationControl.svelte';
</script>

<div class="app-container">
  <header>
    <h1>Music Notation</h1>
    <p>Select a note to hear how it sounds</p>
  </header>
  
  <NotationControl />
</div>

<style>
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

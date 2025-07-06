<script lang="ts">
  import { onMount } from 'svelte';
  import NotationRenderer from './NotationRenderer.svelte';
  import { playNote, initAudio } from './audio';
  import { noteData } from './notes';
  import type { NoteKey } from './types';

  export let noteName: NoteKey;
  
  let audioInitialized = false;
  let currentNote = noteData[noteName];
  
  // Update currentNote when noteName changes
  $: currentNote = noteData[noteName];
  
  onMount(async () => {
    try {
      await initAudio();
      audioInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  });
  
  const handlePlay = async () => {
    if (!audioInitialized) {
      await initAudio();
      audioInitialized = true;
    }
    playNote(currentNote.fullName);
  };
</script>

<div class="note-page">
  <h2>Note {currentNote.name}</h2>
  
  <div class="note-content">
    <div class="notation-wrapper">
      <NotationRenderer activeNote={noteName} showAllNotes={false} width={300} height={120} />
    </div>
    
    <div class="note-info">
      <p>Frequency: {currentNote.frequency} Hz</p>
      <p>Octave: {currentNote.octave}</p>
      <button class="play-button" on:click={handlePlay}>
        Play Note {currentNote.name}
      </button>
    </div>
  </div>
</div>

<style>
  .note-page {
    padding: 32px 16px;
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2rem;
    color: var(--color-text-primary);
    margin-bottom: 24px;
  }

  .note-content {
    background-color: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-md);
  }

  .notation-wrapper {
    margin-bottom: 24px;
  }

  .note-info {
    color: var(--color-text-secondary);
    font-size: 1.1rem;
  }

  .note-info p {
    margin-bottom: 12px;
  }

  .play-button {
    background-color: var(--color-primary);
    color: white;
    padding: 12px 24px;
    border-radius: var(--border-radius-md);
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    margin-top: 16px;
  }

  .play-button:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
  }

  .play-button:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    .note-page {
      padding: 24px 12px;
    }

    h2 {
      font-size: 1.75rem;
    }
  }
</style>
<script lang="ts">
  import { noteKeys } from './notes';
  
  export let activeNote: string | null = null;
  
  let dropdownOpen = false;
  
  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
  };
  
  const closeDropdown = () => {
    dropdownOpen = false;
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      closeDropdown();
    }
  };
</script>

<svelte:window on:click={handleClickOutside} />

<nav>
  <div class="nav-container">
    <a href="/" class="nav-title" on:click={closeDropdown}>
      Text To Note
    </a>
    
    <div class="dropdown" class:open={dropdownOpen}>
      <button 
        class="dropdown-toggle" 
        class:active={activeNote !== null}
        on:click={toggleDropdown}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        Notes
        <svg class="dropdown-arrow" class:rotated={dropdownOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      
      {#if dropdownOpen}
        <div class="dropdown-menu">
          {#each noteKeys as note}
            <a 
              href="/note/{note}" 
              class="dropdown-item" 
              class:active={activeNote === note}
              on:click={closeDropdown}
            >
              Note {note}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
  
  nav {
    background-color: var(--color-bg-secondary);
    box-shadow: var(--shadow-md);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #e5e5e7;
  }

  .nav-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    position: relative;
  }

  .nav-title {
    font-family: 'Cinzel', 'Musica', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: color 0.2s ease;
    letter-spacing: 0.5px;
  }

  .nav-title:hover {
    color: var(--color-primary-dark);
    text-decoration: none;
  }

  .dropdown {
    position: relative;
    margin-left: auto;
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: transparent;
    color: var(--color-text-secondary);
    border: 2px solid #e5e5e7;
    border-radius: var(--border-radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;
  }

  .dropdown-toggle:hover {
    background-color: var(--color-bg-tertiary);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .dropdown-toggle.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }

  .dropdown-arrow {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background-color: var(--color-bg-secondary);
    border: 1px solid #e5e5e7;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 140px;
    overflow: hidden;
    animation: slideDown 0.15s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: block;
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
    border-bottom: 1px solid #f5f5f7;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .dropdown-item:hover {
    background-color: var(--color-bg-tertiary);
    color: var(--color-primary);
    text-decoration: none;
  }

  .dropdown-item.active {
    background-color: var(--color-primary);
    color: white;
  }

  .dropdown-item.active:hover {
    background-color: var(--color-primary-dark);
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 0 var(--spacing-sm);
      height: 56px;
    }

    .nav-title {
      font-size: 1.5rem;
    }

    .dropdown-toggle {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: 0.9rem;
    }

    .dropdown-menu {
      min-width: 120px;
    }
  }

  @media (max-width: 480px) {
    .nav-title {
      font-size: 1.25rem;
    }
  }
</style>
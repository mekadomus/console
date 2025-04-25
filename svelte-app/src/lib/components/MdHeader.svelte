<script lang="ts">
  import { page } from '$app/stores';

  import MdLocalePicker from '@components/MdLocalePicker.svelte';
</script>

<header>
  <a href={`/${$page.params.lang}/`}>
    <img alt="Mekadomus logo" src="/header-logo.png" width="150" height="85" />
  </a>
  <MdLocalePicker />
</header>

<style>
  header {
    border-bottom: 2px solid var(--primary-color);
    color: var(--secondary-color-weak);
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
  }
</style>

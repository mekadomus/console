<script lang="ts">
  import MdLocalePicker from '@components/MdLocalePicker.svelte';
  import { localizedHref } from '../utils/Lang';
</script>

<header>
  <a href={localizedHref('/')}>
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

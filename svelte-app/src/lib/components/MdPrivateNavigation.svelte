<script lang="ts">
  import { localizedHref } from '@utils/Lang';
</script>

<nav>
  <span><a href={localizedHref('/dashboard')}>Dashboard</a></span>
  <span><a href={localizedHref('/meter/new')}>Create Fluid Meter</a></span>
</nav>

<style>
  nav {
    font-size: 0.9em;
    border-bottom: 1px solid var(--primary-color);
    display: flex;
  }

  span a {
    display: block;
    padding: 0.5rem;
    text-decoration: none;
    color: var(--primary-color);
  }

  span:hover a {
    background-image: linear-gradient(rgb(0 0 0/10%) 0 0);
  }
</style>

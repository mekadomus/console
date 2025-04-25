<script lang="ts">
  import { page } from '$app/stores';
</script>

<nav>
  <span><a href={`/${$page.params.lang}/dashboard`}>Dashboard</a></span>
  <span><a href={`/${$page.params.lang}/meter/new`}>Create Fluid Meter</a></span>
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

<script lang="ts">
  import { page } from '$app/stores';

  let text = $state('');
  let link = $state('');

  $effect(() => {
    const parts = $page.url.pathname.split('/');
    if ($page.params.lang === 'es') {
      text = 'English';
      parts[1] = 'en';
    } else {
      text = 'Español';
      parts[1] = 'es';
    }
    link = parts.join('/');
  });
</script>

<a href={link}>
  <img src="/icons/globe.svg" alt="Locale selector" />
  <span>{text}</span>
</a>

<style>
  a {
    text-decoration: none;
    color: var(--primary-color);
  }

  img {
    width: 20px;
    height: 20px;
  }

  img,
  span {
    vertical-align: middle;
  }
</style>

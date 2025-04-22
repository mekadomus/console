import { page } from '$app/stores';

export function localizedHref(href: string): string {
  let lang;
  page.subscribe((value) => {
    lang = value.params.lang;
  });
  return `/${lang}${href}`;
}

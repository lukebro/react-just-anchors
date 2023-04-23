import { navigate } from 'wouter/use-location';

addEventListener('click', function (event) {
  const target = event.target;

  if (
    !(target instanceof HTMLAnchorElement) ||
    !target.href ||
    event.defaultPrevented
  ) {
    return;
  }

  const url = new URL(target.href);
  if (location.origin !== url.origin) {
    return;
  }

  let n: HTMLElement | null = target;
  while (n) {
    if (n.dataset.reload) {
      return;
    }
    n = n.parentElement;
  }

  event.preventDefault();
  navigate(target.href);
});

# Routing with Just Anchors in React

I recently experimented with [SvelteKit](https://kit.svelte.dev) and one thing that stood out to me was that it uses regular `<a>` tags for routing. It uses `data` attributes to control the behavior, but at its core, it's just a standard anchor tag.

In React, we often use a `<Link>` component provided by routing libraries and frameworks like [Next.js Link](https://nextjs.org/docs/api-reference/next/link) or [Remix/react-router Link](https://remix.run/docs/en/main/components/link). But why do we need a separate component for this?

```jsx
// before
<Link href="/page/one">Page One</Link>

// after
<a href="/page/one">Page One</a>
```

There are several benefits to using regular anchor tags for routing in React:

1. 3rd party UI libraries don't need to be aware of your router, making integration easy (["it just works"](https://mui.com/material-ui/guides/routing/#global-theme-link)).
1. Non-React rendered markup can still interact with the router and trigger client-side navigation. For example, if you have a widget or editorial content (CMS) that includes links to other pages.
1. You don't lose any behavior, as components rendering the anchor tags can still attach `onClick` handlers and prevent default behavior using `e.preventDefault()`.
1. You can easily revert the anchor tag to its standard behavior by using a `data` attribute, similar to SvelteKit, to force a reload or hard page refresh (`data-reload` in this demo).
1. You can still have "active" state by using a `useLocation` hook, just like before, eliminating the need for a `<NavLink>` component (nothing changes here).

I haven't come across this approach in React yet, and I'm not sure if it was possible due to SyntheticEvents (works with React 17 and 18), so I created a demo repository to test it (it works).

## Ideas against

The only potential drawback I can think of is that if it's very easy to implement and you want this type of behavior, you could just do it yourself by integrating with the router provided by your framework.

## Goal

I would like someone to explain to me why this might not be a good idea, or perhaps encourage a framework to adopt this approach and follow the example set by SvelteKit, possibly by providing a global hook to enable it.

## Implementation

The implementation in the demo repository is a quick and naive one, but it works. I used [`wouter`](https://github.com/molefrog/wouter) as the client-side router, as I didn't want to reinvent basic `path-to-regex` functionality and sync React and the History API.

The relevant files for this exploration are:

 - [`src/just-anchors.ts`](./src/just-anchors.ts)
 - [`src/Nav.tsx`](./src/Nav.tsx)


A naive implementation is basically ~30 lines:

```jsx
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
```

## How to run

```
npm install
npm run dev
```

## Acknowledgements

I drew inspiration from [SvelteKit](https://kit.svelte.dev/) for this idea.

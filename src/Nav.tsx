import { useLocation } from "wouter";

export default function Nav() {
  const [location] = useLocation();

  return (
    <nav className="nav">

      {/* Active class example. */}
      <a href="/" className={location === '/' ? 'active' : ''}>
        Home
      </a>

      {/* Regular example. */}
      <a href="/page/one">
        Page One
      </a>

      {/* Full URL example. */}
      <a href="http://localhost:5173/page/two">
        Page Two
      </a>

      {/* Reloading example. */}
      {/* Or put it on anchor directly. */}
      <span data-reload>
        <a href="/page/three">
          Page Three
        </a>
      </span>

      {/* Preventing default behavior example. */}
      <a onClick={(e) => {
        alert("I prevented the default behavior of the link!");
        e.preventDefault();
      }} href="/page/three">
        Prevented
      </a>

      {/* External link example. */}
      <a href="https://google.com">
        External Link
      </a>
    </nav >
  );
}
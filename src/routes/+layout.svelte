<nav>
  <a href="/">Home</a>
</nav>

<main>
  <slot />
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
  }

  nav {
    background-color: blanchedalmond;
    padding: 1em;
  }

  a {
    color: #333;
    text-decoration: none;
  }
</style>

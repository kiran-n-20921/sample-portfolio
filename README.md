# Alex Carter · Portfolio

A modern, responsive, single-page portfolio website built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## ✨ Features

- 🎨 **Dark / Light theme** with localStorage persistence
- 📱 **Fully responsive** — mobile-first design with a hamburger menu
- ⌨️ **Typed text effect** in the hero section
- 🌀 **Scroll-reveal animations** powered by IntersectionObserver
- 🧭 **Smooth-scrolling** navigation
- 📬 **Validated contact form** (client-side)
- ♿ **Accessible** semantic HTML, ARIA labels, keyboard friendly
- ⚡ **Zero dependencies** — pure HTML/CSS/JS

## 📁 Project Structure

```
TestApp/
├── index.html      # Markup & content
├── styles.css      # Design system + responsive layout
├── script.js       # Interactivity (theme, typing, reveal, form)
└── README.md
```

## 🚀 Run Locally

Just open `index.html` in your browser, or serve it with any static server:

```bash
# Python
python3 -m http.server 5500

# Node (npx)
npx serve .
```

Then visit http://localhost:5500.

## 🛠️ Customize

| What | Where |
|------|-------|
| Name, bio, social links | `index.html` (hero & about sections) |
| Projects | `index.html` → `#projects` section |
| Skills | `index.html` → `#skills` section |
| Experience timeline | `index.html` → `#experience` |
| Colors / theme | `styles.css` → `:root` and `[data-theme="light"]` |
| Typed phrases | `script.js` → `phrases` array |
| Form handler | `script.js` → `form.addEventListener('submit', ...)` |

## 📨 Hooking Up the Contact Form

The form currently simulates a submission. To make it real, swap the `setTimeout` in `script.js` with a `fetch()` call to your backend, or use a service like [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com), or [Netlify Forms](https://docs.netlify.com/forms/setup/).

```js
await fetch('https://formspree.io/f/your-id', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: data
});
```

## 📄 License

MIT — feel free to use this as a starting point for your own portfolio.

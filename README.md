ArarA UI — UI Design System

Utility-first CSS toolkit and Sass source for Fintech Point products.

Short summary

- Sass source: `src/scss/` (mixins, variables, components, utilities).
- Compiled distributable: `dist/css/style.css` (production-ready, minified).
- Documentation: `documentation/` (examples, usage, component demos).

Requirements

- Node.js v14+ and npm
- Development dependency: `sass` (already declared in `devDependencies`)

Quick start

Clone and install:

```bash
git clone https://github.com/FazleRabbiBindu/arara.git
cd arara
npm install
```

Development build (expanded with source maps):

```bash
npm run build:dev
```

Production build (minified):

```bash
npm run build
```

Watch mode (auto-rebuild on save):

```bash
npm run watch
```

After building you will find the compiled CSS at:

```
dist/css/style.css
```

Usage examples

Via CDN (from npm via jsDelivr or unpkg — works after publishing to npm):

```html
<!-- pinned to published version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/arara-ui@0.1.4/dist/css/style.css">
<!-- or via unpkg -->
<link rel="stylesheet" href="https://unpkg.com/arara-ui@0.1.4/dist/css/style.css">
```

JSDelivr (serve from GitHub release or tag):

```html
<!-- replace the tag with the release/tag you pushed (example: v0.1.4) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FazleRabbiBindu/arara@v0.1.4/dist/css/style.css">
```

Stable channel (recommended for production)

```html
<!-- use the `stable` dist-tag (you control when this moves) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/arara-ui@stable/dist/css/style.css">
<!-- or via unpkg -->
<link rel="stylesheet" href="https://unpkg.com/arara-ui@stable/dist/css/style.css">
<!-- or from GitHub if you push a `stable` tag -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FazleRabbiBindu/arara@stable/dist/css/style.css">
```

Note: `@stable` is a dist-tag you manage with `npm dist-tag add` or by publishing with `--tag stable`. It gives you a controlled, stable CDN channel for production.

Via NPM (after publishing):

```bash
npm i arara-ui
```

### Import via JavaScript (ESM)
Automatically injects styles into the document head:

```javascript
import aru from 'arara-ui';

// aru.cssUrl contains the URL to the stylesheet
// aru.inject() can be called manually if needed
```

### Import via JavaScript (CommonJS)
```javascript
const aru = require('arara-ui');
```

Or just import the CSS directly in your bundler:
```javascript
import 'arara-ui/css';
```



Contributing

1. Fork and create a branch.
2. Run `npm install` and `npm run build:dev` to preview changes.
3. Open a PR with screenshots or examples when relevant.

License

This project is licensed under the MIT License — see the `LICENSE` file.

Contact

For issues and support contact `info@fintech-point.com` or open an issue on the repository.
 
## Credits

- **Author:** Md. Fazla Rabbi Bindu <fazlerabbibindu@gmail.com>
- **Maintainer:** Fintech Point (info@fintech-point.com)

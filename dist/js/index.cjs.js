/**
 * CJS entry for arara-ui
 * Injects the CSS into the document head and exports a tiny API.
 */

let cssUrl;
try {
  // Bundlers like Webpack/Vite often resolve this to a URL string
  cssUrl = require('../css/style.css');
} catch (e) {
  // Fallback for Node environments or simpler setups
  // This path is relative to the package root or expected node_modules location
  cssUrl = 'arara-ui/dist/css/style.css';
}

/**
 * Injects the CSS link tag into the document head.
 * @returns {string|null} The URL of the injected CSS.
 */
function inject() {
  if (typeof document === 'undefined') return cssUrl;
  
  // Prevent duplicate injection
  if (document.querySelector('link[data-arara-style]')) return cssUrl;
  
  try {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.setAttribute('data-arara-style', '');
    document.head.appendChild(link);
    return cssUrl;
  } catch (e) {
    return null;
  }
}

// Auto-inject on require if in a browser environment
if (typeof document !== 'undefined') {
  try {
    inject();
  } catch (e) {}
}

module.exports = {
  cssUrl: cssUrl,
  inject: inject,
};

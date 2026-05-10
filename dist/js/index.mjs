/**
 * ESM entry for arara-ui
 * Injects the CSS into the document head and exports a tiny API.
 */

const cssUrl = new URL('../css/style.css', import.meta.url).href;

/**
 * Injects the CSS link tag into the document head.
 * @returns {string} The URL of the injected CSS.
 */
export function inject() {
  if (typeof document === 'undefined') return cssUrl;
  
  // Prevent duplicate injection
  if (document.querySelector('link[data-arara-style]')) return cssUrl;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssUrl;
  link.setAttribute('data-arara-style', '');
  document.head.appendChild(link);
  
  return cssUrl;
}

// Auto-inject on import if in a browser environment
if (typeof document !== 'undefined') {
  try {
    inject();
  } catch (e) {
    console.error('arara-ui: Failed to auto-inject styles', e);
  }
}

export default {
  cssUrl,
  inject,
};

export { cssUrl };

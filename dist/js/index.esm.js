// ESM entrypoint for arara-ui
const cssUrl = new URL('../css/style.css', import.meta.url).href;

function injectCSS(href = cssUrl) {
  if (typeof document === 'undefined') return null;
  if (document.querySelector(`link[href="${href}"]`)) return href;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
  return href;
}

const aru = {
  css: cssUrl,
  inject: () => injectCSS(cssUrl),
};

// Auto-inject on import when running in a browser environment
if (typeof document !== 'undefined') {
  try { injectCSS(); } catch (e) { /* ignore */ }
}

export default aru;
export { injectCSS };

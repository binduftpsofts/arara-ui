/**
 * ArarA Documentation — Shared Navigation Renderer
 * =================================================
 * Injects the full 14-page sidebar navigation into any page that has
 * a <div id="nav-placeholder" data-active="page-id" data-root="../../"></div>
 *
 * data-active : the page key (e.g. "installation", "colors")
 * data-root   : relative path back to the project root
 *               "../../" for pages in documentation/pages/
 *               "./"    for index.html at the project root
 */

(function () {
  const NAV_HTML = /* html */`
<div class="drawer-header">
  <span class="text-xl font-bold tracking-tight text-slate-900">Navigation</span>
  <button id="closeDrawer" class="p-2 -mr-2 text-slate-500 hover:text-slate-900 transition-colors">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
</div>
<div class="drawer-content p-6">
  <nav class="flex flex-col gap-1">

    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 mt-2 px-2">Getting Started</p>
    <a href="{root}index.html"                              data-page="introduction"  class="nav-link">Introduction</a>
    <a href="{root}documentation/pages/installation.html"  data-page="installation"  class="nav-link">Installation</a>

    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 mt-6 px-2">Core Concepts</p>
    <a href="{root}documentation/pages/colors.html"        data-page="colors"        class="nav-link">Colors &amp; Theming</a>
    <a href="{root}documentation/pages/typography.html"    data-page="typography"    class="nav-link">Typography</a>

    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 mt-6 px-2">Layout &amp; Spacing</p>
    <a href="{root}documentation/pages/spacing.html"       data-page="spacing"       class="nav-link">Spacing</a>
    <a href="{root}documentation/pages/flexbox.html"       data-page="flexbox"       class="nav-link">Display &amp; Flexbox</a>
    <a href="{root}documentation/pages/grid.html"          data-page="grid"          class="nav-link">Grid System</a>

    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 mt-6 px-2">Visuals</p>
    <a href="{root}documentation/pages/borders.html"       data-page="borders"       class="nav-link">Borders &amp; Radius</a>
    <a href="{root}documentation/pages/shadows.html"       data-page="shadows"       class="nav-link">Shadows &amp; Elevation</a>
    <a href="{root}documentation/pages/transitions.html"   data-page="transitions"   class="nav-link">Transitions &amp; Animation</a>
    <a href="{root}documentation/pages/glassmorphism.html" data-page="glassmorphism" class="nav-link">Glassmorphism</a>

    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 mt-6 px-2">Responsive</p>
    <a href="{root}documentation/pages/responsive.html"    data-page="responsive"    class="nav-link">Breakpoints</a>

    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 mt-6 px-2">Advanced</p>
    <a href="{root}documentation/pages/positioning.html"   data-page="positioning"   class="nav-link">Z-Index &amp; Positioning</a>
    <a href="{root}documentation/pages/customization.html" data-page="customization" class="nav-link">Customization</a>

  </nav>
</div>
`;

  document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    const activePage = placeholder.dataset.active || '';
    const root       = placeholder.dataset.root   || './';

    // Inject nav HTML with the correct root path
    placeholder.innerHTML = NAV_HTML.replaceAll('{root}', root);

    // Apply base styles to all links
    placeholder.querySelectorAll('.nav-link').forEach(link => {
      link.className = 'nav-link p-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors block text-sm';
    });

    // Highlight the active page
    if (activePage) {
      const activeLink = placeholder.querySelector(`[data-page="${activePage}"]`);
      if (activeLink) {
        activeLink.className = 'nav-link p-2 px-3 rounded-lg bg-indigo-50 font-semibold text-indigo-600 transition-colors block text-sm';
      }
    }

    // Wire up the close drawer button that was just injected
    const closeBtn = placeholder.querySelector('#closeDrawer');
    const drawer   = document.getElementById('sidebarDrawer');
    const backdrop = document.getElementById('drawerBackdrop');

    function toggleDrawer() {
      drawer?.classList.toggle('is-open');
      backdrop?.classList.toggle('is-active');
      document.body.classList.toggle('drawer-open');
    }

    closeBtn?.addEventListener('click', toggleDrawer);
    backdrop?.addEventListener('click', toggleDrawer);

    // Also wire open button (it lives outside the placeholder)
    document.getElementById('openDrawer')?.addEventListener('click', toggleDrawer);

    // Close on mobile link click
    placeholder.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) toggleDrawer();
      });
    });
  });
})();

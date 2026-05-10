// scripts/main.js - Global interactions for ArarA documentation

document.addEventListener('DOMContentLoaded', () => {
  const openDrawerBtn = document.getElementById('openDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawer');
  const drawer = document.getElementById('sidebarDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const body = document.body;

  function toggleDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.toggle('is-open');
    backdrop.classList.toggle('is-active');
    body.classList.toggle('drawer-open');
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', toggleDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', toggleDrawer);
  if (backdrop) backdrop.addEventListener('click', toggleDrawer);

  // Close drawer when clicking a link (on mobile)
  const navLinks = drawer?.querySelectorAll('a');
  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        toggleDrawer();
      }
    });
  });
});

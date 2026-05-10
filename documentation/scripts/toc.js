// scripts/toc.js - Table of Contents logic

document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.toc-tree a');
  
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active class from all links
      tocLinks.forEach(l => l.classList.remove('is-active'));
      // Add active class to clicked link
      link.classList.add('is-active');

      // Highlight target heading
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Find the heading inside the target element or the element itself if it's a heading
        const heading = targetElement.matches('h1, h2, h3') ? targetElement : targetElement.querySelector('h1, h2, h3');
        
        if (heading) {
          heading.classList.remove('heading-highlight');
          void heading.offsetWidth; // Trigger reflow
          heading.classList.add('heading-highlight');
        }
      }
    });
  });
});

/* ============================================================
   blog.js – Practicum Experience Page Interactivity
   Vanilla JS · No frameworks · Works alongside main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. Scroll Progress Bar
  ---------------------------------------------------------- */
  const progressBar = document.querySelector('#scroll-progress');

  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${percent}%`;
  };

  /* ----------------------------------------------------------
     2. Intersection Observer – Reveal Animations
  ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '-60px' }
  );

  const initReveals = () => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealEls.forEach(el => revealObserver.observe(el));

    // Stagger children – add incremental transition delay
    document.querySelectorAll('.stagger-children').forEach(container => {
      [...container.children].forEach((child, i) => {
        child.style.transitionDelay = `${i * 90}ms`; // ~80-100ms range
        revealObserver.observe(child);
      });
    });
  };

  /* ----------------------------------------------------------
     3. Section Navigation Dots
  ---------------------------------------------------------- */
  const slides = document.querySelectorAll('.prac-slide');
  const slideNav = document.querySelector('.slide-nav');
  const dots = slideNav ? slideNav.querySelectorAll('[data-slide]') : [];

  const updateActiveDot = () => {
    if (!slides.length || !dots.length) return;

    let bestIndex = 0;
    let bestVisibility = -Infinity;

    slides.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visible > bestVisibility) {
        bestVisibility = visible;
        bestIndex = i;
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === bestIndex);
    });
  };

  // Dot click → smooth scroll
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slide, 10);
      slides[idx]?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Tooltip on hover (show section name from data-tooltip)
  dots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      const tip = dot.dataset.tooltip;
      if (tip) dot.setAttribute('aria-label', tip);
    });
  });

  /* ----------------------------------------------------------
     4. Document Modal
  ---------------------------------------------------------- */
  const docModal = document.querySelector('.doc-modal');
  const docCards = document.querySelectorAll('.doc-card');
  const docImg = document.querySelector('#doc-modal-img');
  const docTitle = document.querySelector('.doc-modal-title');
  const docClose = document.querySelector('.doc-modal-close');
  const docPrev = document.querySelector('.doc-modal-prev');
  const docNext = document.querySelector('.doc-modal-next');
  const docCounter = document.querySelector('.doc-modal-counter');

  let docImages = [];
  let docIndex = 0;

  const showDocImage = () => {
    if (!docImg || !docImages.length) return;
    docImg.src = docImages[docIndex];
    if (docCounter) docCounter.textContent = `${docIndex + 1} / ${docImages.length}`;
  };

  const openDocModal = (card) => {
    const raw = card.dataset.images || '';
    docImages = raw.split(',').map(s => s.trim()).filter(Boolean);
    docIndex = 0;
    if (docTitle) docTitle.textContent = card.dataset.title || '';
    showDocImage();
    docModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDocModal = () => {
    docModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  docCards.forEach(card => card.addEventListener('click', () => openDocModal(card)));
  docClose?.addEventListener('click', closeDocModal);
  docPrev?.addEventListener('click', () => { docIndex = (docIndex - 1 + docImages.length) % docImages.length; showDocImage(); });
  docNext?.addEventListener('click', () => { docIndex = (docIndex + 1) % docImages.length; showDocImage(); });

  // Close on backdrop click
  docModal?.addEventListener('click', (e) => {
    if (e.target === docModal) closeDocModal();
  });

  /* ----------------------------------------------------------
     5. Gallery Lightbox
  ---------------------------------------------------------- */
  const lightbox = document.querySelector('.gallery-lightbox');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lbImg = document.querySelector('#gallery-lightbox-img');
  const lbClose = document.querySelector('.gallery-lightbox-close');
  const lbPrev = document.querySelector('.gallery-lightbox-prev');
  const lbNext = document.querySelector('.gallery-lightbox-next');
  const lbCounter = document.querySelector('.gallery-lightbox-counter');
  const lbCaption = document.querySelector('.gallery-lightbox-caption');

  // Collect image sources and captions
  const gallerySources = [];
  const galleryCaptions = [];
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      gallerySources.push(img.src || img.dataset.src || '');
      galleryCaptions.push(img.alt || '');
    }
  });

  let lbIndex = 0;

  const showLbImage = () => {
    if (!lbImg || !gallerySources.length) return;
    lbImg.src = gallerySources[lbIndex];
    if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${gallerySources.length}`;
    if (lbCaption) lbCaption.textContent = galleryCaptions[lbIndex] || '';
  };

  const openLightbox = (index) => {
    lbIndex = index;
    showLbImage();
    lightbox?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => { lbIndex = (lbIndex - 1 + gallerySources.length) % gallerySources.length; showLbImage(); });
  lbNext?.addEventListener('click', () => { lbIndex = (lbIndex + 1) % gallerySources.length; showLbImage(); });

  // Close on backdrop click
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ----------------------------------------------------------
     Shared Keyboard Controls (Modal + Lightbox)
  ---------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    // Document modal
    if (docModal?.classList.contains('active')) {
      if (e.key === 'Escape') closeDocModal();
      if (e.key === 'ArrowLeft')  { docIndex = (docIndex - 1 + docImages.length) % docImages.length; showDocImage(); }
      if (e.key === 'ArrowRight') { docIndex = (docIndex + 1) % docImages.length; showDocImage(); }
      return;
    }
    // Gallery lightbox
    if (lightbox?.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + gallerySources.length) % gallerySources.length; showLbImage(); }
      if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % gallerySources.length; showLbImage(); }
    }
  });

  /* ----------------------------------------------------------
     6. Workflow Step Animation
  ---------------------------------------------------------- */
  const workflowSteps = document.querySelectorAll('.workflow-step');
  const workflowConnectors = document.querySelectorAll('.workflow-connector');

  const workflowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Activate the connector leading to this step
          const idx = [...workflowSteps].indexOf(entry.target);
          if (idx > 0 && workflowConnectors[idx - 1]) {
            workflowConnectors[idx - 1].classList.add('active');
          }
          workflowObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '-40px' }
  );

  workflowSteps.forEach((step, i) => {
    step.style.transitionDelay = `${i * 100}ms`;
    workflowObserver.observe(step);
  });

  /* ----------------------------------------------------------
     7. Parallax Floating Orbs
  ---------------------------------------------------------- */
  const parallaxOrbs = document.querySelectorAll('.parallax-orb');
  let ticking = false;

  const updateParallax = () => {
    if (window.innerWidth <= 768) return; // Desktop only
    const scrollY = window.scrollY;
    parallaxOrbs.forEach((orb, i) => {
      const speed = 0.03 + (i % 3) * 0.015; // Vary speed per orb
      const offset = scrollY * speed * (i % 2 === 0 ? 1 : -1);
      orb.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };

  const onScrollParallax = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  /* ----------------------------------------------------------
     8. Hero Scroll Indicator Fade
  ---------------------------------------------------------- */
  const scrollIndicator = document.querySelector('.scroll-indicator');

  const updateScrollIndicator = () => {
    if (!scrollIndicator) return;
    const fadeEnd = window.innerHeight * 0.45;
    const opacity = Math.max(0, 1 - window.scrollY / fadeEnd);
    scrollIndicator.style.opacity = opacity;
  };

  /* ----------------------------------------------------------
     9. Unified Scroll Handler (passive)
  ---------------------------------------------------------- */
  const onScroll = () => {
    updateProgress();
    updateActiveDot();
    updateScrollIndicator();
    onScrollParallax();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateProgress();
    updateActiveDot();
  }, { passive: true });

  /* ----------------------------------------------------------
     Initialization
  ---------------------------------------------------------- */
  setTimeout(() => {
    initReveals();
    updateProgress();
    updateActiveDot();
    updateScrollIndicator();
    updateParallax();
  }, 100);

});

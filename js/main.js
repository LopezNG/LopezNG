/* ===================================================================
   Portfolio — shared interactions
=================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const open = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // close menu after choosing a link
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* ---------- Shrink header into a floating pill on scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const SCROLL_THRESHOLD = 24; // px scrolled before transforming
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll(); // set correct state on load (e.g. when refreshing mid-page)
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Auto year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Duplicate marquee content for a seamless loop ----------
     Markup: a .marquee-track containing items. We clone its contents
     once so the -50% translate animation wraps perfectly.            */
  document.querySelectorAll(".marquee-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Tech chip: set brand color + stagger ---------- */
  document.querySelectorAll(".tech-grid").forEach((grid) => {
    grid.querySelectorAll(".tech-chip").forEach((chip, i) => {
      const brandColor = chip.getAttribute("data-color");
      if (brandColor) {
        chip.style.setProperty("--chip-color", brandColor);
      }
      /* stagger the reveal-on-scroll entrance per chip */
      chip.style.transitionDelay = `${i * 50}ms`;
    });
  });

  /* ---------- Certificate Accordion ---------- */
  const certifications = [
    {
      specialization: "NVIDIA Certificates",
      logo: "WebImg/Logo/nvidia-com-logo.png",
      courses: [
        { title: "Introduction to Networking", credential: "https://www.coursera.org/account/accomplishments/verify/SIFDYX6J7EAY" },
        { title: "The Fundamentals of RDMA Programming", credential: "https://www.coursera.org/account/accomplishments/verify/REH01STQ3Z49" },
        { title: "AI Infrastructure and Operations Fundamentals", credential: "https://www.coursera.org/account/accomplishments/verify/DUHF4WZ14IBV" }
      ]
    },
    {
      specialization: "Intel® AI Fundamentals",
      logo: "WebImg/Logo/intel-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/JRIIYCCUMH8P",
      courses: [
        { title: "AI Essentials", credential: "https://www.coursera.org/account/accomplishments/certificate/MCC5HLD053BL" },
        { title: "The Intel® AI Value", credential: "https://www.coursera.org/account/accomplishments/certificate/P6A7NUAGMBB8" },
        { title: "Intel® AI Win Recipes", credential: "https://www.coursera.org/account/accomplishments/certificate/HPV79UQJ2M5R" }
      ]
    },
    {
      specialization: "Xbox Product Manager",
      logo: "WebImg/Logo/xbox-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/XQX45438NCTT",
      courses: [
        { title: "Product Management Fundamentals", credential: "https://www.coursera.org/account/accomplishments/certificate/FA484HZZF50M" },
        { title: "Market Research and Competitive Analysis", credential: "https://www.coursera.org/account/accomplishments/certificate/4BA2HJK4QCG8" },
        { title: "Product Strategy and Roadmapping", credential: "https://www.coursera.org/account/accomplishments/certificate/6HEJQBJSEKS4" },
        { title: "Product Design and UX/UI Fundamentals", credential: "https://www.coursera.org/account/accomplishments/certificate/FIQN6SL6N85R" },
        { title: "Product Launch and Post-Launch Management", credential: "https://www.coursera.org/account/accomplishments/certificate/SZ1KRD4MY3PQ" }
      ]
    },
    {
      specialization: "Google Project Management",
      logo: "WebImg/Logo/google-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/KP9XVLG0UJN2",
      courses: [
        { title: "Foundations of Project Management", credential: "https://www.coursera.org/account/accomplishments/certificate/DOCHNZK7CW4B" },
        { title: "Project Initiation: Starting a Successful Project", credential: "https://www.coursera.org/account/accomplishments/certificate/DWTCLIHBYARA" },
        { title: "Project Planning: Putting It All Together", credential: "https://www.coursera.org/account/accomplishments/certificate/OFZ54WA8C1M6" },
        { title: "Project Execution: Running the Project", credential: "https://www.coursera.org/account/accomplishments/certificate/1VYUL4MMXDIP" },
        { title: "Agile Project Management", credential: "https://www.coursera.org/account/accomplishments/certificate/T90U9B0HF9D5" },
        { title: "Capstone: Applying Project Management in the Real World", credential: "https://www.coursera.org/account/accomplishments/certificate/41Q8K03C0MIZ" },
        { title: "Accelerate Your Job Search with AI", credential: "https://www.coursera.org/account/accomplishments/certificate/8CUCOZYCNZOV" }
      ]
    },
    {
      specialization: "Google Data Analytics",
      logo: "WebImg/Logo/google-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/ZSAMZI8QL394",
      courses: [
        { title: "Foundations: Data, Data, Everywhere", credential: "https://www.coursera.org/account/accomplishments/certificate/HLCT7P4YQ4II" },
        { title: "Ask Questions to Make Data-Driven Decisions", credential: "https://www.coursera.org/account/accomplishments/certificate/EH4M6SEGSISK" },
        { title: "Prepare Data for Exploration", credential: "https://www.coursera.org/account/accomplishments/certificate/UQCIJ4BYQGT9" },
        { title: "Process Data from Dirty to Clean", credential: "https://www.coursera.org/account/accomplishments/certificate/HLMHJZAA84P4" },
        { title: "Analyze Data to Answer Questions", credential: "https://www.coursera.org/account/accomplishments/certificate/EBPT14CVQMA0" },
        { title: "Share Data Through the Art of Visualization", credential: "https://www.coursera.org/account/accomplishments/certificate/Z1WP7OYQWKHC" },
        { title: "Google Data Analytics Capstone: Complete a Case Study", credential: "https://www.coursera.org/account/accomplishments/certificate/MFFQA7QUNXXL" },
        { title: "Accelerate Your Job Search with AI", credential: "https://www.coursera.org/account/accomplishments/certificate/8CUCOZYCNZOV" }
      ]
    },
    {
      specialization: "Mathematics for Machine Learning",
      logo: "WebImg/Logo/imperial-ac-uk-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/J7U1JQ905HF5",
      courses: [
        { title: "Mathematics for Machine Learning: Linear Algebra", credential: "https://www.coursera.org/account/accomplishments/certificate/ACFDNNZUM4GO" },
        { title: "Mathematics for Machine Learning: Multivariate Calculus", credential: "https://www.coursera.org/account/accomplishments/certificate/5M8FQ7AC6CBQ" },
        { title: "Mathematics for Machine Learning: PCA", credential: "https://www.coursera.org/account/accomplishments/certificate/ADXVJTFLHZZJ" }
      ]
    },
    {
      specialization: "Amazon Junior Software Developer",
      logo: "WebImg/Logo/amazon-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/3HZWZ9TAOFAN",
      courses: [
        { title: "Introduction to Software Development", credential: "https://www.coursera.org/account/accomplishments/certificate/7AZ53DD55ZRA" },
        { title: "Programming with Java", credential: "https://www.coursera.org/account/accomplishments/certificate/FBOVIYK5D00M" },
        { title: "Data Structures and Algorithms", credential: "https://www.coursera.org/account/accomplishments/certificate/55UF09OO5PYY" },
        { title: "Database Management with Java and SQL", credential: "https://www.coursera.org/account/accomplishments/certificate/FEKKWJDNFMC8" },
        { title: "Full Stack Web Development", credential: "https://www.coursera.org/account/accomplishments/certificate/VN00BRAUNJNU" },
        { title: "Generative AI in Software Development", credential: "https://www.coursera.org/account/accomplishments/certificate/4SHENVJKPYJR" },
        { title: "Application Development", credential: "https://www.coursera.org/account/accomplishments/certificate/25NGKMP4UV5X" }
      ]
    },
    {
      specialization: "Accelerated Computer Science Fundamentals",
      logo: "WebImg/Logo/illinois-edu-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/Z1LCMT1GBR4N",
      courses: [
        { title: "Object-Oriented Data Structures in C++", credential: "https://www.coursera.org/account/accomplishments/certificate/U8K65GNSTOKN" },
        { title: "Ordered Data Structures", credential: "https://www.coursera.org/account/accomplishments/certificate/9RWP3JB32OZV" },
        { title: "Unordered Data Structures", credential: "https://www.coursera.org/account/accomplishments/certificate/3Z2BJLVHZ8IC" }
      ]
    },
    {
      title: "Version Control with Git",
      logo: "WebImg/Logo/atlassian-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/verify/ZEGEHXL5X4PF",
      standalone: true
    },
    {
      specialization: "Data-Oriented Python Programming and Debugging",
      logo: "WebImg/Logo/umich-edu-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/VFV8SR9VAQUY",
      courses: [
        { title: "Python Debugging: A Systematic Approach", credential: "https://www.coursera.org/account/accomplishments/certificate/P7J54N1KNTVU" },
        { title: "NumPy and Pandas Basics for Future Data Scientists", credential: "https://www.coursera.org/account/accomplishments/certificate/9SGNS3EHTBG8" },
        { title: "Statistics with Python Using NumPy, Pandas, and SciPy", credential: "https://www.coursera.org/account/accomplishments/certificate/4YZ8DQ0OM4K7" },
        { title: "Python Debugging Capstone Project: Fixing and Extending Code", credential: "https://www.coursera.org/account/accomplishments/certificate/ZPBXK97KZCFU" }
      ]
    },
    {
      specialization: "Microsoft SQL Server",
      logo: "WebImg/Logo/microsoft-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/C7X8PU7P6NXU",
      courses: [
        { title: "SQL Foundations", credential: "https://www.coursera.org/account/accomplishments/certificate/U7A9CALJZMLJ" },
        { title: "Data Manipulation and Transactions in SQL Server", credential: "https://www.coursera.org/account/accomplishments/certificate/MCP8HT31DWRV" },
        { title: "Relational Database Design and Advanced Querying", credential: "https://www.coursera.org/account/accomplishments/certificate/KVYXQ8FQOOQA" },
        { title: "Indexing, Performance Optimization & Functions in SQL Server", credential: "https://www.coursera.org/account/accomplishments/certificate/4CFDPWYPGWY0" },
        { title: "Security, Maintenance & Integration with BI Tools", credential: "https://www.coursera.org/account/accomplishments/certificate/DQM3PC415VA1" }
      ]
    },
    {
      specialization: "Introduction to Cyber Security",
      logo: "WebImg/Logo/nyu-edu-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/ICHKUDJKDRSX",
      courses: [
        { title: "Introduction to Cyber Attacks", credential: "https://www.coursera.org/account/accomplishments/certificate/YFHWDXGB2CB6" },
        { title: "Cyber Attack Countermeasures", credential: "https://www.coursera.org/account/accomplishments/certificate/C9YBJ8GJWMS7" },
        { title: "Real-Time Cyber Threat Detection and Mitigation", credential: "https://www.coursera.org/account/accomplishments/certificate/DXGU6C228YW4" },
        { title: "Enterprise and Infrastructure Security", credential: "https://www.coursera.org/account/accomplishments/certificate/AEICOBVV8FKQ" }
      ]
    },
    {
      specialization: "IBM AI Developer",
      logo: "WebImg/Logo/ibm-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/H5Q77DQRKZUX",
      courses: [
        { title: "Introduction to Software Engineering", credential: "https://www.coursera.org/account/accomplishments/certificate/E8L0GQSQ147G" },
        { title: "Introduction to Artificial Intelligence (AI)", credential: "https://www.coursera.org/account/accomplishments/certificate/99Q9P1XTSJRG" },
        { title: "Generative AI: Introduction and Applications", credential: "https://www.coursera.org/account/accomplishments/certificate/S28K3RXY4CSS" },
        { title: "Generative AI: Prompt Engineering Basics", credential: "https://www.coursera.org/account/accomplishments/certificate/L7Q0VQOO11WQ" },
        { title: "Introduction to HTML, CSS, & JavaScript", credential: "https://www.coursera.org/account/accomplishments/certificate/P6Q7ENYBY0RK" },
        { title: "Python for Data Science, AI & Development", credential: "https://www.coursera.org/account/accomplishments/certificate/WZPEL6I61V7E" },
        { title: "Developing AI Applications with Python and Flask", credential: "https://www.coursera.org/account/accomplishments/certificate/QSJAFLNJFUY5" },
        { title: "Building Generative AI-Powered Applications with Python", credential: "https://www.coursera.org/account/accomplishments/certificate/WJ0SOE6KCMW8" },
        { title: "Generative AI: Elevate your Software Development Career", credential: "https://www.coursera.org/account/accomplishments/certificate/IAAWW4VKK9S1" },
        { title: "Software Developer Career Guide and Interview Preparation", credential: "https://www.coursera.org/account/accomplishments/certificate/BPKMUHDT3DVQ" }
      ]
    },
    {
      specialization: "IBM Data Science",
      logo: "WebImg/Logo/ibm-com-logo.png",
      credential: "https://www.coursera.org/account/accomplishments/specialization/YUFMH3QPFTL2",
      courses: [
        { title: "What is Data Science?", credential: "https://www.coursera.org/account/accomplishments/certificate/WK7APLY1K8XS" },
        { title: "Tools for Data Science", credential: "https://www.coursera.org/account/accomplishments/certificate/ZHSISX737YUR" },
        { title: "Data Science Methodology", credential: "https://www.coursera.org/account/accomplishments/certificate/9L1I0QDXTWW4" },
        { title: "Python for Data Science, AI & Development", credential: "https://www.coursera.org/account/accomplishments/certificate/WZPEL6I61V7E" },
        { title: "Python Project for Data Science", credential: "https://www.coursera.org/account/accomplishments/certificate/NRF4954KRG68" },
        { title: "Databases and SQL for Data Science with Python", credential: "https://www.coursera.org/account/accomplishments/certificate/MEUR7YWSS2RD" },
        { title: "Data Analysis with Python", credential: "https://www.coursera.org/account/accomplishments/certificate/YE4MEXOGTF2D" },
        { title: "Data Visualization with Python", credential: "https://www.coursera.org/account/accomplishments/certificate/BHF9FMN8ZPI6" },
        { title: "Machine Learning with Python", credential: "https://www.coursera.org/account/accomplishments/certificate/PFWCJ71LCPJY" },
        { title: "Applied Data Science Capstone", credential: "https://www.coursera.org/account/accomplishments/certificate/6CJ1E2IZYC25" },
        { title: "Generative AI: Elevate Your Data Science Career", credential: "https://www.coursera.org/account/accomplishments/certificate/4TOKYHFW0AK6" },
        { title: "Data Scientist Career Guide and Interview Preparation", credential: "https://www.coursera.org/account/accomplishments/certificate/L0XM25AVM0EZ" }
      ]
    }
  ];

  /* small SVG external-link icon reused across all credential links */
  const extIcon = `<svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  const certContainer = document.getElementById("cert-accordion");

  if (certContainer) {
    certifications.forEach((cert, idx) => {
      if (cert.standalone) {
        /* ---- Standalone card (Atlassian) ---- */
        const card = document.createElement("article");
        card.className = "cert-card cert-standalone";
        card.setAttribute("data-reveal", "");
        card.innerHTML = `
          <div class="cert-header" tabindex="-1">
            <div class="cert-header-top">
              <img class="cert-logo" src="${cert.logo}" alt="" loading="lazy" />
              <span class="cert-title" title="${cert.title}">${cert.title}</span>
            </div>
          </div>
          <div class="cert-body-standalone">
            <a class="cert-cred" href="${cert.credential}" target="_blank" rel="noopener">
              Show Credential ${extIcon}
            </a>
          </div>`;
        certContainer.appendChild(card);
      } else {
        /* ---- Accordion card ---- */
        const panelId = `cert-panel-${idx}`;
        const btnId = `cert-btn-${idx}`;
        const card = document.createElement("article");
        card.className = "cert-card";
        card.setAttribute("data-reveal", "");

        /* Build course list with stagger delays */
        const courseItems = cert.courses
          .map(
            (c, i) => `
            <li class="cert-course" style="transition-delay: ${i * 40}ms">
              <span class="cert-course-name">${c.title}</span>
              <a class="cert-course-link" href="${c.credential}" target="_blank" rel="noopener">
                Credential ${extIcon}
              </a>
            </li>`
          )
          .join("");

        /* Specialization-level credential link (optional) */
        const specLink = cert.credential
          ? `<a class="cert-spec-link" href="${cert.credential}" target="_blank" rel="noopener" title="View specialization credential">View Credential ${extIcon}</a>`
          : `<span></span>`;

        card.innerHTML = `
          <button class="cert-header"
                  id="${btnId}"
                  aria-expanded="false"
                  aria-controls="${panelId}"
                  aria-label="Expand ${cert.specialization} courses">
            <div class="cert-header-top">
              <img class="cert-logo" src="${cert.logo}" alt="" loading="lazy" />
              <span class="cert-title" title="${cert.specialization}">${cert.specialization}</span>
            </div>
            <div class="cert-header-bottom">
              ${specLink}
              <span class="cert-expand-btn" aria-hidden="true">
                <span class="cert-arrow">▼</span>
              </span>
            </div>
          </button>
          <div class="cert-body" id="${panelId}" role="region" aria-labelledby="${btnId}">
            <div class="cert-body-inner">
              <ul class="cert-courses">${courseItems}</ul>
            </div>
          </div>`;
        certContainer.appendChild(card);
      }
    });

    /* ---- Accordion interaction ---- */
    certContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".cert-header");
      if (!btn) return;
      /* skip standalone cards */
      const card = btn.closest(".cert-card");
      if (card.classList.contains("cert-standalone")) return;
      /* skip if user clicked the specialization credential link */
      if (e.target.closest(".cert-spec-link")) return;

      const isOpen = card.classList.contains("is-open");
      const body = card.querySelector(".cert-body");

      /* close all others first */
      certContainer.querySelectorAll(".cert-card.is-open").forEach((openCard) => {
        if (openCard !== card) {
          openCard.classList.remove("is-open");
          const ob = openCard.querySelector(".cert-body");
          if (ob) ob.style.maxHeight = null;
          openCard.querySelector(".cert-header")?.setAttribute("aria-expanded", "false");
        }
      });

      /* toggle current */
      if (isOpen) {
        card.classList.remove("is-open");
        body.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        card.classList.add("is-open");
        body.style.maxHeight = body.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });

    /* keyboard support: Enter / Space */
    certContainer.addEventListener("keydown", (e) => {
      const btn = e.target.closest(".cert-header");
      if (!btn) return;
      if (btn.closest(".cert-standalone")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  }

  /* ---------- Reveal-on-scroll (progressive enhancement) ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "opacity 500ms ease, transform 500ms ease";
      io.observe(el);
    });
  }

  /* ---------- Animated Stats Counter ---------- */
  const statsCounters = document.querySelectorAll('.stat-number');
  if (statsCounters.length > 0 && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-target');
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            const current = Math.floor(easeProgress * target);
            el.innerText = current;
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.innerText = target;
            }
          };
          requestAnimationFrame(updateCount);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statsCounters.forEach(counter => statsObserver.observe(counter));
  }

  /* ---------- Hackathon Certificate Modal ---------- */
  const hackathonCerts = [
    { event: "KPMG 2026 Academic Innovation Challenge", file: "WebImg/Certificates/KPMG_Certificate.png" },
    { event: "Agora Hackathon Philippines 2026", file: "WebImg/Certificates/Agora_Certificate.png" },
    { event: "IBM Bob Hackathon", file: "WebImg/Certificates/IBM BOB Hackathon.png" },
    { event: "AMD Developer Hackathon", file: "WebImg/Certificates/AMD Developer Hackathon.png" }
  ];

  const modal = document.getElementById('cert-modal');
  if (modal) {
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');
    const closeBtn = document.getElementById('cert-modal-close');
    const prevBtn = document.getElementById('cert-modal-prev');
    const nextBtn = document.getElementById('cert-modal-next');
    const loader = document.getElementById('cert-modal-loader');
    
    let currentCertIndex = 0;
    let isZoomed = false;
    
    const openModal = (index) => {
      currentCertIndex = index;
      const cert = hackathonCerts[currentCertIndex];
      
      modalTitle.textContent = cert.event;
      modalImg.classList.remove('loaded');
      modalImg.classList.remove('zoomed');
      isZoomed = false;
      loader.classList.add('active');
      
      // Setup image
      modalImg.src = cert.file;
      modalImg.onload = () => {
        loader.classList.remove('active');
        modalImg.classList.add('loaded');
      };
      
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        modalImg.src = '';
      }, 300);
    };
    
    const showNext = () => {
      const nextIndex = (currentCertIndex + 1) % hackathonCerts.length;
      openModal(nextIndex);
    };
    
    const showPrev = () => {
      const prevIndex = (currentCertIndex - 1 + hackathonCerts.length) % hackathonCerts.length;
      openModal(prevIndex);
    };
    
    const toggleZoom = () => {
      isZoomed = !isZoomed;
      if (isZoomed) {
        modalImg.classList.add('zoomed');
      } else {
        modalImg.classList.remove('zoomed');
      }
    };

    // Event Listeners for timeline buttons
    document.querySelectorAll('.hk-cert-btn-list').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventName = btn.getAttribute('data-event');
        const index = hackathonCerts.findIndex(c => c.event === eventName);
        if (index !== -1) {
          openModal(index);
        }
      });
    });

    // Modal controls
    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    modalImg.addEventListener('click', (e) => { e.stopPropagation(); toggleZoom(); });
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('cert-modal-backdrop') || e.target.classList.contains('cert-modal-img-container')) {
        closeModal();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  /* ---------- Theme Toggle ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "light" ? "dark" : "light";
      
      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
    });
  }
})();

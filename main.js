document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Scroll-Down indicator hide logic
  const scrollDown = document.getElementById("scroll-down");
  if (scrollDown) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        scrollDown.classList.add("hide");
      } else {
        scrollDown.classList.remove("hide");
      }
    });
    
    scrollDown.addEventListener("click", () => {
      const targetElement = document.querySelector("#about");
      const targetPosition = targetElement ? targetElement.offsetTop - 80 : 0;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }

  // 2. Cursor Glow Follow Effect (Desktop)
  const cursorGlow = document.getElementById("cursor-glow");
  if (cursorGlow) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }

  // 3. Dark/Light Theme Switch (Default isDark = true -> bg-dark)
  const darkModeBtn = document.getElementById("toggle-mode");
  
  const updateDarkMode = () => {
    // If not set, default to true
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "true");
    }
    const isDark = localStorage.getItem("darkMode") === "true";
    const icon = darkModeBtn.querySelector("i");

    if (isDark) {
      document.body.classList.add("bg-dark");
      icon.className = "fa fa-sun";
      darkModeBtn.title = "Toggle light mode";
    } else {
      document.body.classList.remove("bg-dark");
      icon.className = "fa fa-moon";
      darkModeBtn.title = "Toggle dark mode";
    }
  };

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isDark = document.body.classList.toggle("bg-dark");
      localStorage.setItem("darkMode", isDark.toString());
      updateDarkMode();
    });
    
    // Initialize theme on page load
    updateDarkMode();
  }

  // 4. Dynamic Copyright Year
  const currentYear = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = currentYear;
  }

  // 5. Smooth Scroll Navigation with offset adjustments
  const links = document.querySelectorAll('a[href^="#"]');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const toggler = document.querySelector('.navbar-toggler');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close hamburger menu if open (on mobile)
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          toggler.click();
        }

        const targetPosition = targetElement.offsetTop - 80;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 6. Navigation Active highlight scroll synchronization
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("section");

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", highlightNav);
  highlightNav();

  // 7. Interactive Typing Effect
  const typedTextSpan = document.getElementById("typed-text");
  const textArray = [
    "Frontend Developer",
    "IT Support Officer",
    "Cinematographer",
    "AI Prompt Engineer"
  ];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  // 8. 3D Tilt Effect on Cards (Project Cards & Profile Image Frame)
  const tiltCards = document.querySelectorAll(".project-card, .about-image-tilt, #profile-card");
  
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      
      const rotateX = ((y / height) - 0.5) * -15; // Max tilt 15deg
      const rotateY = ((x / width) - 0.5) * 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  // 9. IntersectionObserver animations (Scroll Reveal, Progress Bars, Count-Up Stats)
  const animationElements = document.querySelectorAll(".animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale-up, .section-title");
  const progressBars = document.querySelectorAll(".progress-bar");
  const statNumbers = document.querySelectorAll(".stat-number");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animationElements.forEach(el => revealObserver.observe(el));

  // Progress bars fill trigger
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute("data-width");
        bar.style.width = targetWidth;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => skillsObserver.observe(bar));

  // Stats Count-up animation
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
        let count = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 30);
        
        const counterInterval = setInterval(() => {
          count += 1;
          el.textContent = count;
          if (count >= target) {
            el.textContent = target;
            clearInterval(counterInterval);
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  // 10. Star Particles Setup via tsParticles (CDN loaded)
  if (typeof tsParticles !== "undefined") {
    tsParticles.load("particles-js", {
      fullScreen: { enable: false, zIndex: 1 },
      particles: {
        number: {
          value: 40,
          density: { enable: true, area: 800 }
        },
        color: {
          value: ["#00f0ff", "#7b2ff7", "#ffffff"]
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out"
          }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble"
          },
          onClick: {
            enable: true,
            mode: "push"
          }
        },
        modes: {
          bubble: {
            distance: 120,
            duration: 2,
            size: 4,
            opacity: 0.8
          },
          push: {
            quantity: 3
          }
        }
      },
      background: {
        color: "transparent"
      },
      detectRetina: true
    });
  }
});

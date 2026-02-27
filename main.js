// Scroll down
const scrollDown = document.querySelector(".scroll-down"),
  navLists = document.querySelector(".nav__lists"),
  menuBtn = document.querySelector("#menu-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    scrollDown.classList.add("hide");
  } else {
    scrollDown.classList.remove("hide");
  }
});


// Dark mode
const darkModeBtn = document.getElementById("toggle-mode");

const updateDarkMode = () => {
  const isDark = localStorage.getItem("darkMode") === "true";

  if (isDark) {
    document.body.classList.add("bg-dark");
    darkModeBtn.classList.add("fa-sun");
    darkModeBtn.classList.remove("fa-moon");
  } else {
    document.body.classList.remove("bg-dark");
    darkModeBtn.classList.add("fa-moon");
    darkModeBtn.classList.remove("fa-sun");
  }
};

darkModeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("bg-dark");

  localStorage.setItem("darkMode", isDark.toString());

  if (isDark) {
    darkModeBtn.classList.remove("fa-moon");
    darkModeBtn.classList.add("fa-sun");
  } else {
    darkModeBtn.classList.remove("fa-sun");
    darkModeBtn.classList.add("fa-moon");
  }
});

// Initialize dark mode on page load
updateDarkMode();

// Change active nav
// const navLinks = document.querySelectorAll(".navbar-nav li a");

// navLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     navLinks.forEach((link) => link.removeAttribute("class"));
//     link.setAttribute("class", "active");
//   });
// });

// year dynamically 
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// scroll smooth using js

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const targetPosition = targetElement?.offsetTop - 100;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

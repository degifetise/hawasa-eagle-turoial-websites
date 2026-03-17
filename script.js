//to light toggle bar//
const eyeCare = document.querySelector(".eye-care");
const eyeCareIcon = document.querySelector(".eye-care-btn");
eyeCare.addEventListener("click", () => {
  if (eyeCareIcon) {
    eyeCareIcon.style.display =
      eyeCareIcon.style.display === "flex" ? "none" : "flex";
  }
});

eyeCareIcon.querySelectorAll("span").forEach((p) => {
  p.addEventListener("click", () => {
    if (p.textContent === "light") {
      document.body.classList.remove("dark");
      eyeCare.querySelector("button").textContent =
        `<i class="fas fa-moon"></i>`;
    } else if (p.textContent === "dark") {
      document.body.classList.add("dark");
      eyeCare.querySelector("button").textContent =
        `<i class="fas fa-sun"></i>`;
    }
    eyeCare.style.display = "none";
  });
});

//navbar section //
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
//observer animation //
const navEl = navLinks.querySelectorAll(".nav-links a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("entry");
      }
      //handle navbar highlighting//

      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navEl.forEach((link) => link.classList.remove("active-link"));

        const activeLink = document.querySelector(`[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active-link");
        }
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll("section:not(:first-of-type)");
document.querySelectorAll("section").forEach((sec) => {
  sec.classList.add("reveal");
  observer.observe(sec);
});

/* //stats sectionn counter */

const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector("#stats");
let counterAnimated = false;
const options = {
  threshold: 0.5,
};

const animateCounters = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const updateCount = () => {
          const remaining = target - count;
          const increment = Math.ceil(remaining / 10);

          if (count < target) {
            count += increment;
            counter.innerText = count > target ? target : count;
            setTimeout(updateCount, 50);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      counterAnimated = true;
    }
  });
};

const statsObserver = new IntersectionObserver(animateCounters, options);

statsObserver.observe(statsSection);

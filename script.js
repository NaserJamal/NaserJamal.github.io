// Theme toggle: follows the system until the visitor picks one.
const root = document.documentElement;
const toggle = document.querySelector(".theme");

function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function label() {
  toggle.textContent = currentTheme() === "dark" ? "Light" : "Dark";
}

toggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  label();
});

matchMedia("(prefers-color-scheme: dark)").addEventListener("change", label);
label();

// Local time in Abu Dhabi.
const clock = document.querySelector(".clock");
const time = clock.querySelector("time");
const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  hour: "2-digit",
  minute: "2-digit",
});

function tick() {
  time.textContent = format.format(new Date());
}

tick();
clock.hidden = false;
setInterval(tick, 30000);

// Fade each timeline row in as it scrolls into view.
const rows = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("shown");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  rows.forEach((row) => observer.observe(row));
} else {
  rows.forEach((row) => row.classList.add("shown"));
}

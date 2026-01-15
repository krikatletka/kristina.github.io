const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// Links
const profile = {
  github: "https://github.com/krikatletka",
  linkedin: "https://www.linkedin.com/in/kristina-mozhaieva-5092183a5/",
  email: "kristinamozaeva776@gmail.com"
};

const projects = [
  {
    name: "TaskHub",
    desc: "Fullstack practice project: ASP.NET Core Web API + EF Core + SQLite + JS frontend. CRUD, CORS, Swagger.",
    inProgress: true,
    tags: ["ASP.NET Core", "C#", "EF Core", "SQLite", "REST", "Swagger", "JavaScript"],
    github: "https://github.com/krikatletka/taskhub",
    live: "",
    cover: "img/taskhub-1.jpg",
    screens: [
      "img/taskhub-1.jpg",
      "img/taskhub-2.jpg",
      "img/taskhub-3.jpg",
      "img/taskhub-4.jpg"
    ],
    bullets: [
      "Designed REST endpoints (CRUD) and documented them with Swagger.",
      "Connected EF Core + SQLite, created migrations.",
      "Built JS frontend with fetch() and implemented editing/toggling/deleting tasks.",
      "Configured CORS for local frontend development."
    ]
  },
  {
    name: "Portfolio Website",
    desc: "Personal portfolio hosted on GitHub Pages: projects, skills, screenshots and contact information.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    github: "https://github.com/krikatletka/kristina.github.io",
    live: "",
    cover: "img/portfolio-1.jpg",
    screens: ["img/portfolio-3.jpg", "img/portfolio-2.jpg"],
    bullets: [
      "Created a clean one-page portfolio layout with sections.",
      "Added modal windows for projects with screenshots and details.",
      "Published the website using GitHub Pages."
    ]
  }
];

// Skills blocks
const skills = [
  {
    title: "Backend & Programming",
    items: [
      "C#",
      "C++",
      "ASP.NET Core Web API",
      "OOP",
      "Data Structures & Algorithms",
      "REST APIs",
      "EF Core",
      "SQL / SQLite",
      "Swagger"
    ]
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript (fetch)", "Basic UI/UX improvements"]
  },
  {
    title: "Computer Science",
    items: ["Discrete Mathematics", "Algorithmic thinking", "Working with documentation"]
  },
  {
    title: "Tools",
    items: ["Git / GitHub", "Visual Studio / VS Code", "Swagger UI"]
  },
  {
    title: "Communication",
    items: [
      "Clear communication",
      "Teamwork in multicultural environments",
      "Customer-oriented mindset",
      "Responsibility and ownership"
    ]
  }
];

function escapeHtml(str) {
  return (str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setLinks() {
  // Top links
  document.getElementById("ghLink").href = profile.github;

  const liTop = document.getElementById("liLink");
  if (profile.linkedin) liTop.href = profile.linkedin;
  else liTop.style.display = "none";

  const mailTop = document.getElementById("mailLink");
  if (profile.email) mailTop.href = `mailto:${profile.email}`;
  else mailTop.style.display = "none";

  // Contact section
  const emailText = document.getElementById("emailText");
  const githubText = document.getElementById("githubText");
  const linkedinText = document.getElementById("linkedinText");

  githubText.textContent = profile.github.replace("https://github.com/", "@");
  githubText.href = profile.github;

  if (profile.email) {
    emailText.textContent = profile.email;
    emailText.href = `mailto:${profile.email}`;
  } else {
    emailText.textContent = "Add your email in app.js";
    emailText.removeAttribute("href");
  }

  if (profile.linkedin) {
    linkedinText.textContent = profile.linkedin
      .replace("https://www.linkedin.com/in/", "")
      .replaceAll("/", "");
    linkedinText.href = profile.linkedin;
  } else {
    linkedinText.textContent = "Add LinkedIn in app.js (optional)";
    linkedinText.removeAttribute("href");
  }
}

// Modal elements
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalBullets = document.getElementById("modalBullets");
const modalLinks = document.getElementById("modalLinks");

const modalImage = document.getElementById("modalImage");
const modalThumbs = document.getElementById("modalThumbs");

let currentProject = null;
let currentImageIndex = 0;

// Zoom elements
const zoom = document.getElementById("zoom");
const zoomBackdrop = document.getElementById("zoomBackdrop");
const zoomImg = document.getElementById("zoomImg");
const zoomClose = document.getElementById("zoomClose");

let isPanning = false;
let startX = 0, startY = 0;
let imgX = 0, imgY = 0;

function openZoom(src) {
  zoom.classList.add("open");
  document.body.style.overflow = "hidden";

  zoomImg.src = src;

  imgX = 0; imgY = 0;
  applyPan();
}

function closeZoom() {
  zoom.classList.remove("open");
  zoomImg.src = "";
  isPanning = false;

  // keep locked if modal is still open
  if (!modal.classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

function applyPan() {
  zoomImg.style.transform = `translate(-50%, -50%) translate(${imgX}px, ${imgY}px)`;
}

// Open zoom by clicking big image inside modal
modalImage.addEventListener("click", () => {
  if (!modal.classList.contains("open")) return;
  openZoom(modalImage.src);
});

// Close zoom
zoomBackdrop.addEventListener("click", closeZoom);
zoomClose.addEventListener("click", closeZoom);

// Pan
zoomImg.addEventListener("mousedown", (e) => {
  isPanning = true;
  startX = e.clientX - imgX;
  startY = e.clientY - imgY;
});

document.addEventListener("mousemove", (e) => {
  if (!isPanning || !zoom.classList.contains("open")) return;
  imgX = e.clientX - startX;
  imgY = e.clientY - startY;
  applyPan();
});

document.addEventListener("mouseup", () => {
  isPanning = false;
});

function openModal(index) {
  currentProject = projects[index];
  currentImageIndex = 0;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  modalTitle.textContent = currentProject.name;
  modalDesc.textContent = currentProject.desc;

  modalTags.innerHTML = currentProject.tags
    .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  modalBullets.innerHTML = (currentProject.bullets ?? [])
    .map(b => `<li>${escapeHtml(b)}</li>`)
    .join("");

  modalLinks.innerHTML = `
    <a class="btn" href="${currentProject.github}" target="_blank" rel="noopener">GitHub</a>
    ${currentProject.live ? `<a class="btn ghost" href="${currentProject.live}" target="_blank" rel="noopener">Live</a>` : ""}
  `;

  setModalImage(0);
  renderThumbs();
}

function setModalImage(i) {
  const screens = currentProject?.screens?.length ? currentProject.screens : [currentProject.cover];
  currentImageIndex = Math.max(0, Math.min(i, screens.length - 1));
  modalImage.src = screens[currentImageIndex];
}

function renderThumbs() {
  const screens = currentProject?.screens?.length ? currentProject.screens : [currentProject.cover];

  modalThumbs.innerHTML = screens.map((src, i) => `
    <img class="thumb ${i === currentImageIndex ? "active" : ""}"
         src="${src}" alt="thumb ${i + 1}" loading="lazy" data-thumb="${i}" />
  `).join("");

  modalThumbs.querySelectorAll("[data-thumb]").forEach(el => {
    el.addEventListener("click", () => {
      setModalImage(Number(el.dataset.thumb));
      renderThumbs();
    });
  });
}

function closeModal() {
  // If zoom is open, close it first
  if (zoom.classList.contains("open")) {
    closeZoom();
  }

  modal.classList.remove("open");
  document.body.style.overflow = "";
  currentProject = null;
}

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

// Render UI
function renderProjects() {
  const grid = document.getElementById("projectsGrid");

  grid.innerHTML = projects.map((p, idx) => `
    <article class="card proj clickable" data-open="${idx}">
      <img class="projCover" src="${p.cover}" alt="${escapeHtml(p.name)} preview" loading="lazy" />
      <h3>
        ${escapeHtml(p.name)}
        ${p.inProgress ? `<span class="wip">Work in progress</span>` : ""}
      </h3>
      <p>${escapeHtml(p.desc)}</p>

      <div class="tags">
        ${p.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>

      <div class="rowbtns">
        <a class="btn ghost" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
        ${p.live ? `<a class="btn ghost" href="${p.live}" target="_blank" rel="noopener">Live</a>` : ""}
      </div>
    </article>
  `).join("");

  // click card => open modal
  grid.querySelectorAll(".proj.clickable").forEach(card => {
    card.addEventListener("click", () => openModal(Number(card.dataset.open)));
  });

  // click links inside card => do NOT open modal
  grid.querySelectorAll(".proj.clickable a").forEach(a => {
    a.addEventListener("click", (e) => e.stopPropagation());
  });
}

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = skills.map(s => `
    <article class="card skill">
      <h3>${escapeHtml(s.title)}</h3>
      <ul>
        ${s.items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function applyTheme(t) {
  if (t === "light") root.classList.add("light");
  else root.classList.remove("light");

  localStorage.setItem("theme", t);
  themeBtn.textContent = t === "light" ? "☀" : "☾";
}

themeBtn.addEventListener("click", () => {
  const isLight = root.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});

document.addEventListener("keydown", (e) => {
  // Zoom has priority
  if (zoom.classList.contains("open")) {
    if (e.key === "Escape") closeZoom();
    return;
  }

  if (!modal.classList.contains("open")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") { setModalImage(currentImageIndex + 1); renderThumbs(); }
  if (e.key === "ArrowLeft")  { setModalImage(currentImageIndex - 1); renderThumbs(); }
});

// Init
applyTheme(localStorage.getItem("theme") || "dark");
setLinks();
renderProjects();
renderSkills();

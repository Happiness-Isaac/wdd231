const memberListEl = document.getElementById("member-list");
const memberCountEl = document.getElementById("member-count");
const gridBtn = document.getElementById("grid-view-btn");
const listBtn = document.getElementById("list-view-btn");

const badgeInfo = {
  1: { label: "Member", className: "badge-member" },
  2: { label: "Silver", className: "badge-silver" },
  3: { label: "Gold", className: "badge-gold" },
};

function buildMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const badge = badgeInfo[member.membership] || badgeInfo[1];

  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="400" height="300">
    <div class="member-card-body">
      <div class="member-card-top">
        <h2>${member.name}</h2>
        <span class="badge ${badge.className}">${badge.label}</span>
      </div>
      <p class="member-category">${member.category}</p>
      <p class="tagline">${member.tagline}</p>
      <p class="founded">Member since ${member.founded}</p>
      <address>${member.address}</address>
      <p>${member.phone}</p>
      <div class="member-card-links">
        <a href="${member.url}" target="_blank" rel="noopener">Visit website</a>
        <a href="tel:${member.phone.replace(/[^0-9+]/g, "")}">Call</a>
      </div>
    </div>
  `;

  return card;
}

function renderMembers(members) {
  memberListEl.innerHTML = "";
  members.forEach((member) => {
    memberListEl.appendChild(buildMemberCard(member));
  });
  if (memberCountEl) {
    memberCountEl.textContent = `${members.length} member businesses`;
  }
}

async function getMemberData() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json();
    renderMembers(data.members);
  } catch (error) {
    console.error("Unable to load member directory:", error);
    memberListEl.innerHTML = `<p class="error-message">Sorry, the member directory could not be loaded right now. Please try again later.</p>`;
  }
}

function setView(view) {
  const isList = view === "list";
  memberListEl.classList.toggle("list-view", isList);
  gridBtn.setAttribute("aria-pressed", String(!isList));
  listBtn.setAttribute("aria-pressed", String(isList));
  localStorage.setItem("directoryView", view);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

setView(localStorage.getItem("directoryView") || "grid");

getMemberData();

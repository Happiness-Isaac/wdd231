const spotlightListEl = document.getElementById("spotlight-list");

const spotlightBadgeInfo = {
    2: { label: "Silver", className: "badge-silver" },
    3: { label: "Gold", className: "badge-gold" },
};

function pickRandomSpotlights(members, count) {
    const eligible = members.filter((m) => m.membership === 2 || m.membership === 3);
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function buildSpotlightCard(member) {
    const card = document.createElement("article");
    card.className = "spotlight-card";

    const badge = spotlightBadgeInfo[member.membership];

    card.innerHTML = `
    <div class="spotlight-top">
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="56" height="56">
      <div class="spotlight-name">
        <h3>${member.name}</h3>
        <span class="badge ${badge.className}">${badge.label}</span>
      </div>
    </div>
    <address>${member.address}</address>
    <p>${member.phone}</p>
    <a href="${member.url}" target="_blank" rel="noopener">Visit website</a>
  `;

    return card;
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }
        const data = await response.json();
        const count = Math.random() < 0.5 ? 2 : 3; // randomize 2 or 3 spotlights
        const spotlights = pickRandomSpotlights(data.members, count);

        spotlightListEl.innerHTML = "";
        spotlights.forEach((member) => {
            spotlightListEl.appendChild(buildSpotlightCard(member));
        });
    } catch (error) {
        console.error("Unable to load company spotlights:", error);
        spotlightListEl.innerHTML = `<p class="error-message">Sorry, spotlights could not be loaded right now.</p>`;
    }
}

loadSpotlights();

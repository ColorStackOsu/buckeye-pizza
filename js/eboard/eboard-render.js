import { initRevealAnimations } from "../shared/reveal.js";

export function initEboard(
  BOARD_DATA,
  {
    defaultYear = BOARD_DATA.boards[0].year,
    boardContainerId = "board-body",
    btn2023Id = "btn-2023-2024",
    btn2024Id = "btn-2024-2025",
    btn2025Id = "btn-2025-2026",
  } = {},
) {
  // render default
  displayBoard(BOARD_DATA, defaultYear, boardContainerId);
  setupBoardMemberHandlers(BOARD_DATA, boardContainerId);
  setupBoardYearButtons(BOARD_DATA, boardContainerId, {
    btn2023Id,
    btn2024Id,
    btn2025Id,
  });

  // set default active button based on defaultYear
  const btn2023 = document.getElementById(btn2023Id);
  const btn2024 = document.getElementById(btn2024Id);
  const btn2025 = document.getElementById(btn2025Id);

  document.querySelectorAll(".board-btn").forEach((btn) => {
    btn.classList.add("inactive");
  });

  if (defaultYear === "2023-2024" && btn2023)
    btn2023.classList.remove("inactive");
  if (defaultYear === "2024-2025" && btn2024)
    btn2024.classList.remove("inactive");
  if (defaultYear === "2025-2026" && btn2025)
    btn2025.classList.remove("inactive");
}

export function displayBoard(
  BOARD_DATA,
  year,
  boardContainerId = "board-body",
) {
  const boardContainer = document.getElementById(boardContainerId);
  const members = BOARD_DATA?.boards?.[year]?.members;

  if (!boardContainer || !members) return;

  boardContainer.innerHTML = "";

  for (let i = 0; i < members.length; i++) {
    const commentNode = document.createComment(` ${members[i].name} `);
    boardContainer.appendChild(commentNode);

    const memberCard = document.createElement("div");
    memberCard.classList.add(
      "col-lg-3",
      "col-md-4",
      "col-6",
      "py-md-2",
      "mx-auto",
    );

    const delay = ((i % 4) + 1) * 100;

    const hasBio = Boolean(members[i].bio && members[i].bio.trim().length > 0);

    memberCard.innerHTML = `
    <div class="board-card reveal delay-${delay}">
        <div class="board-card-inner rounded-4">
        <img
            src="${members[i].img}"
            class="img-fluid rounded-4 ${hasBio ? "board-member-trigger" : ""}"
            alt="${members[i].name}"
            ${hasBio ? `role="button" tabindex="0"` : ""}
            ${
              hasBio ? `data-board-year="${year}" data-member-index="${i}"` : ""
            }
        >
        <div class="gradient-overlay"></div>
        </div>

        <a href="${members[i].linkedin}" class="text-decoration-none text-dark">
        <h4 class="mt-3 mb-0 board-name-line">
            ${members[i].name}
            ${
              members[i].company
                ? `<img src="${members[i].company}" alt="" class="company-logo ms-1">`
                : ""
            }
        </h4>
        </a>

        <p class="board-card-role mb-0">${members[i].position}</p>
    </div>
    `;

    boardContainer.appendChild(memberCard);
  }

  balanceGrid(boardContainer, members.length);
  initRevealAnimations();
}

function setupBoardYearButtons(
  BOARD_DATA,
  boardContainerId,
  { btn2023Id, btn2024Id, btn2025Id },
) {
  const btn2023 = document.getElementById(btn2023Id);
  const btn2024 = document.getElementById(btn2024Id);
  const btn2025 = document.getElementById(btn2025Id);

  function setActive(targetBtn) {
    const buttons = document.querySelectorAll(".board-btn");
    buttons.forEach((btn) => btn.classList.add("inactive"));
    if (targetBtn) targetBtn.classList.remove("inactive");
  }

  if (btn2023) {
    btn2023.addEventListener("click", () => {
      displayBoard(BOARD_DATA, "2023-2024", boardContainerId);
      setActive(btn2023);
    });
  }

  if (btn2024) {
    btn2024.addEventListener("click", () => {
      displayBoard(BOARD_DATA, "2024-2025", boardContainerId);
      setActive(btn2024);
    });
  }

  if (btn2025) {
    btn2025.addEventListener("click", () => {
      displayBoard(BOARD_DATA, "2025-2026", boardContainerId);
      setActive(btn2025);
    });
  }
}

function setupBoardMemberHandlers(BOARD_DATA, boardContainerId = "board-body") {
  const boardContainer = document.getElementById(boardContainerId);
  if (!boardContainer) return;

  boardContainer.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;

    const trigger = e.target.closest(".board-member-trigger");
    if (!trigger) return;

    const year = trigger.getAttribute("data-board-year");
    const index = Number(trigger.getAttribute("data-member-index"));
    const member = BOARD_DATA?.boards?.[year]?.members?.[index];
    if (!member) return;

    openMemberModal(member);
  });

  boardContainer.addEventListener("keydown", (e) => {
    const trigger = e.target.closest(".board-member-trigger");
    if (!trigger) return;

    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();

    const year = trigger.getAttribute("data-board-year");
    const index = Number(trigger.getAttribute("data-member-index"));
    const member = BOARD_DATA?.boards?.[year]?.members?.[index];
    if (!member) return;

    openMemberModal(member);
  });
}

function openMemberModal(member) {
  const nameEl = document.getElementById("memberModalName");
  const roleEl = document.getElementById("memberModalRole");
  const bioEl = document.getElementById("memberModalBio");
  const imgEl = document.getElementById("memberModalImg");
  const linkedInEl = document.getElementById("memberModalLinkedIn");
  const calendlyEl = document.getElementById("memberModalCalendly");

  if (nameEl) nameEl.textContent = member.name || "";
  if (roleEl) roleEl.textContent = member.position || "";
  if (bioEl) bioEl.textContent = member.bio || "";

  if (imgEl) {
    imgEl.src = member.img || "";
    imgEl.alt = member.name || "Board member";
  }

  // ---------- Calendly ----------
  if (calendlyEl) {
    if (member.calendly) {
      calendlyEl.href = member.calendly;
      calendlyEl.classList.remove("inactive");
      calendlyEl.removeAttribute("aria-disabled");
      calendlyEl.setAttribute("target", "_blank");
      calendlyEl.setAttribute("rel", "noopener");

      calendlyEl.style.pointerEvents = "";
    } else {
      calendlyEl.href = "#";
      calendlyEl.classList.add("inactive");
      calendlyEl.setAttribute("aria-disabled", "true");

      // prevent clicking
      calendlyEl.style.pointerEvents = "none";
    }
  }

  // ---------- LinkedIn ----------
  if (linkedInEl) {
    if (member.linkedin) {
      linkedInEl.href = member.linkedin;
      linkedInEl.classList.remove("d-none");
      linkedInEl.removeAttribute("aria-disabled");
    } else {
      linkedInEl.href = "#";
      linkedInEl.classList.add("d-none");
      linkedInEl.setAttribute("aria-disabled", "true");
    }
  }

  const modalEl = document.getElementById("memberModal");
  if (!modalEl) return;

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

function balanceGrid(container, totalMembers) {
  const maxPerRow = 4;
  const membersInLastRow = totalMembers % maxPerRow || maxPerRow;

  if (membersInLastRow === 2) {
    const allMemberCards = container.querySelectorAll(".col-lg-3");
    const lastRowStartIndex = totalMembers - membersInLastRow;

    const balancersBefore = document.createElement("div");
    balancersBefore.classList.add("col-lg-3", "d-none", "d-lg-block");

    const firstCardOfLastRow = allMemberCards[lastRowStartIndex];
    if (firstCardOfLastRow)
      container.insertBefore(balancersBefore, firstCardOfLastRow);

    const balancerAfter = document.createElement("div");
    balancerAfter.classList.add("col-lg-3", "d-none", "d-lg-block");
    container.appendChild(balancerAfter);
  }
}

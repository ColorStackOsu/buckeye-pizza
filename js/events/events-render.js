import { fetchDriveFolderImages } from "./fetch-gallery.js";

export async function renderEventCards(
  events,
  containerId = "event-container"
) {
  const eventContainer = document.getElementById(containerId);
  if (!eventContainer) return;

  eventContainer.innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    const col = document.createElement("div");
    col.classList.add("col-lg-4", "col-md-6", "col-11", "py-3", "mx-auto");

    const delay = ((i % 3) + 1) * 100;

    const cardImgSrc = await getCoverSrcForEvent(event);
    const cardAlt = event.alt || `${event.name} Thumbnail`;

    col.innerHTML = `
      <div class="d-flex event-card-container-sm justify-content-center reveal delay-${delay}">
        <button class="event-card" data-event-id="${event.id}">
          <div class="event-card-media">
            <img src="${cardImgSrc}" loading="lazy" alt="${cardAlt}">
            <div class="event-gradient"></div>
          </div>
          <div class="event-inner py-3 px-2">
            <h3 class="mb-0">${event.name}</h3>
            <p class="text-red fw-semibold">${event.date}</p>
          </div>
        </button>
      </div>
    `;

    eventContainer.appendChild(col);
  }

  // Re-trigger reveal (so dynamically added cards become visible)
  if (typeof initRevealAnimations === "function") initRevealAnimations();
  window.dispatchEvent(new Event("scroll"));
}

async function getCoverSrcForEvent(event) {
  // If Drive folder exists, use first image in folder as cover
  if (event.driveFolderId) {
    const images = await fetchDriveFolderImages(event.driveFolderId);
    if (images && images.length > 0) {
      return images[0].src; // first photo thumbnail
    }
  }
  return event.img || "images/placeholder-event.jpg";
}

export function attachEventCardHandlers(
  events,
  containerId = "event-container"
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener("click", (e) => {
    const cardBtn = e.target.closest(".event-card");
    if (!cardBtn) return;

    const eventId = cardBtn.getAttribute("data-event-id");
    if (!eventId) return;

    openGalleryModal(eventId, events);
  });
}

export async function openGalleryModal(eventId, events) {
  const eventData = events.find((ev) => ev.id === eventId);
  if (!eventData) return;

  const modalEl = document.getElementById("galleryModal");
  const titleEl = document.getElementById("galleryModalLabel");
  const galleryContainer = document.getElementById("gallery-container");
  if (!modalEl || !galleryContainer) return;

  if (titleEl) {
    titleEl.textContent =
      eventData.galleryTitle || `${eventData.name} - ${eventData.date}`;
  }

  galleryContainer.innerHTML = `<p class="m-0">Loading photos…</p>`;

  let images = [];
  try {
    images = await fetchDriveFolderImages(eventData.driveFolderId);
  } catch (err) {
    console.error(err);
    galleryContainer.innerHTML = `<p class="text-danger m-0">Couldn’t load photos.</p>`;
    return;
  }

  if (!images.length) {
    galleryContainer.innerHTML = `<p class="m-0">No photos found.</p>`;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "row g-2";

  images.forEach((image) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4";

    const imgContainer = document.createElement("div");
    imgContainer.className = "img-thumbnail-container";

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt || "";
    img.className = "img-fluid thumbnail";
    img.loading = "lazy";

    img.onclick = function () {
      showFullSizeImage(image.full || image.src, image.alt);
    };

    imgContainer.appendChild(img);
    col.appendChild(imgContainer);
    grid.appendChild(col);
  });

  galleryContainer.innerHTML = "";
  galleryContainer.appendChild(grid);

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();

  modalEl.addEventListener("hidden.bs.modal", cleanupBackdrop, { once: true });
}

function showFullSizeImage(src, alt) {
  let fullImageModal = document.getElementById("fullImageModal");

  if (!fullImageModal) {
    fullImageModal = document.createElement("div");
    fullImageModal.id = "fullImageModal";
    fullImageModal.className = "modal fade";
    fullImageModal.setAttribute("tabindex", "-1");

    fullImageModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center p-0">
            <img id="fullSizeImg" class="img-fluid" src="" alt="">
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(fullImageModal);

    const closeBtn = fullImageModal.querySelector(".btn-close");
    closeBtn.addEventListener("click", function () {
      const bsModal = bootstrap.Modal.getInstance(fullImageModal);
      if (bsModal) bsModal.hide();
    });
  }

  const fullSizeImg = fullImageModal.querySelector("#fullSizeImg");
  fullSizeImg.src = src;
  fullSizeImg.alt = alt || "";

  const bsModal = new bootstrap.Modal(fullImageModal);
  bsModal.show();
}

function cleanupBackdrop() {
  const backdrops = document.querySelectorAll(".modal-backdrop");
  backdrops.forEach((backdrop) => {
    if (backdrop && backdrop.parentNode) {
      backdrop.parentNode.removeChild(backdrop);
    }
  });

  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

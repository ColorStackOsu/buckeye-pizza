import EVENTS_DATA from "./events/events-data.js";
import {
  renderEventCards,
  attachEventCardHandlers,
} from "./events/events-render.js";
import BOARD_DATA from "./eboard/eboard-data.js";
import { initEboard } from "./eboard/eboard-render.js";
import { initRevealAnimations } from "./shared/reveal.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Events
  initRevealAnimations();
  initEboard(BOARD_DATA, { defaultYear: "2025-2026" });
  await renderEventCards(EVENTS_DATA, "event-container");
  attachEventCardHandlers(EVENTS_DATA, "event-container");
  initRevealAnimations();
});

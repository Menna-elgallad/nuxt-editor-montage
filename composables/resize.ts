import { TimeLineStore } from "~~/stores/timeline";
export const useResize = (
  elementClassName: string,
  isSlide: boolean = false,
  limitWidth?: number
) => {
  const timeLineStore = TimeLineStore();
  let box = null;
  let isHandlerDragging = false;
  let boxAminWidth = 60;
  let new_width = 0;
  let current_width = 0;

  document.addEventListener("mousedown", function (e: MouseEvent) {
    // If mousedown event is fired from .handler, toggle flag to true
    if (e.target.classList.contains(elementClassName)) {
      isHandlerDragging = true;
      box = e.target.parentElement;
      if (isSlide && !box.classList.contains("isActive")) {
        isHandlerDragging = false;
      }
    }
  });
  document.addEventListener("mousemove", function (e) {
    // Don't do anything if dragging flag is false or
    if (!isHandlerDragging) {
      return false;
    }
    current_width = box.style.width;
    box.style.width = new_width + "px";
    const slideId = box.id.split("slide-shape-")[1];
    timeLineStore.changeActiveWidth(new_width, !!slideId, slideId);
    if ((new_width = e.clientX - box.offsetLeft - 9) >= boxAminWidth) {
    }
  });

  document.addEventListener("mouseup", function (e) {
    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
  });

  return current_width;
};

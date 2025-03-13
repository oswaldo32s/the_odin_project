import createElement from "../functions/elements.js";

export default function slideShow(object = []) {
  const itemCount = object.length - 1;
  let currentSlide = 0;
  let slideInterval;

  function nextSlide() {
    if (currentSlide == itemCount) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    resetInterval();
    renderSlides();
  }

  function previousSlide() {
    if (currentSlide == 0) {
      currentSlide = itemCount;
    } else {
      currentSlide--;
    }
    resetInterval();
    renderSlides();
  }

  function renderSlides() {
    const slideContainer = document.querySelector(".slides-container");
    slideContainer.innerHTML = "";

    object.forEach((item, index) => {
      const slide = createElement("img", {
        class: `slide ${index == currentSlide ? "active" : "slide"}`,
        attribute: {
          src: item.img,
        },
      });

      slideContainer.appendChild(slide);
    });
  }

  const slideShow = createElement("div", {
    class: "slideshow",
    childElements: [
      createElement("button", {
        class: "slide-button",
        text: "<",
        events: {
          click: previousSlide,
        },
      }),
      createElement("div", {
        class: "slides-container",
        childElements: object.map((item, index) =>
          createElement("img", {
            class: `slide ${index == currentSlide ? "active" : "slide"}`,
            attribute: {
              src: item.img,
            },
          })
        ),
      }),
      createElement("button", {
        class: "slide-button",
        text: ">",
        events: {
          click: nextSlide,
        },
      }),
    ],
  });

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  startAutoSlide();

  return slideShow;
}

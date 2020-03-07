const navElements = document.getElementsByClassName("nav-item");

function navOnMouseEnter(e) {
  const navContent = e.target.querySelector(".nav-item-content");
  navContent.style.display = "inline-block";
}

function navOnMouseLeave(e) {
  const navContent = e.target.querySelector(".nav-item-content");
  navContent.style.display = "none";
}

Array.from(navElements).forEach(navElement => {
  navElement.addEventListener("mouseenter", navOnMouseEnter);
  navElement.addEventListener("mouseleave", navOnMouseLeave);
});

// ------------------------

const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const navItems = document.querySelector(".nav-items");

hamburgerMenuIcon.addEventListener("click", () => {
  navItems.classList.toggle("mobile-menu-open");
});

// ------------------------

const slider = (() => {
  const imageSliderContainer = document.querySelector(
    ".image-slider-container"
  );
  const imageSlider = imageSliderContainer.querySelector(".image-slider");
  const imageSliderDots = Array.from(
    imageSliderContainer.querySelectorAll(".slider-dots .slider-dot")
  );

  let previousImage = 1;
  let currentImage = 1;
  const totalImages = 4;

  let nextSlideTimer = 0;

  const nextSlide = () => {
    previousImage = currentImage;
    currentImage = (currentImage % totalImages) + 1;
  };

  setInterval(() => {
    nextSlideTimer++;
    console.log(nextSlideTimer);

    if (nextSlideTimer >= 5) {
      nextSlide();
      renderImage();
      nextSlideTimer = 0;
    }
  }, 1000);

  const previousSlide = () => {
    if (currentImage === 1) {
      currentImage = 4;
    } else {
      currentImage--;
    }
  };

  const markSliderDot = index => {
    imageSliderDots.forEach(sliderDot =>
      sliderDot.classList.remove("selected")
    );
    imageSliderDots[index].classList.toggle("selected");
  };

  const sliderDotClickHandler = index => {
    previousImage = currentImage;
    currentImage = index;
    renderImage();
  };

  const renderImage = () => {
    const bottomImg = imageSlider.querySelector(".hidden-img");
    const topImg = imageSlider.querySelector(".main-img");

    topImg.classList.add("fade");
    topImg.src = `./img/image-${previousImage}.png`;

    bottomImg.src = `./img/image-${currentImage}.png`;

    markSliderDot(currentImage - 1);

    topImg.addEventListener("transitionend", () => {
      topImg.src = `./img/image-${currentImage}.png`;
      setTimeout(() => {
        topImg.classList.remove("fade");
      }, 250);
    });
  };

  imageSliderContainer.addEventListener("click", e => {
    if (document.querySelector(".main-img").classList.contains("fade")) {
      return;
    }
    if (e.target.classList.contains("slider-control")) {
      previousImage = currentImage;

      if (e.target.classList.contains("slider-previous")) {
        previousSlide();
      } else if (e.target.classList.contains("slider-next")) {
        nextSlide();
      }
      renderImage();
      nextSlideTimer = 0;
    } else if (e.target.classList.contains("slider-dot")) {
      const index = parseInt(e.target.getAttribute("data-slide-index"));
      sliderDotClickHandler(index);
      nextSlideTimer = 0;
    }
  });
})();

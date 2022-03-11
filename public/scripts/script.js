"use strict";

function elementInViewport(el) {
  let bounding = el.getBoundingClientRect();
  let myElementHeight = el.offsetHeight;
  let myElementWidth = el.offsetWidth;

  return (
    bounding.top >= -myElementHeight &&
    bounding.left >= -myElementWidth &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight
  );
}

(function () {
  const menumusic = document.getElementById("menumusic");

  function startPres() {
    document.querySelector(".load-pres").classList.add("pres-started");
    document.querySelector("html").classList.add("presenting");
    document.body.scrollTo(0, 0);
    window.scrollTo(0, 0);
    let currentVolume = 1;
    const fadeAudioOut = setInterval(() => {
      currentVolume -= 0.05;
      if (currentVolume <= 0) {
        clearInterval(fadeAudioOut);
        menumusic.pause();
        return;
      }
      menumusic.volume = currentVolume;
    }, 100);
    setTimeout(() => {
      document.querySelector(".load-pres").style.display = "none";
    }, 2500);
  }

  window.addEventListener("load", () => {
    const attemptPlay = setInterval(() => {
      menumusic.play();
      menumusic.volume = 1;
      if (!menumusic.paused) {
        document.querySelector(".load-pres").classList.add("load-beats");
        document.querySelector(".load-pres button").addEventListener("click", startPres);
        return clearInterval(attemptPlay);
      }
    }, 100);

    document.querySelector(".load-pres h1").textContent = "Presentation Ready";
    document.querySelector("html").classList.add("loaded");
  });

  const rickroll = document.querySelector(".rickroll");
  document.getElementById("celebrate").addEventListener("click", () => {
    // Rickroll

    rickroll.classList.add("rickroll--shown");
    rickroll.querySelector("video").play();
  });

  // Animate in scrolling

  const slides = document.querySelectorAll(".slide");

  function handleInView() {
    for (let i = 0, n = slides.length; i < n; ++i) {
      const slide = slides[i];

      if (elementInViewport(slide)) {
        slide.classList.add("slide--seen");
      }
    }
  }

  document.addEventListener("scroll", handleInView, false);
  document.addEventListener("resize", handleInView, false);
})();

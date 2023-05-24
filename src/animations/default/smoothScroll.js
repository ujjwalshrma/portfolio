import { gsap } from "gsap";

import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export const smoothScroll = () => {
  const smoother = new ScrollSmoother.create({
    smooth: 1.3, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    normalizeScroll: true,
  });

  function getSamePageAnchor(link) {
    if (
      link.protocol !== window.location.protocol ||
      link.host !== window.location.host ||
      link.pathname !== window.location.pathname ||
      link.search !== window.location.search
    ) {
      return false;
    }

    return link.hash;
  }

  // Scroll to a given hash, preventing the event given if there is one
  function scrollToHash(hash, e) {
    const elem = hash ? document.querySelector(hash) : false;
    if (elem) {
      if (e) e.preventDefault();
      //gsap.to( window, { scrollTo: elem } );
      smoother.scrollTo(elem, true);
    }
  }

  // If a link's href is within the current page, scroll to it instead
  document.querySelectorAll("a[href]").forEach((a) => {
    a.addEventListener("click", (e) => {
      scrollToHash(getSamePageAnchor(a), e);
    });
  });

  // Scroll to the element in the URL's hash on load
  scrollToHash(window.location.hash);
};

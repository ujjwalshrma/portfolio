import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const scrollFadeIn = () => {
  const elements = document.querySelectorAll(".scroll-in");

  elements.forEach((element) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    });

    if (element.classList.contains("delay")) {
      tl.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
      );

      return
    }

    tl.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );
  });
};

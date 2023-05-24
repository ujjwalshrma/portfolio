import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const textAnimation = () => {
  const texts = document.querySelectorAll(".text-animation");

  texts.forEach((text) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
      },
    });

    const splitText = new SplitText(text, { type: "lines" });

    // wrap lines in external divs
    splitText.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    if (text.classList.contains("delay")) {
      tl.fromTo(
        splitText.lines,
        { yPercent: 100 },
        { yPercent: 0, ease: "power4.out", duration: 1.7, stagger: 0.2, delay: 1.5 }
      );

      return;
    }

    tl.fromTo(
      splitText.lines,
      { y: 100 },
      { y: 0, ease: "power3.out", duration: 1.2, stagger: 0.1 }
    );
  });
};

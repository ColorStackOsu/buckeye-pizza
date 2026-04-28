//Stat grow animation (GSAP)

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".sm-stat").forEach((stat) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stat,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      markers: false,
      toggleActions: "play reverse play reverse",
    },
  });

  // More dramatic scaling effect
  tl.fromTo(
    stat,
    { scale: 0.9, opacity: 0.7 },
    { scale: 1.3, opacity: 1, ease: "power2.out" }
  );
});

import Image from "next/image";

export default function AboutHero() {
  return (
    <section id="about-hero" aria-labelledby="about-heading">
      <div className="about-gradient-overlay bg-light-gray pb-4">
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/images/Logo.png"
            alt="ColorStack Logo"
            width={450}
            height={450}
            className="w-[300px] md:w-[450px] h-auto mx-auto drop-shadow-md animate-bounce-slow"
            priority
            draggable={false}
          />

          <div className="w-8/12 mx-auto">
            <div className="text-center mx-auto">
              <h1
                id="about-heading"
                className="text-[3.5rem] font-normal text-white mb-0 animate-bounce-slow"
                style={{ textShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
              >
                ColorStack
              </h1>
              <h2
                className="text-2xl text-primary-red uppercase font-bold animate-bounce-slow"
                style={{ textShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
              >
                AT OSU
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import RevealAnimator from "@/components/RevealAnimator";

export default function ContactUsSection() {
  return (
    <section
      id="contact-us"
      className="bg-bg-white"
      aria-labelledby="contact-us-title"
    >
      <div className="px-4 py-4">
        <div className="w-full lg:w-10/12 md:w-10/12 mx-auto">
          <div className="text-center mx-auto p-4">
            <RevealAnimator variant="fade-up">
              <h2 className="font-semibold text-2xl" id="contact-us-title">
                Contact Us
              </h2>
            </RevealAnimator>

            <RevealAnimator variant="fade-up">
              <div className="flex justify-center items-center">
                <hr
                  className="divide-line-sub-right w-[200px]"
                  aria-hidden="true"
                />
                <svg
                  className="w-8 h-8 text-primary-red mx-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 11.801V4.697l-5.803 3.546L16 11.801Z" />
                </svg>
                <hr
                  className="divide-line-sub-left w-[200px]"
                  aria-hidden="true"
                />
              </div>
            </RevealAnimator>

            <RevealAnimator variant="fade-up">
              <h3 className="my-3 font-semibold text-xl">Reach Out</h3>
            </RevealAnimator>

            <RevealAnimator variant="fade-up">
              <p className="text-base">
                Want to collaborate on a tech talk or event with our community?
                We&apos;re here for it! For any questions or opportunities, drop
                us a line at{" "}
                <a
                  href="mailto:colorstackosu@gmail.com"
                  className="text-primary-red font-bold hover:underline"
                >
                  colorstackosu@gmail.com
                </a>
                .
              </p>
            </RevealAnimator>
          </div>
        </div>
      </div>
    </section>
  );
}

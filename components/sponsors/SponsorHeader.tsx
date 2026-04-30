export default function SponsorHeader() {
  return (
    <div className="sponsor-header-gradient-overlay bg-bg-white">
      <div className="w-full lg:w-8/12 md:w-10/12 mx-auto">
        <div className="flex flex-col justify-center text-center py-5 mx-auto w-3/4 relative z-10">
          <h2 className="text-primary-red text-3xl font-semibold">
            Our Partners in Progress
          </h2>
          <h5 className="mx-auto my-4 text-base font-normal leading-relaxed">
            We&apos;re proud to partner with industry leaders who share our
            vision of increasing diversity in tech. These organizations provide
            mentorship, resources, and opportunities to our members.
          </h5>
          <a
            href="#sponsorForm"
            className="inline-block bg-primary-red text-white px-4 py-2 mx-auto mb-2 rounded hover:bg-hover-red transition-colors relative z-[100]"
          >
            Become A Sponsor
          </a>
          <a
            href="/assets/Sponsorship Packet.pdf"
            className="text-gray-500 uppercase text-xs tracking-wide hover:text-gray-700 transition-colors relative z-[100]"
          >
            Sponsorship Packet
          </a>
          <hr className="mx-auto mt-4 w-[10%] border-gray-300" />
        </div>
      </div>
    </div>
  );
}

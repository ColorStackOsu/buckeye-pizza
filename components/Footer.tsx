import Link from "next/link";
import Image from "next/image";

const pageLinks = [
  { href: "/", label: "Home", mobileOnly: true },
  { href: "/events", label: "Events", mobileOnly: false },
  { href: "/sponsors", label: "Sponsors", mobileOnly: false },
  { href: "/execboard", label: "Meet Us", mobileOnly: false },
  { href: "/about", label: "About Us", mobileOnly: false },
];

const socialLinks = [
  {
    href: "mailto:colorstackosu@gmail.com",
    label: "Email us",
    external: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 11.801V4.697l-5.803 3.546L16 11.801Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/colorstackosu/",
    label: "Instagram - opens in new tab",
    external: true,
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/colorstack-osu/",
    label: "LinkedIn - opens in new tab",
    external: true,
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
      </svg>
    ),
  },
  {
    href: "https://colorstackosu.slack.com/",
    label: "Slack - opens in new tab",
    external: true,
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681S15.296 7.57 14.37 7.57h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-dark text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="text-start md:text-center px-3">
          <Link href="/" aria-label="ColorStackOSU Home">
            <Image
              src="/images/Logo Horizontal.png"
              alt="ColorStackOSU Logo"
              width={180}
              height={50}
              className="h-12 w-auto inline-block"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation">
          <div className="flex flex-col md:flex-row md:justify-center justify-start gap-3 md:gap-10 py-4 md:py-2 px-4">
            {pageLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`footer-nav-link text-white/80 hover:text-white transition-colors${
                  link.mobileOnly ? " md:hidden block" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Social Media Buttons */}
        <div
          className="flex justify-center py-2 w-full gap-2"
          aria-label="Social media links"
        >
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-red text-white hover:bg-hover-red transition-colors"
              aria-label={social.label}
              {...(social.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center mt-2 mb-0 opacity-50 text-sm">
          © {currentYear} ColorStack Ohio State. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useState, FormEvent } from "react";

const WEB3FORMS_ACCESS_KEY = "2eec6c42-4291-446f-a039-6e09d797a067";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface FormData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function SponsorForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    contactEmail: "",
    message: "",
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact Name is required";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          companyName: formData.companyName,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          companyName: "",
          contactName: "",
          contactEmail: "",
          message: "",
        });
        setErrors({});
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <section id="sponsorForm" className="bg-brand-red">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — heading + pitch copy */}
          <div>
            <p className="font-display text-overline text-white/60 uppercase tracking-widest mb-4">
              Partner With Us
            </p>
            <h2 className="font-display text-display text-white leading-tight max-w-xl">
              Become a Sponsor
            </h2>
            <hr className="mt-6 mb-8 h-px border-none bg-white/40 w-24" />
            <p className="font-body text-white/80 text-subheading leading-relaxed mb-6">
              Interested in partnering with ColorStack@OSU? Fill out this quick
              form and our team will reach out to discuss partnership
              opportunities.
            </p>
            <ul className="space-y-3">
              {[
                "Access to 250+ talented students",
                "Brand visibility at all our events",
                "Direct pipeline to diverse tech talent",
                "Mentorship and recruiting opportunities",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-white/80 text-sm leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form card, top-aligned with left text */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10">
            <h3 className="font-display text-heading text-brand-dark mb-2 sr-only">
              Sponsor Contact Form
            </h3>

            {status === "success" && (
              <div
                className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6 text-center text-sm"
                role="alert"
              >
                Thank you! Your message has been sent successfully. We&apos;ll
                be in touch soon.
              </div>
            )}

            {status === "error" && (
              <div
                className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 text-center text-sm"
                role="alert"
              >
                Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Company Name */}
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="font-body text-sm font-medium text-brand-dark mb-1 block"
                >
                  Company Name
                  <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`font-body text-sm w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red/50 ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.companyName}
                  aria-describedby={
                    errors.companyName ? "companyName-error" : undefined
                  }
                />
                {errors.companyName && (
                  <p
                    id="companyName-error"
                    className="text-red-600 text-xs mt-1"
                    role="alert"
                  >
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Contact Name */}
              <div className="mb-4">
                <label
                  htmlFor="contactName"
                  className="font-body text-sm font-medium text-brand-dark mb-1 block"
                >
                  Contact Name
                  <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className={`font-body text-sm w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red/50 ${
                    errors.contactName ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.contactName}
                  aria-describedby={
                    errors.contactName ? "contactName-error" : undefined
                  }
                />
                {errors.contactName && (
                  <p
                    id="contactName-error"
                    className="text-red-600 text-xs mt-1"
                    role="alert"
                  >
                    {errors.contactName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="mb-4">
                <label
                  htmlFor="contactEmail"
                  className="font-body text-sm font-medium text-brand-dark mb-1 block"
                >
                  Email Address
                  <span className="text-brand-red">*</span>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`font-body text-sm w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red/50 ${
                    errors.contactEmail ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.contactEmail}
                  aria-describedby={
                    errors.contactEmail ? "contactEmail-error" : undefined
                  }
                />
                {errors.contactEmail && (
                  <p
                    id="contactEmail-error"
                    className="text-red-600 text-xs mt-1"
                    role="alert"
                  >
                    {errors.contactEmail}
                  </p>
                )}
              </div>

              {/* Message (Optional) */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="font-body text-sm font-medium text-brand-dark mb-1 block"
                >
                  Brief Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us a bit about your interest in partnering with ColorStack@OSU"
                  className="font-body text-sm w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-brand-dark hover:bg-brand-charcoal text-white px-8 py-3 rounded font-display text-overline uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

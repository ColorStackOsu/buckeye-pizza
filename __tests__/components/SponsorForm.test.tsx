import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SponsorForm from "@/components/sponsors/SponsorForm";

describe("SponsorForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all form fields", () => {
    render(<SponsorForm />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/brief message/i)).toBeInTheDocument();
  });

  it("renders the form heading and description", () => {
    render(<SponsorForm />);
    expect(screen.getByText("Become a Sponsor")).toBeInTheDocument();
    expect(
      screen.getByText(/interested in partnering with colorstack@osu/i),
    ).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<SponsorForm />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("has id='sponsorForm' for anchor linking", () => {
    render(<SponsorForm />);
    const section = document.getElementById("sponsorForm");
    expect(section).toBeInTheDocument();
  });

  it("shows validation errors when submitting with empty required fields", async () => {
    render(<SponsorForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Company Name is required")).toBeInTheDocument();
      expect(screen.getByText("Contact Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email Address is required")).toBeInTheDocument();
    });
  });

  it("does not call fetch when required fields are empty", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<SponsorForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Company Name is required")).toBeInTheDocument();
    });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("clears field error when user types in that field", async () => {
    render(<SponsorForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Company Name is required")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" },
    });

    expect(
      screen.queryByText("Company Name is required"),
    ).not.toBeInTheDocument();
  });

  it("shows success message on successful submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<SponsorForm />);

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(screen.getByLabelText(/contact name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane@acme.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/your message has been sent successfully/i),
      ).toBeInTheDocument();
    });
  });

  it("clears form fields after successful submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<SponsorForm />);

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(screen.getByLabelText(/contact name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane@acme.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/company name/i)).toHaveValue("");
      expect(screen.getByLabelText(/contact name/i)).toHaveValue("");
      expect(screen.getByLabelText(/email address/i)).toHaveValue("");
    });
  });

  it("shows error message on failed submission and preserves data", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    render(<SponsorForm />);

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(screen.getByLabelText(/contact name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane@acme.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    // Data should be preserved on error
    expect(screen.getByLabelText(/company name/i)).toHaveValue("Acme Corp");
    expect(screen.getByLabelText(/contact name/i)).toHaveValue("Jane Doe");
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      "jane@acme.com",
    );
  });

  it("shows error message on network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<SponsorForm />);

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(screen.getByLabelText(/contact name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane@acme.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("sends correct data to Web3Forms API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<SponsorForm />);

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(screen.getByLabelText(/contact name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane@acme.com" },
    });
    fireEvent.change(screen.getByLabelText(/brief message/i), {
      target: { value: "We want to sponsor!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.web3forms.com/submit",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "2eec6c42-4291-446f-a039-6e09d797a067",
            companyName: "Acme Corp",
            contactName: "Jane Doe",
            contactEmail: "jane@acme.com",
            message: "We want to sponsor!",
          }),
        }),
      );
    });
  });
});

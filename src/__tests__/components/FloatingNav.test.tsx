import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingNav } from "@/components/FloatingNav";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "components.floatingNav.home": "Home",
      "components.floatingNav.games": "Games",
      "components.floatingNav.codes": "Codes",
      "components.floatingNav.guides": "Guides",
      "components.floatingNav.settings": "Settings",
      "components.floatingNav.menu": "menu",
      "components.floatingNav.close": "Close",
    };
    return translations[key] || key;
  },
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/en",
}));

describe("FloatingNav Component", () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });
  });

  describe("Rendering", () => {
    it("should render floating pill button", () => {
      render(<FloatingNav locale="en" />);

      const menuButton = screen.getByText("menu");
      expect(menuButton).toBeInTheDocument();
    });

    it("should render with correct ARIA attributes", () => {
      render(<FloatingNav locale="en" />);

      const button = screen.getByRole("button", { name: /menu/i });
      expect(button).toHaveAttribute("aria-label", "menu");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should render navigation items when open", () => {
      render(<FloatingNav locale="en" />);

      // Click to open menu
      const menuButton = screen.getByText(/menu/i);
      fireEvent.click(menuButton);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Games")).toBeInTheDocument();
      expect(screen.getByText("Codes")).toBeInTheDocument();
      expect(screen.getByText("Guides")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  describe("Menu Interaction", () => {
    it("should open menu when button is clicked", () => {
      render(<FloatingNav locale="en" />);

      const menuButton = screen.getByText(/menu/i);
      fireEvent.click(menuButton);

      expect(screen.getByText(/close/i)).toBeInTheDocument();
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should close menu when close button is clicked", () => {
      render(<FloatingNav locale="en" />);

      // Open menu
      fireEvent.click(screen.getByText(/menu/i));

      // Click close button in modal
      const closeButton = screen.getAllByText("Close")[1]; // Second Close is in modal
      fireEvent.click(closeButton);

      expect(screen.queryByText("Home")).not.toBeInTheDocument();
    });

    it("should close menu when backdrop is clicked", () => {
      render(<FloatingNav locale="en" />);

      // Open menu
      fireEvent.click(screen.getByText(/menu/i));

      // Find and click backdrop
      const backdrop = document.querySelector(".bg-black\\/60");
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(screen.queryByText("Home")).not.toBeInTheDocument();
      }
    });

    it("should toggle menu state", () => {
      render(<FloatingNav locale="en" />);

      const menuButton = screen.getByText(/menu/i);

      // Open
      fireEvent.click(menuButton);
      expect(screen.getByText("Home")).toBeInTheDocument();

      // Close by clicking menu button again
      fireEvent.click(menuButton);
      expect(screen.queryByText("Home")).not.toBeInTheDocument();
    });
  });

  describe("Scroll Behavior", () => {
    it("should hide nav when scrolling down", () => {
      const { container } = render(<FloatingNav locale="en" />);

      // Simulate scroll down
      window.scrollY = 150;
      fireEvent.scroll(window);

      const floatingContainer = container.querySelector(".fixed.top-6");
      expect(floatingContainer).toHaveClass("-translate-y-20");
    });

    it("should show nav when scrolling up", () => {
      const { container } = render(<FloatingNav locale="en" />);

      // Scroll down first
      window.scrollY = 150;
      fireEvent.scroll(window);

      // Then scroll up
      window.scrollY = 100;
      fireEvent.scroll(window);

      const floatingContainer = container.querySelector(".fixed.top-6");
      expect(floatingContainer).toHaveClass("translate-y-0");
    });

    it("should remain visible when scroll position is below threshold", () => {
      const { container } = render(<FloatingNav locale="en" />);

      window.scrollY = 50;
      fireEvent.scroll(window);

      const floatingContainer = container.querySelector(".fixed.top-6");
      expect(floatingContainer).toHaveClass("translate-y-0");
    });
  });

  describe("Body Scroll Lock", () => {
    it("should prevent body scroll when menu is open", () => {
      render(<FloatingNav locale="en" />);

      fireEvent.click(screen.getByText(/menu/i));

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore body scroll when menu is closed", () => {
      render(<FloatingNav locale="en" />);

      // Open menu
      fireEvent.click(screen.getByText(/menu/i));

      // Close menu
      fireEvent.click(screen.getByText(/close/i));

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Navigation Items", () => {
    it("should render correct locale-based URLs", () => {
      render(<FloatingNav locale="zh" />);

      fireEvent.click(screen.getByText(/menu/i));

      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveAttribute("href", "/zh");

      const gamesLink = screen.getByText("Games").closest("a");
      expect(gamesLink).toHaveAttribute("href", "/zh/games");
    });

    it("should display icons for navigation items", () => {
      render(<FloatingNav locale="en" />);

      fireEvent.click(screen.getByText(/menu/i));

      // Check for emoji icons
      expect(document.querySelector("text-3xl")).toBeInTheDocument();
    });
  });

  describe("Active State", () => {
    it("should highlight active navigation item", () => {
      render(<FloatingNav locale="en" />);

      fireEvent.click(screen.getByText(/menu/i));

      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveClass("bg-purple-500/20");
    });
  });

  describe("Accessibility", () => {
    it("should have proper button labels", () => {
      render(<FloatingNav locale="en" />);

      const button = screen.getByRole("button", { name: /menu/i });
      expect(button).toBeInTheDocument();
    });

    it("should render close button in modal", () => {
      render(<FloatingNav locale="en" />);

      fireEvent.click(screen.getByText(/menu/i));

      const closeButtons = screen.getAllByText("Close");
      expect(closeButtons.length).toBeGreaterThan(0);
    });
  });

  describe("Icon Animation", () => {
    it("should rotate icon when menu is open", () => {
      const { container } = render(<FloatingNav locale="en" />);

      const svg = container.querySelector("svg");

      expect(svg).not.toHaveClass("rotate-90");

      fireEvent.click(screen.getByText(/menu/i));

      expect(svg).toHaveClass("rotate-90");
    });
  });
});

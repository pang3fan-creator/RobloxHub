import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuickCard } from "@/components/QuickCard";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "components.quickCard.lowRisk": "Low Risk",
      "components.quickCard.mediumRisk": "Medium Risk",
      "components.quickCard.highRisk": "High Risk",
      "components.quickCard.extremeRisk": "Extreme",
      "components.quickCard.showDetails": "Show Details",
      "components.quickCard.hideDetails": "Hide Details",
    };
    return translations[key] || key;
  },
}));

describe("QuickCard Component", () => {
  const mockProps = {
    id: "test-card-1",
    title: "Test Anomaly",
    description: "This is a test anomaly description",
    riskLevel: "medium" as const,
    location: "Room 101",
    trigger: "Click on object",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe("Rendering", () => {
    it("should render the card with title", () => {
      render(<QuickCard {...mockProps} />);

      expect(screen.getByText("Test Anomaly")).toBeInTheDocument();
    });

    it("should render description when provided", () => {
      render(<QuickCard {...mockProps} />);

      expect(
        screen.getByText("This is a test anomaly description"),
      ).toBeInTheDocument();
    });

    it("should render risk level badge", () => {
      render(<QuickCard {...mockProps} />);

      expect(screen.getByText("Medium Risk")).toBeInTheDocument();
    });

    it("should render location with icon", () => {
      render(<QuickCard {...mockProps} />);

      expect(screen.getByText("Room 101")).toBeInTheDocument();
    });

    it("should render trigger with icon", () => {
      render(<QuickCard {...mockProps} />);

      expect(screen.getByText("Click on object")).toBeInTheDocument();
    });
  });

  describe("Risk Levels", () => {
    it("should display low risk badge", () => {
      render(<QuickCard {...mockProps} riskLevel="low" />);

      expect(screen.getByText("Low Risk")).toBeInTheDocument();
    });

    it("should display medium risk badge", () => {
      render(<QuickCard {...mockProps} riskLevel="medium" />);

      expect(screen.getByText("Medium Risk")).toBeInTheDocument();
    });

    it("should display high risk badge", () => {
      render(<QuickCard {...mockProps} riskLevel="high" />);

      expect(screen.getByText("High Risk")).toBeInTheDocument();
    });

    it("should display extreme risk badge", () => {
      render(<QuickCard {...mockProps} riskLevel="extreme" />);

      expect(screen.getByText("Extreme")).toBeInTheDocument();
    });
  });

  describe("Found Checkbox", () => {
    it("should render unchecked checkbox by default", () => {
      render(<QuickCard {...mockProps} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });

    it("should toggle found state when clicked", () => {
      render(<QuickCard {...mockProps} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("should apply line-through to title when found", () => {
      render(<QuickCard {...mockProps} />);

      const checkbox = screen.getByRole("checkbox");
      const title = screen.getByText("Test Anomaly");

      expect(title).not.toHaveClass("line-through");

      fireEvent.click(checkbox);
      expect(title).toHaveClass("line-through");
    });

    it("should save to localStorage when marked as found", () => {
      const onFoundChange = jest.fn();
      render(<QuickCard {...mockProps} onFoundChange={onFoundChange} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(localStorage.getItem("quickcard-found-test-card-1")).toBe("true");
      expect(onFoundChange).toHaveBeenCalledWith("test-card-1", true);
    });

    it("should restore found state from localStorage", () => {
      localStorage.setItem("quickcard-found-test-card-1", "true");

      render(<QuickCard {...mockProps} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
  });

  describe("Expandable Details", () => {
    it("should not render expand button when no details provided", () => {
      render(<QuickCard {...mockProps} />);

      expect(screen.queryByText("Show Details")).not.toBeInTheDocument();
    });

    it("should render expand button when details provided", () => {
      render(
        <QuickCard {...mockProps} details={<p>Additional details here</p>} />,
      );

      expect(screen.getByText("Show Details")).toBeInTheDocument();
    });

    it("should expand details when button is clicked", () => {
      render(
        <QuickCard {...mockProps} details={<p>Additional details here</p>} />,
      );

      const expandButton = screen.getByText("Show Details");
      fireEvent.click(expandButton);

      expect(screen.getByText("Additional details here")).toBeInTheDocument();
      expect(screen.getByText("Hide Details")).toBeInTheDocument();
    });

    it("should collapse details when clicked again", () => {
      render(
        <QuickCard {...mockProps} details={<p>Additional details here</p>} />,
      );

      const expandButton = screen.getByText("Show Details");
      fireEvent.click(expandButton);
      fireEvent.click(expandButton);

      expect(
        screen.queryByText("Additional details here"),
      ).not.toBeInTheDocument();
    });

    it("should hide metadata when expanded", () => {
      render(
        <QuickCard
          {...mockProps}
          details={<p>Additional details here</p>}
          location="Room 101"
        />,
      );

      const expandButton = screen.getByText("Show Details");
      fireEvent.click(expandButton);

      // Location should be hidden when expanded
      const locationElements = screen.getAllByText("Room 101");
      expect(locationElements.length).toBeGreaterThan(0);
    });
  });

  describe("Styling", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <QuickCard {...mockProps} className="custom-class" />,
      );

      const card = container.querySelector(".quick-card");
      expect(card).toHaveClass("custom-class");
    });

    it("should apply opacity class when found", () => {
      render(<QuickCard {...mockProps} initialFound={true} />);

      const card = screen.getByText("Test Anomaly").closest(".quick-card");
      expect(card).toHaveClass("opacity-60");
    });
  });

  describe("Callbacks", () => {
    it("should call onFoundChange with correct parameters", () => {
      const onFoundChange = jest.fn();

      render(<QuickCard {...mockProps} onFoundChange={onFoundChange} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(onFoundChange).toHaveBeenCalledWith("test-card-1", true);

      fireEvent.click(checkbox);

      expect(onFoundChange).toHaveBeenCalledWith("test-card-1", false);
    });
  });
});

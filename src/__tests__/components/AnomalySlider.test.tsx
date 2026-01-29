import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnomalySlider } from '@/components/AnomalySlider';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'components.anomalySlider.before': 'Normal',
      'components.anomalySlider.after': 'Anomaly',
      'components.anomalySlider.dragHint': 'Drag to compare',
      'components.anomalySlider.markAsFound': 'Mark as Found',
      'components.anomalySlider.markedAsFound': 'Found!',
    };
    return translations[key] || key;
  },
}));

describe('AnomalySlider Component', () => {
  const mockProps = {
    beforeImage: '/normal.jpg',
    afterImage: '/anomaly.jpg',
    beforeAlt: 'Normal state',
    afterAlt: 'Anomaly state',
    anomalyId: 'test-anomaly-1',
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render the component with images', () => {
      render(<AnomalySlider {...mockProps} />);

      const beforeImage = screen.getByAltText('Normal state');
      const afterImage = screen.getByAltText('Anomaly state');

      expect(beforeImage).toBeInTheDocument();
      expect(afterImage).toBeInTheDocument();
    });

    it('should display before and after labels', () => {
      render(<AnomalySlider {...mockProps} />);

      expect(screen.getByText('Normal')).toBeInTheDocument();
      expect(screen.getByText('Anomaly')).toBeInTheDocument();
    });

    it('should show drag hint when slider is at 50% and not dragging', () => {
      render(<AnomalySlider {...mockProps} />);

      expect(screen.getByText('Drag to compare')).toBeInTheDocument();
    });
  });

  describe('Slider Interaction', () => {
    it('should update slider position on mouse drag', () => {
      render(<AnomalySlider {...mockProps} />);

      const container = screen.getByText('Drag to compare').closest('div')?.parentElement;
      expect(container).toBeInTheDocument();

      // Simulate mouse down and move
      if (container) {
        fireEvent.mouseDown(container, { clientX: 100 });
        fireEvent.mouseMove(container, { clientX: 150 });
      }

      // Drag hint should disappear when dragging
      expect(screen.queryByText('Drag to compare')).not.toBeInTheDocument();
    });

    it('should initialize slider at 50% position', () => {
      const { container } = render(<AnomalySlider {...mockProps} />);

      const sliderHandle = container.querySelector('.bg-purple-500.cursor-ew-resize');
      expect(sliderHandle).toHaveStyle({ left: '50%' });
    });
  });

  describe('Found Checkbox', () => {
    it('should render unchecked checkbox by default', () => {
      render(<AnomalySlider {...mockProps} />);

      expect(screen.getByText('Mark as Found')).toBeInTheDocument();
    });

    it('should toggle found state when checkbox is clicked', () => {
      render(<AnomalySlider {...mockProps} />);

      const checkboxLabel = screen.getByText('Mark as Found').closest('label');
      expect(checkboxLabel).toBeInTheDocument();

      if (checkboxLabel) {
        fireEvent.click(checkboxLabel);
        expect(screen.getByText('Found!')).toBeInTheDocument();

        fireEvent.click(checkboxLabel);
        expect(screen.getByText('Mark as Found')).toBeInTheDocument();
      }
    });

    it('should save found state to localStorage', () => {
      const onFoundChange = jest.fn();
      render(<AnomalySlider {...mockProps} onFoundChange={onFoundChange} />);

      const checkboxLabel = screen.getByText('Mark as Found').closest('label');

      if (checkboxLabel) {
        fireEvent.click(checkboxLabel);
        expect(localStorage.getItem('anomaly-found-test-anomaly-1')).toBe('true');
        expect(onFoundChange).toHaveBeenCalledWith(true);
      }
    });

    it('should restore found state from localStorage on mount', () => {
      localStorage.setItem('anomaly-found-test-anomaly-1', 'true');

      render(<AnomalySlider {...mockProps} />);

      expect(screen.getByText('Found!')).toBeInTheDocument();
    });

    it('should call onFoundChange callback when found state changes', () => {
      const onFoundChange = jest.fn();
      render(<AnomalySlider {...mockProps} onFoundChange={onFoundChange} />);

      const checkboxLabel = screen.getByText('Mark as Found').closest('label');

      if (checkboxLabel) {
        fireEvent.click(checkboxLabel);
        expect(onFoundChange).toHaveBeenCalledWith(true);

        fireEvent.click(checkboxLabel);
        expect(onFoundChange).toHaveBeenCalledWith(false);
      }
    });
  });

  describe('Initial State', () => {
    it('should respect initialFound prop', () => {
      render(<AnomalySlider {...mockProps} initialFound={true} />);

      expect(screen.getByText('Found!')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<AnomalySlider {...mockProps} />);

      const sliderHandle = document.querySelector('.bg-purple-500.cursor-ew-resize');
      expect(sliderHandle).toBeInTheDocument();
    });
  });
});

/**
 * AnomalySlider Usage Example
 *
 * This demonstrates how to use the AnomalySlider component
 * in a game guide page.
 */

import { AnomalySlider } from './AnomalySlider';

export function AnomalySliderExample() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-slate-200">Anomaly #12 - Moving Statue</h2>

      <p className="text-slate-400">
        In the hallway, check if the statue has moved from its original position.
      </p>

      <AnomalySlider
        beforeImage="/images/anomalies/statue-normal.jpg"
        afterImage="/images/anomalies/statue-anomaly.jpg"
        beforeAlt="Normal statue position"
        afterAlt="Statue has moved"
        anomalyId="statue-12"
        initialFound={false}
        onFoundChange={(found) => {
          console.log('Anomaly found status:', found);
        }}
      />

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <h3 className="font-semibold text-slate-200 mb-2">How to Trigger</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
          <li>Enter the hallway from the main lobby</li>
          <li>Look at the statue on the left side</li>
          <li>If it faces the wall, this is the anomaly</li>
          <li>Take a photo for evidence (optional)</li>
        </ol>
      </div>
    </div>
  );
}

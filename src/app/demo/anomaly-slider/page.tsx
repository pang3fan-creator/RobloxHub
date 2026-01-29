import { AnomalySlider } from '@/components/AnomalySlider';

/**
 * AnomalySlider Component Demo
 *
 * This page demonstrates the signature AnomalySlider component
 * with sample placeholder images.
 */
export default function AnomalySliderDemo() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AnomalySlider Component Demo
          </h1>
          <p className="text-slate-400 text-lg">
            Interactive before/after comparison for anomaly hunting in Roblox horror games
          </p>
        </div>

        {/* Demo 1: Basic Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">Basic Usage</h2>
          <p className="text-slate-400 mb-6">
            Drag the slider to compare "Normal" vs "Anomaly" states. Mark as found when you spot the difference.
          </p>

          <AnomalySlider
            beforeImage="https://placehold.co/800x400/1e293b/94a3b8?text=Normal+State&font=roboto"
            afterImage="https://placehold.co/800x400/581c87/c4b5fd?text=Anomaly+State&font=roboto"
            beforeAlt="Normal game state"
            afterAlt="Anomaly detected"
            anomalyId="demo-1"
            onFoundChange={(found) => console.log('Demo 1 found:', found)}
          />
        </section>

        {/* Demo 2: Real Example (if you have images) */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">Game Example</h2>
          <p className="text-slate-400 mb-6">
            Example of how it would look with actual game screenshots:
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Anomaly #7 - Lights Out</h3>
            <p className="text-slate-400 mb-4">
              Check if the hallway lights are functioning normally.
            </p>

            <AnomalySlider
              beforeImage="https://placehold.co/800x400/0f172a/e2e8f0?text=Lights+On&font=roboto"
              afterImage="https://placehold.co/800x400/020617/64748b?text=Lights+Off&font=roboto"
              beforeAlt="Normal lighting"
              afterAlt="Lights are out - anomaly!"
              anomalyId="lights-out-7"
            />

            <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded">
              <h4 className="font-semibold text-slate-300 mb-2">Risk Level: ⚠️ Medium</h4>
              <p className="text-sm text-slate-400">
                If the lights are out, proceed with caution. The entity may be nearby.
              </p>
            </div>
          </div>
        </section>

        {/* Feature List */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">Component Features</h2>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">✓</span>
              <div>
                <strong className="text-slate-200">Touch-optimized</strong>
                <p className="text-sm mt-1">44px touch target for comfortable thumb interaction on mobile</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">✓</span>
              <div>
                <strong className="text-slate-200">Persistent state</strong>
                <p className="text-sm mt-1">Found status saves to localStorage, survives page refresh</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">✓</span>
              <div>
                <strong className="text-slate-200">Dark mode native</strong>
                <p className="text-sm mt-1">Built for dark theme, matches horror game atmosphere</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">✓</span>
              <div>
                <strong className="text-slate-200">Responsive</strong>
                <p className="text-sm mt-1">200px height on mobile, 300px on desktop</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">✓</span>
              <div>
                <strong className="text-slate-200">i18n support</strong>
                <p className="text-sm mt-1">All labels support EN/ZH/ES translations</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Code Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">Usage</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`import { AnomalySlider } from '@/components/AnomalySlider';

<AnomalySlider
  beforeImage="/images/normal.jpg"
  afterImage="/images/anomaly.jpg"
  beforeAlt="Normal state"
  afterAlt="Anomaly state"
  anomalyId="statue-12"
  onFoundChange={(found) => console.log(found)}
/>`}</code>
            </pre>
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

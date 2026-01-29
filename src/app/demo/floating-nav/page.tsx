import { FloatingNav } from '@/components/FloatingNav';

/**
 * FloatingNav Component Demo
 *
 * This page demonstrates the mobile-first floating navigation
 * with sample content to test scroll behavior.
 */
export default function FloatingNavDemo() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 pb-32">
      <FloatingNav locale="en" />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            FloatingNav Component Demo
          </h1>
          <p className="text-slate-400 text-lg">
            Mobile-first pill-shaped floating navigation with glassmorphism effect
          </p>
        </div>

        {/* Instructions */}
        <section className="mb-12 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">How to Test</h2>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">1.</span>
              <span>Click the floating pill button at the bottom to open navigation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">2.</span>
              <span>Scroll down to see the auto-hide behavior</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">3.</span>
              <span>Scroll up to reveal the navigation button again</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">4.</span>
              <span>Click outside or close button to dismiss the modal</span>
            </li>
          </ul>
        </section>

        {/* Feature List */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-slate-200">Component Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Pill-shaped Design',
                description: 'Rounded full button with centered positioning',
                icon: '💊',
              },
              {
                title: 'Glassmorphism',
                description: 'Backdrop blur with semi-transparent background',
                icon: '🪟',
              },
              {
                title: 'Auto-hide on Scroll',
                description: 'Disappears when scrolling down, reappears on scroll up',
                icon: '📜',
              },
              {
                title: 'Semi-screen Modal',
                description: 'Bottom sheet style navigation menu',
                icon: '📱',
              },
              {
                title: 'Touch-optimized',
                description: '48px height for comfortable thumb interaction',
                icon: '👆',
              },
              {
                title: 'Active State',
                description: 'Highlights current page with purple accent',
                icon: '🎯',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-200 mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Long Content for Scroll Testing */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-slate-200">Scroll Test Content</h2>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg text-slate-200 mb-2">
                  Content Block #{index + 1}
                </h3>
                <p className="text-slate-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Scroll down to test the auto-hide behavior of the floating navigation.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">Usage</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`import { FloatingNav } from '@/components/FloatingNav';

export default function Layout({ children, params: { locale } }) {
  return (
    <>
      {children}
      <FloatingNav locale={locale} />
    </>
  );
}`}</code>
            </pre>
          </div>
        </section>

        {/* Design Tokens */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-slate-200">Design Tokens</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Token</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Value</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="px-4 py-3 text-purple-400 font-mono text-xs">Height</td>
                  <td className="px-4 py-3 text-slate-300">48px</td>
                  <td className="px-4 py-3 text-slate-400">Touch target minimum</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-purple-400 font-mono text-xs">Width</td>
                  <td className="px-4 py-3 text-slate-300">min(200px, 80vw)</td>
                  <td className="px-4 py-3 text-slate-400">Responsive pill size</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-purple-400 font-mono text-xs">Background</td>
                  <td className="px-4 py-3 text-slate-300">rgba(15, 23, 42, 0.8)</td>
                  <td className="px-4 py-3 text-slate-400">Semi-transparent slate</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-purple-400 font-mono text-xs">Backdrop</td>
                  <td className="px-4 py-3 text-slate-300">blur-md</td>
                  <td className="px-4 py-3 text-slate-400">Glassmorphism effect</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-purple-400 font-mono text-xs">Border</td>
                  <td className="px-4 py-3 text-slate-300">slate-700</td>
                  <td className="px-4 py-3 text-slate-400">Subtle separation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-purple-400 font-mono text-xs">Border-radius</td>
                  <td className="px-4 py-3 text-slate-300">full</td>
                  <td className="px-4 py-3 text-slate-400">Pill shape</td>
                </tr>
              </tbody>
            </table>
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

/**
 * HowToPlay - 游戏玩法说明组件
 *
 * 用于在 MDX 内容中展示游戏的基本玩法说明。
 * 包含三个核心步骤：工作流程、识别异常、生存策略。
 */
export function HowToPlay() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-purple-400 mb-2">1. Work Flow</h3>
          <p className="text-sm text-slate-400">
            Greet customers, take orders, prepare shawarma. Complete the
            &quot;safety check&quot; for each customer.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-purple-400 mb-2">
            2. Identify Anomalies
          </h3>
          <p className="text-sm text-slate-400">
            Check security cameras from multiple angles. Spot strange
            behavior, unusual appearances, or paranormal events.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-purple-400 mb-2">3. Survival</h3>
          <p className="text-sm text-slate-400">
            Don&apos;t serve anomalies. Keep normal customers happy. Survive
            until 6 AM.
          </p>
        </div>
      </div>
    </div>
  );
}

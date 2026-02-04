import Link from "next/link";
import { useTranslations } from "next-intl";

interface TrendingGame {
  slug: string;
  name: string;
}

interface TrendingNowProps {
  locale: string;
  games: TrendingGame[];
}

const gradients = [
  "from-purple-600 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-yellow-500",
  "from-green-500 to-emerald-400",
  "from-rose-500 to-red-500",
];

export function TrendingNow({ locale, games }: TrendingNowProps) {
  const t = useTranslations("home.trending");

  // 现有游戏列表 - 只有这些游戏的链接是有效的
  const existingGames = new Set(["scary-shawarma-kiosk", "sorcerer-ascent"]);

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>⚡</span>
          {t("title")}
        </h2>
        <span className="text-slate-600 text-sm font-medium cursor-not-allowed">
          {t("viewAll")} →
        </span>
      </div>

      {/* Scrollable Tags */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Tags container */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
          {games.map((game, index) => {
            const isGameExist = existingGames.has(game.slug);

            return isGameExist ? (
              <Link
                key={game.slug}
                href={`/${locale}/games/${game.slug}`}
                className={`
                  flex-shrink-0 px-5 py-2.5 rounded-full
                  bg-gradient-to-r ${gradients[index % gradients.length]}
                  text-white font-medium text-sm
                  shadow-lg shadow-purple-500/20
                  transition-all duration-200
                  hover:scale-110 hover:shadow-xl
                  active:scale-105
                `}
              >
                {game.name}
              </Link>
            ) : (
              <span
                key={game.slug}
                className={`
                  flex-shrink-0 px-5 py-2.5 rounded-full
                  bg-gradient-to-r ${gradients[index % gradients.length]}
                  text-white/50 font-medium text-sm
                  shadow-lg shadow-purple-500/20
                  cursor-not-allowed opacity-60
                `}
              >
                {game.name}
              </span>
            );
          })}
        </div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

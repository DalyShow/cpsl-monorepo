import { TopNav } from "@cpsl/ui";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/lib/sanity/client";
import {
  NAV_ITEMS_GROQ,
  resolveTopNavItems,
  type SiteNavSettings,
} from "@/lib/nav-items";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = { _type: string; _key: string; [key: string]: any };
type PageData = { sections?: Section[] };

export default async function Home() {
  // Fetch nav settings and page sections in parallel
  const [settings, page] = await Promise.all([
    sanityFetch<SiteNavSettings>(
      `*[_type == "siteSettings"][0]{ ${NAV_ITEMS_GROQ}, ctaLabel, ctaHref }`
    ),
    sanityFetch<PageData>(
      // Dereference image assets so components receive a ready-to-use URL
      `*[_type == "homePage"][0]{
        sections[]{
          ...,
          backgroundImage{ ..., asset->{ url } },
          backgroundImages[]{ ..., asset->{ url } },
          image{ ..., asset->{ url } },
          bottomImage{ ..., asset->{ url } },
          lottie{ ..., asset->{ url } },
          bottomLottie{ ..., asset->{ url } },
          logos[]{ ..., asset->{ url } },
          tiles[]{
            ...,
            image{ ..., asset->{ url }, "alt": asset->altText }
          }
        }
      }`
    ),
  ]);

  return (
    <>
      <TopNav
        items={resolveTopNavItems(settings?.navItems)}
        ctaLabel={settings?.ctaLabel ?? "Join Our League"}
        ctaHref={settings?.ctaHref ?? "/apply"}
        showLive={false}
      />

      {/* pt-20 = 80px — offsets the fixed nav height */}
      <main className="pt-20">
        {page?.sections?.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))}
      </main>
    </>
  );
}

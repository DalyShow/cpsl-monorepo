import { notFound } from "next/navigation";
import { TopNav } from "@cpsl/ui";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

type NavSettings = {
  navItems?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = { _type: string; _key: string; [key: string]: any };

type PageData = {
  title: string;
  sections?: Section[];
};

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: segments } = await params;

  // Support one or two levels: /about  or  /league-info/handbook
  const pageSlug   = segments[segments.length - 1];
  const parentSlug = segments.length > 1 ? segments[segments.length - 2] : "";

  const [settings, page] = await Promise.all([
    sanityFetch<NavSettings>(
      `*[_type == "siteSettings"][0]{ navItems, ctaLabel, ctaHref }`
    ),
    sanityFetch<PageData>(
      `*[_type == "page"
          && slug.current == $slug
          && (
            ($parentSlug == "" && !defined(parent))
            ||
            ($parentSlug != "" && parent->slug.current == $parentSlug)
          )
        ][0]{
          title,
          sections[]{
            ...,
            backgroundImage{ ..., asset->{ url } },
            backgroundImages[]{ ..., asset->{ url } },
            image{ ..., asset->{ url } },
            bottomImage{ ..., asset->{ url } },
            lottie{ ..., asset->{ url } },
            bottomLottie{ ..., asset->{ url } },
            logos[]{ ..., asset->{ url } }
          }
        }`,
      { slug: pageSlug, parentSlug }
    ),
  ]);

  if (!page) notFound();

  return (
    <>
      <TopNav
        items={settings?.navItems ?? undefined}
        ctaLabel={settings?.ctaLabel ?? "Join Our League"}
        ctaHref={settings?.ctaHref ?? "/apply"}
        showLive={false}
      />
      <main className="pt-20">
        {page.sections?.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))}
      </main>
    </>
  );
}

import { notFound } from "next/navigation";
import { TopNav, SubNav } from "@cpsl/ui";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/lib/sanity/client";
import {
  NAV_ITEMS_GROQ,
  resolveTopNavItems,
  type SiteNavSettings,
} from "@/lib/nav-items";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = { _type: string; _key: string; [key: string]: any };

type SubNavEntry = {
  label: string;
  slug: string;
  parentSlug?: string | null;
};

type PageData = {
  title: string;
  sections?: Section[];
  subNavItems?: SubNavEntry[];
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
    sanityFetch<SiteNavSettings>(
      `*[_type == "siteSettings"][0]{ ${NAV_ITEMS_GROQ}, ctaLabel, ctaHref }`
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
          _id,
          title,
          "subNavItems": *[_type == "page"
            && (
              (defined(^.parent) && parent._ref == ^.parent._ref)
              || (!defined(^.parent) && parent._ref == ^._id)
            )
          ] | order(coalesce(navOrder, 9999) asc, title asc) {
            "label": coalesce(navLabel, title),
            "slug": slug.current,
            "parentSlug": parent->slug.current
          },
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

  const subNavItems =
    (page.subNavItems ?? [])
      .filter((i) => i.label && i.slug)
      .map((i) => ({
        label: i.label,
        href: i.parentSlug ? `/${i.parentSlug}/${i.slug}` : `/${i.slug}`,
      }));

  return (
    <>
      <TopNav
        items={resolveTopNavItems(settings?.navItems)}
        ctaLabel={settings?.ctaLabel ?? "Join Our League"}
        ctaHref={settings?.ctaHref ?? "/apply"}
        showLive={false}
      />
      <main className="pt-20">
        {subNavItems.length > 1 && <SubNav items={subNavItems} />}
        {page.sections?.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))}
      </main>
    </>
  );
}

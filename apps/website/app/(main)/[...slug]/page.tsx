import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SubNav } from "@cpsl/ui";
import { BlockRenderer, NO_REVEAL } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/lib/sanity/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: segments } = await params;
  const pageSlug = segments[segments.length - 1];
  const canonicalPath = "/" + segments.join("/");

  let page: { title?: string; seoDescription?: string } | null = null;
  try {
    page = await sanityFetch<{ title?: string; seoDescription?: string }>(
      `*[_type == "page" && slug.current == $slug][0]{ title, seoDescription }`,
      { slug: pageSlug }
    );
  } catch { /* fall through to defaults */ }

  const title = page?.title
    ? `${page.title} — Carolina Premier Soccer League`
    : "Carolina Premier Soccer League";

  return {
    title,
    description: page?.seoDescription,
    alternates: { canonical: canonicalPath },
    openGraph: { url: canonicalPath, title },
  };
}

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

  const page = await sanityFetch<PageData>(
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
            backgroundVideo{ ..., asset->{ url } },
            backgroundImages[]{ ..., asset->{ url } },
            heroImage{ ..., asset->{ url } },
            subImage{ ..., asset->{ url } },
            slides[]{
              ...,
              image{ ..., asset->{ url } },
              video{ ..., asset->{ url } },
              graphic{ ..., asset->{ url } }
            },
            leftPanel{
              ...,
              image{ ..., asset->{ url } },
              video{ ..., asset->{ url } }
            },
            rightPanel{
              ...,
              image{ ..., asset->{ url } },
              video{ ..., asset->{ url } }
            },
            image{ ..., asset->{ url } },
            bottomImage{ ..., asset->{ url } },
            lottie{ ..., asset->{ url } },
            bottomLottie{ ..., asset->{ url } },
            logos[]{ ..., asset->{ url } },
            tiles[]{
              ...,
              image{ ..., asset->{ url }, "alt": asset->altText },
              video{ ..., asset->{ url } },
              backgroundImage{ ..., asset->{ url } },
              backgroundVideo{ ..., asset->{ url } }
            }
          }
        }`,
      { slug: pageSlug, parentSlug }
    );

  if (!page) notFound();

  const subNavItems =
    (page.subNavItems ?? [])
      .filter((i) => i.label && i.slug)
      .map((i) => ({
        label: i.label,
        href: i.parentSlug ? `/${i.parentSlug}/${i.slug}` : `/${i.slug}`,
      }));

  const sections = page.sections ?? [];
  const primaryIdx = sections.findIndex((b) => b._type === "dualPanelBlock");
  // Find the first block that actually gets a ScrollReveal wrapper
  // — strips (logo ticker / sub-nav / etc.) are skipped so the
  // page-entry wipe lands on the first real content block.
  const firstRevealIdx = sections.findIndex((b) => !NO_REVEAL.has(b._type));

  return (
    <main>
      {subNavItems.length > 1 && <SubNav items={subNavItems} />}
      {sections.map((block, index) => (
        <BlockRenderer
          key={block._key}
          block={block}
          isPrimary={index === primaryIdx}
          animateOnMount={index === firstRevealIdx}
        />
      ))}
    </main>
  );
}

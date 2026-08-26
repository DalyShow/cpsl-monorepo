import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = { _type: string; _key: string; [key: string]: any };
type PageData = { sections?: Section[] };

export default async function Home() {
  const page = await sanityFetch<PageData>(
    // Dereference image assets so components receive a ready-to-use URL
    `*[_type == "homePage"][0]{
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
        primaryCtaDocument->{ "fileUrl": file.asset->url, "filename": file.asset->originalFilename },
        secondaryCtaDocument->{ "fileUrl": file.asset->url, "filename": file.asset->originalFilename },
        ctaDocument->{ "fileUrl": file.asset->url, "filename": file.asset->originalFilename },
        tiles[]{
          ...,
          image{ ..., asset->{ url }, "alt": asset->altText },
          video{ ..., asset->{ url } },
          backgroundImage{ ..., asset->{ url } },
          backgroundVideo{ ..., asset->{ url } }
        }
      }
    }`
  );

  const sections = page?.sections ?? [];
  const primaryIdx = sections.findIndex((b) => b._type === "dualPanelBlock");

  return (
    <main>
      {sections.map((block, index) => (
        <BlockRenderer
          key={block._key}
          block={block}
          isPrimary={index === primaryIdx}
        />
      ))}
    </main>
  );
}

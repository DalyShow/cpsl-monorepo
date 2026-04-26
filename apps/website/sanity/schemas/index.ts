import { siteSettings }        from "./siteSettings";
import { homePage }            from "./homePage";
import { brandPage }           from "./brandPage";
import { page }                from "./page";
import { topNavLink }          from "./navItems/topNavLink";
import {
  topNavFlyout,
  flyoutItem,
  flyoutAction,
}                              from "./navItems/topNavFlyout";
import { heroBlock }            from "./blocks/heroBlock";
import { contentSectionBlock }  from "./blocks/contentSectionBlock";
import { ctaBannerBlock }       from "./blocks/ctaBannerBlock";
import { clubDirectoryBlock }   from "./blocks/clubDirectoryBlock";
import { calendarDayViewBlock } from "./blocks/calendarDayViewBlock";
import { sectionHeaderBlock }  from "./blocks/sectionHeaderBlock";
import { standingsBlock }      from "./blocks/standingsBlock";
import { matchdayBlock }       from "./blocks/matchdayBlock";
import { logoTickerBlock }     from "./blocks/logoTickerBlock";
import { subNavBlock }         from "./blocks/subNavBlock";
import { promoHeroBlock }      from "./blocks/promoHeroBlock";
import { heroSlide }           from "./blocks/heroSlide";
import { promoGridBlock }      from "./blocks/promoGridBlock";
import { dualPanelBlock }      from "./blocks/dualPanelBlock";
import { dualPanelItem }       from "./blocks/dualPanelItem";
import { faqAccordionBlock }   from "./blocks/faqAccordionBlock";
import { faqItem }             from "./blocks/faqItem";
import { photoTile }           from "./blocks/tiles/photoTile";
import { promoTile }           from "./blocks/tiles/promoTile";
import { graphicTile }         from "./blocks/tiles/graphicTile";

export const schemaTypes = [
  // Documents
  siteSettings,
  homePage,
  brandPage,
  page,
  // Nav items
  topNavLink,
  topNavFlyout,
  flyoutItem,
  flyoutAction,
  // Blocks
  heroBlock,
  sectionHeaderBlock,
  contentSectionBlock,
  ctaBannerBlock,
  clubDirectoryBlock,
  calendarDayViewBlock,
  standingsBlock,
  matchdayBlock,
  logoTickerBlock,
  subNavBlock,
  promoHeroBlock,
  heroSlide,
  promoGridBlock,
  dualPanelBlock,
  dualPanelItem,
  faqAccordionBlock,
  faqItem,
  photoTile,
  promoTile,
  graphicTile,
];

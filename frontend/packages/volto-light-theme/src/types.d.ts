import type { Brain, Image } from '@plone/types';

type hrefType = {
  '@id': string;
  title: string;
} & Partial<Brain>;

type headerAction = {
  '@id': string;
  title: string;
  href: Array<hrefType>;
  openInNewTab: boolean;
};

export type Link = {
  '@id': string;
  title: string;
  href: Array<hrefType>;
  openInNewTab: boolean;
};

export type Logo = {
  '@id': string;
  title: string;
  logo: Image;
  href: Array<hrefType>;
  openInNewTab: boolean;
};

export type footerLogo = {
  '@id': string;
  title: string;
  logo: Image;
  href: Array<hrefType>;
  openInNewTab: boolean;
};

export type iconLink = {
  '@id': string;
  title: string;
  icon: Image;
  href: Array<hrefType>;
  openInNewTab: boolean;
};

export type SiteHeaderSettings = {
  logo: string;
  complementary_logo: string;
  intranet_flag: string;
  header_actions: Array<headerAction>;
};

export type SiteThemeSettings = {
  primary_foreground_color: string;
  accent_foreground_color: string;
  accent_color: string;
  primary_color: string;
  secondary_foreground_color: string;
  secondary_color: string;
};

export type SiteFooterSettings = {
  has_enhanced_footer: boolean;
  footer_logos: Array<footerLogo>;
  footer_logos_container_width: string;
  footer_logos_size: string;
  footer_address: string;
  footer_column_left_header: string;
  footer_column_left: Array<Link>;
  footer_column_middle_header: string;
  footer_column_middle: Array<Link>;
  footer_column_right_header: string;
  footer_column_right: Array<Link>;
  followus_links: Array<iconLink>;
  footer_logo: Image & { data?: string };
  footer_links: Array<Link>;
};

export type CustomInheritBehavior<T> = {
  data: T;
  from: {
    '@id': string;
    title: string;
  };
};

declare module '@plone/types' {
  export interface Content {
    footer_logos: Array<footerLogo>;
    followus_links: Array<iconLink>;
    footer_links: Array<Link>;
  }
}

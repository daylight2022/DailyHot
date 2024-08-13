import { IconType } from 'react-icons';

export type AuthorConfig = {
	name: string;
	url: string;
	twitter?: string;
};
export type ProductLink = {
	url: string;
	name: string;
};
export type Link = {
	name: string;
	href: string;
	icon: IconType;
};
export type ThemeColor = {
	media: string;
	color: string;
};
export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	keywords: string[];
	authors: AuthorConfig[];
	creator: string;
	headerLinks: Link[];
	footerLinks: Link[];
	footerProducts: ProductLink[]
  themeColors?: string | ThemeColor[];
  defaultNextTheme?: string;
};

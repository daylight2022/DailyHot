import { SiteConfig } from '@/types/siteConfig';
import { BsGithub, BsTwitterX, BsWechat } from 'react-icons/bs';
import { MdEmail } from "react-icons/md";
import { SiBuymeacoffee, SiJuejin } from "react-icons/si";

export const baseConfig = {
	name: 'Next.js Starter',
	description:
		'This is a feature-rich project starter template designed to provide a solid foundation for rapid development of modern full-stack applications.',
	url: '',
	keywords: [],
	authors: [
		{
			name: 'Kody',
			url: '',
		},
	],
	creator: '@Kody',
	headerLinks: [{ name: 'repo', href: 'https://github.com/daylight2022/nextjs-starter', icon: BsGithub }],
	footerLinks: [
    {name: 'email', href: '', icon: MdEmail},
    {name: 'github', href:'https://github.com/daylight2022/nextjs-starter', icon: BsGithub },   
    { name: 'juejin', href: "", icon: SiJuejin },
    { name: 'weChat', href: "", icon: BsWechat }


  ],
	footerProducts: [
    {url: 'https://daylight2022.github.io/', name: 'Hyacinthの博客'}
  ],
	defaultNextTheme: 'system', // next-theme option: system | dark | light
};

export const siteConfig: SiteConfig = {
	...baseConfig,
};

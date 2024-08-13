import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const HeaderLinks = () => {
	const links = siteConfig.footerLinks;

	return (
		<div className='mx-auto flex flex-row items-center justify-center pb-2'>
			{links.map((link) => (
				<Link
					href={link.href}
					key={link.name}
					target="_blank"
					rel="noopener noreferrer nofollow"
					className="mx-3 flex flex-col max-w-[24px] items-center justify-center">
					{link.icon && React.createElement(link.icon, { className: 'text-lg' })}
				</Link>
			))}
		</div>
	);
};

export default HeaderLinks;

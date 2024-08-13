import FooterLinks from './FooterLinks';
import FooterProducts from './FooterProducts';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

const Footer = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	const { authors } = siteConfig;
	return (
		<footer className="mt-16 space-y-2 pt-6 pb-4 flex flex-col items-center text-sm text-gray-400">
			<div>
				<FooterLinks></FooterLinks>
				<FooterProducts></FooterProducts>
				<div className="flex space-x-2 text-gray-900 dark:text-gray-400">
					<div>{`@${currentYear}`}&nbsp;</div>
					<Link href={authors[0].twitter || authors[0].url} target="_blank" className=''>
						{authors[0].name}&nbsp;
					</Link>
					<div>All rights reserved.</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

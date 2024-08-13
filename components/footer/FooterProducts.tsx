import { siteConfig } from '@/config/site';
import Link from 'next/link';

const FooterProducts = () => {
	const footerPorducts = siteConfig.footerProducts;

	return (
		<div className="flex flex-wrap space-x-2 items-center justify-center">
			{footerPorducts.map((product, index) => {
				return (
					<span key={product.url}>
						<Link href={product.url} target="_blank">
							{product.name}
						</Link>
						{index !== footerPorducts.length - 1 ? (
							<>
								<span>{' • '}</span>
							</>
						) : (
							<></>
						)}
					</span>
				);
			})}
		</div>
	);
};
export default FooterProducts
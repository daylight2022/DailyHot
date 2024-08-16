import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import BaiduAnalytics from './BaiduAnalytics';
import Head from 'next/head';

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: '热搜今日',
	description: '随时把握最新潮流，热事一网打尽',
	icons: {
		icon: '/favicon-32.png',
		shortcut: '/favicon-16.png',
		apple: '/apple-touch-icon.png', // 确保这张图存在于 public 文件夹
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme={siteConfig.defaultNextTheme} enableSystem>
					<Header />
					{children}
					<Footer />
					<TailwindIndicator />
				</ThemeProvider>
				{process.env.NODE_ENV === 'development' ? (
					<></>
				) : (
					<>
						<div>
							<BaiduAnalytics />
						</div>
					</>
				)}
			</body>
		</html>
	);
}

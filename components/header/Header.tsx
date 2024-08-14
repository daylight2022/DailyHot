import Image from 'next/image';
import Link from 'next/link';
import { ThemeButton } from '@/components/ThemeButton';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineRefresh } from 'react-icons/md';

const Header = () => {
	return (
		<header className="pt-8 pb-4">
			<div className="mx-auto max-w-full px-8 sm:px-10 lg:px-14">
				<nav className="relative z-50 flex justify-between">
					<div className="flex items-center md:gap-x-12">
						<Link href="/" className="flex items-center space-x-3">
							<Image alt="" src="/logo.svg" className="w-12 h-12" width={32} height={32}></Image>
							<div className="flex flex-col space-y-1">
								<span className="text-xl font-semibold text-gray-700 dark:text-gray-200">热搜今日</span>
								<span className="text-xs font-normal text-gray-500 dark:text-gray-400">
									随时把握最新潮流，热事一网打尽
								</span>
							</div>
						</Link>
						<div className="hidden md:flex md:gap-x-6">
							<></>
						</div>
					</div>
					<div className="flex items-center gap-x-5">
						<TooltipProvider>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button variant="outline" size="icon">
										<MdOutlineRefresh className="h-[1.2rem] w-[1.2rem]" />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p className="font-light">刷新页面</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<ThemeButton />

						<TooltipProvider>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button variant="outline" size="icon">
										<IoSettingsOutline className="h-[1.2rem] w-[1.2rem]" />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p className="font-light">设置</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;

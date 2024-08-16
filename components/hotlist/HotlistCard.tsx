'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Tooltip, Spinner, Skeleton } from '@nextui-org/react';
import { IoIosMore } from 'react-icons/io';
import { MdOutlineRefresh } from 'react-icons/md';
import { RouteData } from '@/types/route';
import { API_BASE_URL } from '@/config';
import { getTimeDifference } from '@/utils/timeUtils';
import { VscError } from 'react-icons/vsc';

const HotListCard = ({ apiName, apiPath }: { apiName: string; apiPath: string }) => {
	const [data, setData] = useState<RouteData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (path: string) => {
		setLoading(true); // Show loader during fetch
		setError(null);
		try {
			const response = await fetch(`${API_BASE_URL}/${path}?limit=15`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();
			// await new Promise((resolve) => setTimeout(resolve, 500));
			setData(result); // Store fetched data in state
		} catch (error) {
			if (error instanceof Error) {
				console.log('Failed to fetch data:', error.message);
				setError(error.message);
			} else {
				setError('未知错误');
			}
		} finally {
			setLoading(false); // Hide loader after fetch
		}
	};

	useEffect(() => {
		fetchData(apiPath); // Fetch data when component mounts
	}, [apiPath]);

	return (
		<Card className="w-full h-[430px] text-[15px]">
			<CardHeader className="justify-between">
				<div className="flex gap-2">
					<Skeleton isLoaded={!loading} className="w-6 h-6 rounded-full">
						<Avatar
							showFallback
							className="w-6 h-6 text-tiny bg-transparent"
							radius="full"
							src={`/logo/${apiName}.png`}
						/>
					</Skeleton>
					<Skeleton isLoaded={!loading} className="w-24 h-5 rounded-lg">
						{!loading && data ? (
							<div className="flex items-center justify-start">{data?.title}</div>
						) : (
							<Skeleton className="w-24 h-5 rounded-lg" />
						)}
					</Skeleton>
				</div>
				<Skeleton isLoaded={!loading} className="w-14 h-5 rounded-lg">
					{!loading && data ? (
						<div className="text-xs font-light">{data?.type}</div>
					) : (
						<Skeleton className="w-15 h-5 rounded-lg" />
					)}
				</Skeleton>
			</CardHeader>
			<CardBody className=" px-3 py-0 text-zinc-900 dark:text-white">
				{loading && (
					<ul>
						{Array.from({ length: 10 }).map((_, idx) => (
							<li key={idx} className="flex items-center gap-2 my-2">
								<Skeleton className="w-full h-6 rounded-md" />
							</li>
						))}
					</ul>
				)}

				{error ? (
					<div className="h-full flex flex-col items-center justify-center space-y-4 ">
						<Avatar
							icon={<VscError size={24} />}
							className="lg"
							classNames={{
								base: 'bg-gradient-to-br from-[#FFB450] to-[#FF7050]',
								icon: 'text-black/80',
							}}
						/>
						<div className="space-y-1 flex flex-col items-center">
							<p className="text-lg text-zinc-800 dark:text-zinc-100">呀，加载失败了</p>
							<p className="text-base text-zinc-500 dark:text-zinc-400">生活总有不如意，别放弃，再试试呗</p>
						</div>
						<Tooltip placement="top" content="重试" closeDelay={100}>
							<div
								className="w-16 h-6 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
								onClick={() => fetchData(apiPath)}>
								<MdOutlineRefresh />
							</div>
						</Tooltip>
					</div>
				) : (
					!loading && (
						<ul>
							{data?.data?.map((item, index) => (
								<li key={index} className="flex items-center gap-2 my-2">
									<div
										className={`w-6 h-6 p-2 text-zinc-50 text-xs flex items-center justify-center rounded-lg ${
											index === 0
												? 'bg-red-500 '
												: index === 1
												? 'bg-orange-500 '
												: index === 2
												? 'bg-yellow-500 '
												: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200'
										}`}>
										{index + 1}
									</div>
									<a
										href={item.url}
										className="underline-animation text-sm font-normal text-zinc-700 dark:text-zinc-200 hover:tranzinc-x-[3px] duration-200 transition-all">
										{item.title}
									</a>
								</li>
							))}
						</ul>
					)
				)}
			</CardBody>
			<CardFooter className="justify-between">
				<div className="flex gap-1">
					<Skeleton isLoaded={!loading} className="flex items-center justify-start w-20 h-5 rounded-lg">
						<p className="text-zinc-500 dark:text-zinc-400 text-xs font-light">
							{getTimeDifference(data?.updateTime || '')}
						</p>
					</Skeleton>
				</div>
				<div className="flex gap-1">
					<Tooltip placement="top" content="查看更多" closeDelay={100}>
						<div className="w-8 h-6 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 cursor-pointer">
							<IoIosMore />
						</div>
					</Tooltip>
					<Tooltip placement="top" content="获取最新" closeDelay={100}>
						<div
							className="w-8 h-6 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
							onClick={() => fetchData(apiPath)}>
							<MdOutlineRefresh />
						</div>
					</Tooltip>
				</div>
			</CardFooter>
		</Card>
	);
};

export default HotListCard;

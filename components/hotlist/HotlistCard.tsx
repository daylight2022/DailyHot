'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Tooltip, Button, Spinner } from '@nextui-org/react';
import { IoIosMore } from 'react-icons/io';
import { MdOutlineRefresh } from 'react-icons/md';
import { RouteData } from '@/types/route';
import { API_BASE_URL } from '@/config';
import { getTimeDifference } from '@/utils/timeUtils';

const HotListCard = ({ apiName, apiPath }: { apiName: string; apiPath: string }) => {
	const [data, setData] = useState<RouteData | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async (path: string) => {
		setLoading(true); // Show loader during fetch
		try {
			const dataRes = await fetch(`${API_BASE_URL}/${path}?limit=15`);
			const result = await dataRes.json();
			setData(result); // Store fetched data in state
		} catch (error) {
			console.log('Failed to fetch data:', error);
			setData(undefined);
		} finally {
			setLoading(false); // Hide loader after fetch
		}
	};

	useEffect(() => {
		fetchData(apiPath); // Fetch data when component mounts
	}, [apiPath]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-full">
				<Spinner />
			</div>
		);
	}

	if (!data) {
		return <div>Failed to load data.</div>;
	}

	return (
		<Card className="max-w-[360px] max-h-[480px]">
			<CardHeader className="justify-between">
				<div className="flex gap-4">
					<Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
					<div className="flex items-center justify-center">{apiName}</div>
				</div>
				<span className="text-xs font-light">{data.type}</span>
			</CardHeader>
			<CardBody className="px-3 py-0 text-small text-gray-900 dark:text-white">
				<ul>
					{data.data.map((item, index) => (
						<li key={index} className="flex items-center gap-2 my-2">
							<div
								className={`w-6 h-6 p-2 text-slate-50 text-xs flex items-center justify-center rounded-lg ${
									index === 0
										? 'bg-red-500 '
										: index === 1
										? 'bg-orange-500 '
										: index === 2
										? 'bg-yellow-500 '
										: 'bg-gray-200 text-slate-700'
								}`}>
								{index + 1}
							</div>
							<a
								href={item.url}
								className="underline-animation text-base font-normal text-slate-700 hover:translate-x-[3px] duration-200 transition-all">
								{item.title}
							</a>
						</li>
					))}
				</ul>
			</CardBody>
			<CardFooter className="justify-between">
				<div className="flex gap-1">
					<p className="text-slate-400 text-xs font-light">{getTimeDifference(data.updateTime)}</p>
				</div>
				<div className="flex gap-1">
					<Tooltip placement="top" content="查看更多" closeDelay={100}>
						<div className="w-8 h-6 flex items-center justify-center rounded-xl bg-slate-100 cursor-pointer">
							<IoIosMore />
						</div>
					</Tooltip>
					<Tooltip placement="top" content="获取最新" closeDelay={100}>
						<div
							className="w-8 h-6 flex items-center justify-center rounded-xl bg-slate-100 cursor-pointer"
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

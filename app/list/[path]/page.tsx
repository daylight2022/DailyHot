'use client';

import React, { useEffect, useState, useRef } from 'react';
import { RouteData } from '@/types/route';
import { API_BASE_URL } from '@/config';
import { Avatar, Tooltip, Skeleton } from '@nextui-org/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { VscError } from 'react-icons/vsc';
import { getTimeDifference } from '@/utils/timeUtils';
import Image from 'next/image';
import { Pagination } from '@nextui-org/react';
import { SINGLE_PAGE_COUNT } from '@/config';

interface Props {
	path: string;
}

const DetailPage = ({ params }: { params: Props }) => {
	const path = params.path;
	const [data, setData] = useState<RouteData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [pageTotal, setPageTotal] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const fetchData = async (path: string) => {
		setLoading(true); // Show loader during fetch
		setError(null);
		try {
			const response = await fetch(`${API_BASE_URL}/${path}?limit=50`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();
			if (result && result.data) {
				setData(result); // Store fetched data in state
				setPageTotal(Math.ceil(result.data.length / 20) || 0);
			}
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

	// 通过 useRef 来保证只在组件加载时触发一次，避免严格模式下组件重复渲染调用
	const dataFetchedRef = useRef(false);
	useEffect(() => {
		if (typeof path === 'string' && path && !dataFetchedRef.current) {
			fetchData(path);
			dataFetchedRef.current = true;
		}
	}, [path]);

	return (
		<div className="flex items-center justify-center mx-8 sm:mx-12 lg:mx-16 xl:mx-20  border-1 bg-white dark:bg-zinc-900 rounded-lg">
			{loading && (
				<ul>
					{Array.from({ length: 20 }).map((_, idx) => (
						<li key={idx} className="flex items-center gap-2 my-2">
							<Skeleton className="w-full h-12 rounded-md" />
						</li>
					))}
				</ul>
			)}

			{error ? (
				<div className="h-full flex flex-col items-center justify-center space-y-4 my-20 ">
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
							onClick={() => typeof path === 'string' && path && fetchData(path)}>
							<MdOutlineRefresh />
						</div>
					</Tooltip>
				</div>
			) : (
				!loading && (
					<div className="w-full px-5">
						<div className="relative flex items-center justify-between w-full h-24">
							<Avatar
								showFallback
								onClick={() => fetchData(path)}
								className="w-12 h-12 text-tiny bg-transparent flex-none"
								radius="md"
								src={`/logo/${data?.name || 'icon_error'}.png`}
							/>
							<div className="absolute left-1/2 transform -translate-x-1/2  flex flex-col items-center space-y-1">
								<span className="text-2xl font-semibold">{data?.title}</span>
								<span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">{data?.type}</span>
							</div>
							<div className="text-sm font-medium tracking-wide flex-none text-gray-500">
								共 {data?.data.length || ' '} 条 · {getTimeDifference(data?.updateTime || '')}
							</div>
						</div>

						<ul>
							{data?.data
								.slice(SINGLE_PAGE_COUNT * (currentPage - 1), SINGLE_PAGE_COUNT * currentPage)
								.map((item, index) => (
									<li
										key={index}
										className={`flex items-center gap-2 my-0 py-4 ${
											index !== 0 && 'border-t-1 border-zinc-200 dark:border-zinc-700'
										} hover:bg-zinc-100 dark:hover:bg-zinc-800 transition delay-75 rounded-none space-x-3`}>
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
										<div className="space-y-2">
											<a href={item.url} className="text-medium font-normal text-zinc-700 dark:text-zinc-200">
												{item.title}
											</a>
											<div className="font-normal text-sm text-zinc-500 dark:text-zinc-400 ">{item.desc}</div>
											<div className="font-normal text-sm text-zinc-500 dark:text-zinc-400 flex space-x-1">
												{item.hot && <Image src={'/svg/hot.svg'} width={12} height={12} alt="hot"></Image>}
												<span>{item.hot}</span>
											</div>
										</div>
									</li>
								))}
						</ul>

						<Pagination
							showControls
							total={pageTotal}
							page={currentPage}
							onChange={setCurrentPage}
							className="flex items-center justify-center mt-4 mb-8"
						/>
					</div>
				)
			)}
		</div>
	);
};

export default DetailPage;

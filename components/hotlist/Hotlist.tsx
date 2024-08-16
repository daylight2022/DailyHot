'use client';
import { useEffect, useState } from 'react';
import HotlistCard from '@/components/hotlist/HotlistCard';
import { RouteDataAll } from '@/types/route';
import { API_BASE_URL } from '@/config';
import { Avatar, Spinner, Tooltip } from '@nextui-org/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { VscError } from 'react-icons/vsc';

const Hostlist = () => {
	const [apiPaths, setApiPaths] = useState<RouteDataAll[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const fetchApiPaths = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${API_BASE_URL}/all`);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const result = await res.json();
			setApiPaths(result.data);
		} catch (error) {
			console.log('Failed to fetch route path data:', error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchApiPaths();
	}, []);

	return (
		<>
			{loading ? (
				// 显示加载动画?
				<></>
			) : error ? (
				// 显示错误信息
				<div className=" flex flex-col items-center space-y-4 mt-60">
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
							onClick={() => fetchApiPaths()}>
							<MdOutlineRefresh />
						</div>
					</Tooltip>
				</div>
			) : apiPaths && apiPaths.length > 0 ? (
				<div className="w-full mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4  ">
					{apiPaths.map((item, index) => (
						<HotlistCard key={item.name} apiName={item.name} apiPath={item.path} />
					))}
				</div>
			) : (
				// 显示无内容提示<div className=" flex flex-col items-center space-y-4 mt-60">
				<div className=" flex flex-col items-center space-y-4 mt-60">
					<Avatar
						icon={<VscError size={24} />}
						className="lg"
						classNames={{
							base: 'bg-gradient-to-br from-[#FFB450] to-[#FF7050]',
							icon: 'text-black/80',
						}}
					/>
					<div className="space-y-1 flex flex-col items-center">
						<p className="text-lg text-zinc-800 dark:text-zinc-100">没有可显示的内容</p>
						<p className="text-base text-zinc-500 dark:text-zinc-400">可能接口都挂了？。。。</p>
					</div>
					<Tooltip placement="top" content="重试" closeDelay={100}>
						<div
							className="w-16 h-6 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
							onClick={() => fetchApiPaths()}>
							<MdOutlineRefresh />
						</div>
					</Tooltip>
				</div>
			)}
		</>
	);
};

export default Hostlist;

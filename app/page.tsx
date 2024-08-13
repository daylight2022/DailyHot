import HotList from '@/components/hotlist/Hotlist';

export default async function Home() {
	return (
		<main className="flex flex-col">
			<div className="mx-auto max-w-full pb-16 px-2 sm:px-4 lg:px-8 text-center">
				<HotList />
			</div>
		</main>
	);
}

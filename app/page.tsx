import HotList from '@/components/hotlist/Hotlist';

export default async function Home() {
	return (
		<main className="w-full flex flex-col items-center py-6">
			<div className="w-full mx-0 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-center">
				<HotList />
			</div>
		</main>
	);
}

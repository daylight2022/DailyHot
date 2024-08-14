import HotlistCard from '@/components/hotlist/HotlistCard';
import { RouteDataAll } from '@/types/route';
import { API_BASE_URL } from '@/config';

const Hostlist = async () => {
	let apiPaths: RouteDataAll[] = [];

	try {
		const res = await fetch(`${API_BASE_URL}/all`);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const result = await res.json();
		apiPaths = result.data;
	} catch (error) {
		console.error('Failed to fetch route path data:', error);
	}

	return (
		<div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
			{apiPaths.map((item, index) => (
				<HotlistCard key={item.name} apiName={item.name} apiPath={item.path} />
			))}
		</div>
	);
};

export default Hostlist;

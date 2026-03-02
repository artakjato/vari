import { useEffect } from 'react';
import { useMapStore } from '../stores/mapStore';

const BREAKPOINTS = {
	mobile: '(max-width: 767px)',
	tablet: '(min-width: 768px) and (max-width: 1023px)',
	desktop: '(min-width: 1024px)',
} as const;

export function useViewport() {
	const setViewport = useMapStore((state) => state.setViewport);

	useEffect(() => {
		const queries = {
			mobile: window.matchMedia(BREAKPOINTS.mobile),
			tablet: window.matchMedia(BREAKPOINTS.tablet),
			desktop: window.matchMedia(BREAKPOINTS.desktop),
		};

		const update = () => {
			if (queries.mobile.matches) setViewport('mobile');
			else if (queries.tablet.matches) setViewport('tablet');
			else setViewport('desktop');
		};

		update();

		Object.values(queries).forEach((mq) => mq.addEventListener('change', update));
		return () => {
			Object.values(queries).forEach((mq) => mq.removeEventListener('change', update));
		};
	}, [setViewport]);
}

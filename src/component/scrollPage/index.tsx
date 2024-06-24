"use client";

import { cancelHttp } from "@util/fetch";
import { inter_param } from "@type/index";
import None from "@component/none";
import { useRef, useEffect, useState, ReactNode } from "react";

interface inter_props {
	children: ReactNode;
	total: number;
	data: any[];
	request: (v: inter_param) => void;
}

function Index({ children, total, data, request }: inter_props) {
	const ob = useRef<any | null>(null);
	const observerRef = useRef<HTMLDivElement | null>(null);

	const [param, setParam] = useState<inter_param>({
		page: 1,
		page_size: 10,
	});

	useEffect(() => {
		if (param.page == 1) return;

		request(param);

		return () => {
			cancelHttp();
		};
	}, [param]);

	useEffect(() => {
		if (!data.length) return;

		ob.current = new IntersectionObserver((entries) => {
			const { isIntersecting } = entries[0];

			if (isIntersecting) {
				ob.current.disconnect();

				const { page, page_size } = param;

				if (page * page_size >= total) return;

				setParam({
					page: page + 1,
					page_size: 10,
				});
			}
		});

		ob.current.observe(observerRef.current);

		return () => {
			ob.current?.disconnect();
		};
	}, [data]);

	return (
		<>
			{data.length ? (
				<>
					{children}
					<div ref={observerRef}></div>
				</>
			) : (
				<None />
			)}
		</>
	);
}

export default Index;

import Http from "@util/fetch";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@component/loading";
import style from "./page.module.scss";

const WithCustomLoading = dynamic(() => import("./user"), {
	loading: () => <Loading />,
	ssr: false,
});

interface props {
	params: any;
}

export default async function Index({ params }: props) {
	const { slug } = params;

	console.log(process.env.NEXT_PUBLIC_BASE_URL);

	const { detail } = (await Http(
		`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/article?id=${slug}`,
		{
			method: "get",
		}
	)) as { detail: any };

	return (
		<section className="app">
			<div className={`w1200 ${style.detail}`}>
				<div className={style.user}>
					<WithCustomLoading id={slug} />
				</div>
				<div className={style.wrapper}>
					<div className={style.text}>{detail}</div>
				</div>
			</div>
		</section>
	);
}

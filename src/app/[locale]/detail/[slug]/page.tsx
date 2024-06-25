import Http from "@util/fetch";
import dynamic from "next/dynamic";
import Loading from "@component/loading";
import { unstable_setRequestLocale } from "next-intl/server";
import style from "./page.module.scss";

const WithCustomLoading = dynamic(() => import("./user"), {
	loading: () => <Loading />,
	ssr: false,
});

interface inter_props {
	params: {
		slug: string;
		locale: string;
	};
}

export async function generateMetadata({ params }: inter_props) {
	return {
		title: params.slug,
	};
}

export async function generateStaticParams() {
	const { data } = (await Http(
		`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/articleList?type=all`,
		{
			method: "get",
		}
	)) as { data: any };

	return data.map(({ p_id }: { p_id: number }) => ({
		slug: String(p_id),
	}));
}

export default async function Index({ params }: inter_props) {
	const { slug, locale } = params;

	unstable_setRequestLocale(locale);

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

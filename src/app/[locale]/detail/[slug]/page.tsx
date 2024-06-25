import Http from "@util/fetch";
import dynamic from "next/dynamic";
import Loading from "@component/loading";
import { NextResponse } from "next/server";
import db from "@util/db";
import { jwt_verify } from "@util/db/jwt";
import ArticleListModel from "@util/db/mongoose/articleList";
import ArticleModel from "@util/db/mongoose/article";
import UserInfoModel from "@util/db/mongoose/user_info";
import dayjs from "dayjs";
import style from "./page.module.scss";

const WithCustomLoading = dynamic(() => import("./user"), {
	loading: () => <Loading />,
	ssr: false,
});

interface props {
	params: any;
}

interface inter_par {
	slug: string;
}

interface inter_props {
	params: inter_par;
}

export async function generateMetadata({ params }: inter_props) {
	return {
		title: params.slug,
	};
}

export async function generateStaticParams() {
	// const { data } = (await Http(
	// 	`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/articleList?type=all`,
	// 	{
	// 		method: "get",
	// 	}
	// )) as { data: any };
	// await db();

	// const data = await ArticleListModel.find();

	// return data.map(({ p_id }: { p_id: number }) => ({
	// 	slug: String(p_id),
	// }));

	return [
		{
			slug: "1",
		},
		{
			slug: "2",
		},
	];
}

export default function Page({ params }: props) {
	const { slug } = params;

	console.log(params);

	// const { detail } = (await Http(
	// 	`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/article?id=${slug}`,
	// 	{
	// 		method: "get",
	// 	}
	// )) as { detail: any };

	// await db();

	// const { detail } = await ArticleModel.findOne({ id: slug });

	return (
		<section className="app">
			<div className={`w1200 ${style.detail}`}>
				<div className={style.user}>
					<WithCustomLoading id={slug} />
				</div>
				<div className={style.wrapper}>
					<div className={style.text}>{slug}</div>
				</div>
			</div>
		</section>
	);
}

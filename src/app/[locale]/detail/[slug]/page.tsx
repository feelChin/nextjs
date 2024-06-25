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
	await db();

	const data = await ArticleListModel.find();

	const a = data.map(({ p_id }: { p_id: number }) => ({
		slug: String(p_id),
	}));
	console.log(1);
	console.log(a);
	console.log(2);
	return a;
}

export default async function Index({ params }: props) {
	const { slug } = params;
	console.log(3);
	console.log(params);
	// const { detail } = (await Http(
	// 	`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/article?id=${slug}`,
	// 	{
	// 		method: "get",
	// 	}
	// )) as { detail: any };

	await db();
	console.log(4);
	const { detail } = await ArticleModel.findOne({ id: slug });

	console.log(5);

	console.log(detail);

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

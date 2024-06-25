"use client";

import { ReactNode, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Http from "@util/fetch";
import Image from "next/image";
import Link from "next/link";
import store from "@util/store";
import None from "@component/none";
import Loading from "@component/loading";
import Message from "@component/message";
import dynamic from "next/dynamic";
import AuthCheck from "@component/authCheck";
import { useRouter } from "next/navigation";
import style from "./index.module.scss";

export interface inter_item {
	count: number;
	name: string;
	avatar: string;
	create_time: string;
	content: string;
	like: number;
	has_detail: boolean;
	user_id: string;
	p_id: string;
}

type type_state = "hot" | "now";

interface inter_article {
	data: inter_item[];
	total: number;
}

const WithCustomLoading = dynamic(() => import("@component/scrollPage"), {
	loading: () => <Loading />,
	ssr: false,
});

export function RenderItem({ data }: { data: inter_item[] }) {
	const t = useTranslations("home");
	const router = useRouter();
	const locale = useLocale();

	if (!data.length) {
		return <None />;
	}

	return data.map(
		({
			count,
			name,
			avatar,
			create_time,
			content,
			like,
			has_detail,
			user_id,
			p_id,
		}) => {
			return (
				<div className={style.item} key={p_id}>
					<div className={style.user}>
						<Link href={`/${locale}/me/${user_id}`}>
							<figure>
								<Image
									className={style.avatar}
									width={50}
									height={50}
									src={avatar as string}
									alt=""
								/>
							</figure>
						</Link>
						<div className={style.info}>
							<h5>{name}</h5>
							<time>{create_time}</time>
						</div>
					</div>
					<div className={style.text}>
						{content}
						{has_detail && (
							<Link href={`/${locale}/detail/${p_id}`}>{t("详情")}</Link>
						)}
					</div>
					<div className={style.more}>
						<div>
							<i className="iconfont icon-chakan"></i>
							{count}
						</div>
						<div>
							<i className="iconfont icon-dianzan"></i>
							{like}
						</div>
					</div>
				</div>
			);
		}
	);
}

const init_article = {
	data: [],
	total: 0,
};

function Index({ children }: { children: ReactNode }) {
	const t = useTranslations("home");
	const locale = useLocale();

	const { userInfo } = store();

	const [state, setState] = useState<type_state>("hot");
	const [ariticle, setArticle] = useState<inter_article>(init_article);

	async function getList(params = {}) {
		try {
			const res = (await Http(
				`/[locale]/api/articleList`,
				{
					method: "get",
				},
				params
			)) as inter_article;

			setArticle((prev) => {
				return {
					data: [...prev.data, ...res.data],
					total: res.total,
				};
			});
		} catch (err) {
			Message.error(err);
		}
	}

	return (
		<div className={style.article}>
			<div>
				<div className={style.menuList}>
					<button
						className={`menu ${state === "hot" ? "active" : ""}`}
						onClick={() => {
							setArticle(init_article);
							setState("hot");
						}}
					>
						<i className="iconfont icon-remen"></i>
						{t("热门搜索")}
					</button>
					<button
						className={`menu ${state === "now" ? "active" : ""}`}
						onClick={() => {
							getList();
							setState("now");
						}}
					>
						<i className="iconfont icon-shishifengxianqingdan"></i>
						{t("实时文章")}
					</button>
					<Link href={`/${locale}/me/${userInfo.id}`}>
						<AuthCheck>
							<button className="menu">
								<i className="iconfont icon-wode"></i>
								{t("我的文章")}
							</button>
						</AuthCheck>
					</Link>
				</div>
			</div>
			<div className={style.list}>
				{ariticle.data.length ? (
					<WithCustomLoading
						request={(v) => {
							getList(v);
						}}
						{...ariticle}
					>
						<RenderItem data={ariticle.data} />
					</WithCustomLoading>
				) : (
					children
				)}
			</div>
		</div>
	);
}

export default Index;

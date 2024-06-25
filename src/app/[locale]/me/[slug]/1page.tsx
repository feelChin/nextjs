"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Http, { cancelHttp } from "@util/fetch";
import store from "@util/store";
import Link from "next/link";
import { removeCookieData } from "@util/cookie";
import { useRouter, useParams } from "next/navigation";
import Loading from "@component/loading";
import Message from "@component/message";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import style from "./page.module.scss";

interface inter_meState {
	total: number;
	count?: number;
	like?: number;
	avatar?: string;
	name?: string;
	banner?: string;
	create_time?: string;
}

interface inter_list extends inter_meState {
	content: string;
	id: number;
}

const WithCustomLoading = dynamic(() => import("@component/scrollPage"), {
	loading: () => <Loading />,
	ssr: false,
});

export default function Index() {
	const t = useTranslations("me");
	const locale = useLocale();
	const router = useRouter();
	const { slug } = useParams();

	const { userInfo, removeUser } = store();

	const [state, setState] = useState<inter_meState>({
		total: 0,
	});
	const [data, setData] = useState<inter_list[]>([]);

	async function getMeState() {
		try {
			const res = (await Http(
				`/[locale]/api/me`,
				{
					method: "get",
				},
				{
					user_id: slug,
				}
			)) as inter_meState;

			getMeList();

			setState({ ...res });
		} catch (err) {
			Message.error(err);
		}
	}

	async function getMeList(v = {}) {
		try {
			const { data } = (await Http(
				`/[locale]/api/me`,
				{
					method: "get",
				},
				{
					user_id: slug,
					type: "list",
					...v,
				}
			)) as { data: inter_list[] };

			setData((prev) => {
				return [...prev, ...data];
			});
		} catch (err) {
			Message.error(err);
		}
	}

	useEffect(() => {
		getMeState();

		document.title = slug as string;

		return () => {
			cancelHttp();
		};
	}, []);

	return (
		<section className="app">
			{state.avatar ? (
				<div className={`${style.me} w1200`}>
					<div
						className={style.user}
						style={{
							background: `url(${state.banner})`,
						}}
					>
						<figure>
							{state.avatar && (
								<Image
									className={style.avatar}
									width={150}
									height={150}
									src={state.avatar}
									alt=""
								/>
							)}
						</figure>
						<div className={style.name}>{state.name}</div>
						<div className={style.info}>
							<div>
								<i className="iconfont icon-bianjiwenzhang_huaban"></i>
								{t("发布文章")}：{state.total}
							</div>
							<time>
								<i className="iconfont icon-riqi"></i>
								{t("创建日期")}：
								{dayjs(new Date(state.create_time as string)).format(
									"YYYY年MM月"
								)}
							</time>
							<div className={style.item}>
								{t("浏览")}：<i className="iconfont icon-chakan"></i>
								{state.count}
							</div>
							<div className={style.item}>
								{t("点赞")}：<i className="iconfont icon-dianzan"></i>
								{state.like}
							</div>
						</div>
						{userInfo.id === slug && (
							<div className={style.edit}>
								<Link href={`/${locale}/me/change`}>
									<i className="iconfont icon-bianji"></i>
									{t("修改信息")}
								</Link>
								<div
									onClick={() => {
										removeCookieData("token");
										removeUser();
										router.push(`/${locale}`);
									}}
								>
									<i className="iconfont icon-tuichu"></i>
									{t("退出登录")}
								</div>
							</div>
						)}
					</div>
					<div className={style.paperList}>
						<WithCustomLoading
							request={(v) => {
								getMeList(v);
							}}
							data={data}
							total={state.total}
						>
							{data.map(({ content, id, count, like, create_time }) => {
								return (
									<div
										key={id}
										className={style.item}
										onClick={() => {
											router.push(`/${locale}/detail/${id}`);
										}}
									>
										<h6>{content}</h6>
										<time>
											{t("发布时间")}：{create_time}
										</time>
										<div className={style.info}>
											<div>
												{t("浏览")}：<i className="iconfont icon-chakan"></i>
												{count}
											</div>
											<div>
												{t("点赞")}：<i className="iconfont icon-dianzan"></i>
												{like}
											</div>
										</div>
									</div>
								);
							})}
						</WithCustomLoading>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</section>
	);
}

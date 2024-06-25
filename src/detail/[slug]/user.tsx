"use client";

import Image from "next/image";
import Http, { cancelHttp } from "@util/fetch";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import AuthCheck from "@component/authCheck";
import store from "@util/store";
import Message from "@component/message";
import style from "./page.module.scss";

interface inter_getUser {
	avatar?: string;
	count?: number;
	create_time?: string;
	like?: number;
	name?: string;
	user_id?: string;
}

function Index({ id }: { id: string }) {
	const t = useTranslations("detail");
	const tme = useTranslations("me");

	const [state, setState] = useState<inter_getUser>({});
	const [islike, setIslike] = useState<boolean>(false);

	const { userInfo } = store();

	async function getUser() {
		try {
			const { data } = (await Http(`/[locale]/api/articleList?id=${id}`, {
				method: "get",
			})) as { data: inter_getUser };

			setState(data);
		} catch (err) {
			Message.error(err);
		}
	}

	async function getLike() {
		try {
			if (!userInfo.token) return;

			const { is_like, count } = (await Http(
				`/[locale]/api/articleLike?id=${id}`,
				{
					method: "get",
					headers: {
						token: userInfo.token,
					},
				}
			)) as { is_like: boolean; count: number };

			setIslike(is_like);

			if (state.avatar) {
				setState({
					...state,
					like: count,
				});
			}
		} catch (err) {
			Message.error(err);
		}
	}

	async function sendLike() {
		try {
			const { msg } = (await Http(
				`/[locale]/api/articleLike`,
				{
					method: "post",
					headers: {
						token: userInfo.token,
					},
				},
				{
					id,
				}
			)) as { msg: string };

			getLike();

			Message.success(msg);
		} catch (err) {
			Message.error(err);
		}
	}

	useEffect(() => {
		getUser();

		return () => {
			cancelHttp();
		};
	}, []);

	useEffect(() => {
		getLike();

		return () => {
			cancelHttp();
		};
	}, [userInfo]);

	return (
		<div className={style.userBox}>
			{state.avatar && (
				<>
					<figure>
						<Image
							className={style.avatar}
							width={100}
							height={100}
							src={state.avatar as string}
							alt=""
						/>
					</figure>
					<p>{state.name}</p>
					<time>{state.create_time}</time>
					<div className={style.info}>
						<div>
							<i className="iconfont icon-chakan"></i>
							{state.count}
						</div>
						<div>
							<i className="iconfont icon-dianzan"></i>
							{state.like}
						</div>
					</div>
					<div
						onClick={() => {
							sendLike();
						}}
					>
						<AuthCheck>
							<button className={`${islike ? style.active : ""} ${style.menu}`}>
								<i className="iconfont icon-xiai"></i>
								{islike ? t("已点赞") : tme("点赞")}
							</button>
						</AuthCheck>
					</div>
				</>
			)}
		</div>
	);
}

export default Index;

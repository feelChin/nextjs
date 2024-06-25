"use client";

import Image from "next/image";
import { avatarPool, bannerPool, namePool } from "@util/db/roll";
import store, { inter_userInfo } from "@util/store";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Http from "@util/fetch";
import Message from "@component/message";
import { useEffect, useState } from "react";
import style from "./page.module.scss";

export default function Index() {
	const t = useTranslations("me");

	const { userInfo, updateUser } = store();

	const locale = useLocale();
	const router = useRouter();

	const [state, setState] = useState<inter_userInfo>({
		avatar: "",
		name: "",
		banner: "",
	});

	async function update() {
		try {
			const { msg } = (await Http(
				`/[locale]/api/user_info`,
				{
					method: "put",
					headers: {
						token: userInfo.token,
					},
				},
				state
			)) as { msg: string };

			Message.success(msg);

			updateUser(state);

			router.push(`/${locale}/me/${userInfo.id}`);
		} catch (err) {
			Message.error(err);
		}
	}

	useEffect(() => {
		setState({
			avatar: userInfo.avatar,
			name: userInfo.name,
			banner: userInfo.banner,
		});
	}, [userInfo]);

	return (
		<section className="app">
			<div className="w1200">
				<div className={style.editUser}>
					<div className={style.item}>
						<h5>{t("选择头像")}：</h5>
						<div className={style.list}>
							{avatarPool.map((item, index) => {
								return (
									<figure
										key={index}
										className={state.avatar === item ? style.active : ""}
										onClick={() => {
											setState({
												...state,
												avatar: item,
											});
										}}
									>
										<Image
											className={style.avatar}
											width={150}
											height={150}
											src={item}
											alt=""
										/>
									</figure>
								);
							})}
						</div>
					</div>
					<div className={style.item}>
						<h5>{t("选择背景")}：</h5>
						<div className={style.list}>
							{bannerPool.map((item, index) => {
								return (
									<figure
										key={index}
										className={`${style.banner} ${
											state.banner === item ? style.active : ""
										}`}
										onClick={() => {
											setState({
												...state,
												banner: item,
											});
										}}
									>
										<Image
											className={style.avatar}
											width={200}
											height={200}
											src={item}
											alt=""
										/>
									</figure>
								);
							})}
						</div>
					</div>
					<div className={style.item}>
						<h5>{t("选择名字")}：</h5>
						<div className={style.list}>
							{namePool.map((item, index) => {
								return (
									<div
										key={index}
										className={`${style.name} ${
											state.name === item ? style.active : ""
										}`}
										onClick={() => {
											setState({
												...state,
												name: item,
											});
										}}
									>
										{item}
									</div>
								);
							})}
						</div>
					</div>
					<div className={style.flex}>
						<div
							className={`menu ${style.menu}`}
							onClick={() => {
								router.push(`/${locale}/me/${userInfo.id}`);
							}}
						>
							{t("返回")}
						</div>
						<div
							className={`menu ${style.menu}`}
							onClick={() => {
								update();
							}}
						>
							{t("保存")}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

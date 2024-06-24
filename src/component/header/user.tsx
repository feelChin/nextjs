"use client";

import { useEffect } from "react";
import Image from "next/image";
import Http, { cancelHttp } from "@util/fetch";
import Link from "next/link";
import { getCookieData } from "@util/cookie";
import { useTranslations, useLocale } from "next-intl";
import store, { inter_userInfo } from "@util/store";
import LangSwitch from "@component/langSwitch";
import AuthCheck from "@component/authCheck";
import Message from "@component/message";
import style from "./index.module.scss";

interface inter_get_userInfo {
	data: inter_userInfo;
}

function Index() {
	const t = useTranslations("header");
	const locale = useLocale();

	const { userInfo, updateUser } = store();

	async function queryUserInfo(token: string) {
		try {
			const { data } = (await Http(`/[locale]/api/user_info`, {
				method: "get",
				headers: {
					token: token,
				},
			})) as inter_get_userInfo;

			updateUser({
				...data,
				token,
			});
		} catch (err) {
			Message.error(err);
		}
	}

	useEffect(() => {
		const token = getCookieData("token");

		if (token && !userInfo.id) {
			queryUserInfo(token);
		}

		return () => {
			cancelHttp();
		};
	}, [userInfo]);

	return (
		<>
			<div className={style.user}>
				{userInfo.token ? (
					<Link
						href={`/${locale}/me/${userInfo.id}`}
						className={style.userInfo}
					>
						{userInfo.avatar && (
							<Image
								className={style.avatar}
								width={50}
								height={50}
								src={userInfo.avatar as string}
								alt=""
							/>
						)}
						<p>{userInfo.name}</p>
					</Link>
				) : (
					<AuthCheck>
						<div className={style.menu}>{t("登录")} </div>
					</AuthCheck>
				)}
			</div>
			<LangSwitch />
		</>
	);
}

export default Index;

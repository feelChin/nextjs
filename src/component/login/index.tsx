"use client";

import { useEffect, useRef, useState } from "react";
import Http from "@util/fetch";
import Message from "@component/message";
import { setCookieData } from "@util/cookie";
import { inter_userInfo } from "@util/store";
import { type_ } from "@component/authCheck";
import style from "./index.module.scss";

interface inter_props {
	t: (v: string) => any;
	type: type_;
	end: (v: inter_userInfo) => void;
}

function Index({ type, t, end }: inter_props) {
	const accountRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const [modalType, setModalType] = useState<type_>(type);

	const text = {
		login: {
			title: t(`欢迎您登录`),
			menu: t(`立即登录`),
		},
		register: {
			title: t(`欢迎您注册`),
			menu: t(`立即注册`),
		},
		reset: {
			title: t(`重置密码`),
			menu: t(`立即重置`),
		},
	};

	async function finish() {
		const account: number | undefined = Number(accountRef.current?.value);
		const password: string | undefined = passwordRef.current?.value;

		if (!account) {
			Message.error("手机号必填");
			return;
		}

		if (!password) {
			Message.error("密码必填");
			return;
		}

		sign({
			account,
			password,
		});
	}

	async function sign(param: any) {
		try {
			const { token, msg } = (await Http(
				`/[locale]/api/${modalType === "login" ? "sign" : "user_info"}`,
				{
					method: modalType === "reset" ? "put" : "post",
				},
				param
			)) as { token: string; msg: string };

			if (msg == "重置成功") {
				setModalType("login");
				Message.success(msg);
				return;
			}

			setCookieData("token", token);
			end({ token });
		} catch (err) {
			Message.error(err);
		}
	}

	useEffect(() => {
		const account = accountRef.current as HTMLInputElement;
		const password = passwordRef.current as HTMLInputElement;

		account.value = "";
		password.value = "";
	}, [modalType]);

	return (
		<section className={style.login}>
			<div className={style.logo}>MBlog</div>
			<p>{text[modalType].title}</p>
			<input
				type="number"
				ref={accountRef}
				placeholder={t("请输入您的手机号")}
			/>
			<input type="text" ref={passwordRef} placeholder={t("请输入您的密码")} />
			<button onClick={finish}>{text[modalType].menu}</button>

			<div className={style.flex}>
				{modalType === "login" ? (
					<>
						<span
							onClick={() => {
								setModalType("reset");
							}}
						>
							{t("忘记密码？")}
						</span>
						<span
							onClick={() => {
								setModalType("register");
							}}
						>
							{t("没有账号？点我注册")}
						</span>
					</>
				) : (
					<span
						onClick={() => {
							setModalType("login");
						}}
					>
						{t("已有账号？前往登录")}
					</span>
				)}
			</div>
		</section>
	);
}

export default Index;

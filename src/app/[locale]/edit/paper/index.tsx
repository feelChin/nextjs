"use client";

import { useRef } from "react";
import dayjs from "dayjs";
import Modal from "@component/modal";
import { useRouter } from "next/navigation";
import Http from "@util/fetch";
import { useLocale, useTranslations } from "next-intl";
import Message from "@component/message";
import store from "@util/store";
import style from "./index.module.scss";

export default function Index() {
	const t = useTranslations("edit");
	const locale = useLocale();

	const { userInfo } = store();

	const paparRef = useRef<HTMLDivElement | null>(null);
	const tiemRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();

	const title = t("定时发布");
	const menu = t("发布");

	async function handClick(type?: boolean) {
		const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

		try {
			const param = {
				content: paparRef.current?.innerText,
				start_time: tiemRef.current?.value,
			};

			if (!param.content) {
				Message.error("没有输入内容");
				return;
			}

			if (type) {
				const isValidDateTime = dateTimeRegex.test(param.start_time as string);

				if (!isValidDateTime) {
					Message.error("时间格式不正确");
					return;
				}
			}

			await Http(
				`/[locale]/api/article`,
				{
					method: "post",
					headers: {
						token: userInfo.token,
					},
				},
				param
			);

			Modal.cancel();
			Message.success("发布成功");
			router.push(`/${locale}`);
		} catch (err) {
			Message.error(err);
		}
	}

	function handleTimeModal() {
		Modal.create({
			title,
			width: 260,
			height: 180,
			content: (
				<div className={style.timeModal}>
					<input
						ref={tiemRef}
						defaultValue={dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}
					/>
					<button
						className="menu"
						onClick={() => {
							handClick(true);
						}}
					>
						<i className="iconfont icon-naozhong-F"></i>
						{menu}
					</button>
				</div>
			),
		});
	}

	return (
		<section className={style.form}>
			<div
				className={`${style.item} ${style.textarea}`}
				contentEditable={true}
				ref={paparRef}
				dangerouslySetInnerHTML={{ __html: "" }}
			></div>
			<div className="menuWrapper">
				<button
					className="menu"
					onClick={() => {
						handClick();
					}}
				>
					<i className="iconfont icon-fabusekuai"></i>
					{menu}
				</button>
				<button className="menu" onClick={handleTimeModal}>
					<i className="iconfont icon-naozhong-F"></i>
					{title}
				</button>
			</div>
		</section>
	);
}

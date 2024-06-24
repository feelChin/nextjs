"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import store, { inter_userInfo } from "@util/store";
import { getCookieData } from "@util/cookie";
import Modal from "@component/modal";
import Login from "@component/login";

export type type_ = "login" | "register" | "reset";

interface inter_props {
	children: ReactNode;
	type?: type_;
}

function Index({ children, type = "login" }: inter_props) {
	const t = useTranslations("header");

	const { updateUser } = store();

	const login = (loing_type: type_) => {
		Modal.create({
			width: 420,
			height: 350,
			content: (
				<Login
					t={(v) => {
						return t(v);
					}}
					type={loing_type}
					end={(v: inter_userInfo) => {
						updateUser(v, () => {
							Modal.cancel();
						});
					}}
				/>
			),
		});
	};

	return (
		<section
			onClick={(e) => {
				const token = getCookieData("token");

				if (!token) {
					e.preventDefault();
					e.stopPropagation();
					login(type);
				}
			}}
		>
			{children}
		</section>
	);
}

export default Index;

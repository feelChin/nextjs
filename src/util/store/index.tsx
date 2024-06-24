"use client";

import React, { useState, useContext, createContext, ReactNode } from "react";

type type_update = (v: inter_userInfo, cb?: () => void) => void;
type type_remove = () => void;
type type_setTheme = (v: type_theme) => void;
type type_theme = "light" | "dark";

interface inter_context {
	theme: type_theme;
	changeTheme: type_setTheme;
	userInfo: inter_userInfo;
	updateUser: type_update;
	removeUser: type_remove;
}

export interface inter_userInfo {
	id?: string;
	name?: string;
	avatar?: string;
	banner?: string;
	create_time?: string;
	token?: string | null;
}

const RootContext = createContext<inter_context>({
	theme: "light",
	changeTheme: () => {},
	userInfo: {},
	updateUser: () => {},
	removeUser: () => {},
});

export const RootProvider = ({ children }: { children: ReactNode }) => {
	const [userInfo, setUserInfo] = useState<inter_userInfo>({});
	const [theme, setTheme] = useState<type_theme>("light");

	const update_userInfo: type_update = (val, cb) => {
		setUserInfo({
			...userInfo,
			...val,
		});

		cb && cb();
	};

	const remove_userInfo: type_remove = () => {
		setUserInfo({});
	};

	const changeTheme = (v: type_theme) => {
		document.documentElement.setAttribute("data-theme", v);
		setTheme(v);
	};

	const value: inter_context = {
		theme,
		changeTheme,
		userInfo,
		updateUser: update_userInfo,
		removeUser: remove_userInfo,
	};

	return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export default function Index() {
	return useContext(RootContext);
}

"use client";

import store from "@util/store";
import style from "./index.module.scss";
import { useEffect } from "react";

function Index() {
	const { theme, changeTheme } = store();

	return (
		<section className={style.theme}>
			<div
				className={style.dot}
				onClick={() => {
					const myTheme = theme === "light" ? "dark" : "light";

					changeTheme(myTheme);

					localStorage.setItem("theme", myTheme);
				}}
			></div>
		</section>
	);
}

export default Index;

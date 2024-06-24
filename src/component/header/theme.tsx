"use client";

import store from "@util/store";
import { setCookieData } from "@util/cookie";
import style from "./index.module.scss";

function Index() {
	const { theme, changeTheme } = store();

	return (
		<section className={style.theme}>
			<div
				className={style.dot}
				onClick={() => {
					const myTheme = theme === "light" ? "dark" : "light";

					changeTheme(myTheme);
					setCookieData("theme", myTheme);
				}}
			></div>
		</section>
	);
}

export default Index;

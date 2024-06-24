"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import style from "./index.module.scss";
import { useEffect, useState } from "react";

const lang = [
	{
		code: "cn",
		name: "简体中文",
	},
	{
		code: "tc",
		name: "繁体中文",
	},
];

interface inter_lang {
	code: string;
	name: string;
}

function Index() {
	const { replace } = useRouter();
	const locale = useLocale();
	const pathname = usePathname();

	const [state, setState] = useState<inter_lang>({
		code: "",
		name: "",
	});

	useEffect(() => {
		const [item] = lang.filter((item) => item.code === locale);

		setState(item);
	}, []);

	return (
		<section className={style.langSwitch}>
			<span>{state?.name}</span>
			<div className={style.wrapper}>
				{lang.map(({ code, name }) => {
					return (
						<div
							key={code}
							onClick={() => {
								const prevCode = state.code;

								if (code === prevCode) return;

								replace(pathname.replaceAll(prevCode, code));
							}}
							className={style.item}
						>
							{name}
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Index;

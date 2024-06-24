import { ReactNode } from "react";
import Modal from "@component/modal";
import style from "./index.module.scss";

interface inter_props {
	children: ReactNode;
	title: string | undefined;
}

function Index({ title, children }: inter_props) {
	return (
		<section className={style.defaultModal}>
			{title && <div className={style.title}>{title}</div>}
			<div
				className={style.close}
				onClick={() => {
					Modal.cancel();
				}}
			>
				x
			</div>
			<div className={`${style.wrapper} ${title ? style.hasTitle : ""}`}>
				{children}
			</div>
		</section>
	);
}

export default Index;

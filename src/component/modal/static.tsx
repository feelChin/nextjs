import React, { ReactNode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import create_seed from "./seed";
import DefaultModal from "./default";
import "./index.scss";

type type_rm = undefined | ((v?: boolean) => void);

interface inter_props {
	title?: string;
	type: string;
	width: number;
	height: number;
	content: ReactNode;
	resolve: () => Promise<any>;
}

let remove: type_rm;
let element: HTMLElement;

function CreateModal(props: inter_props) {
	const { type, width, height, content, title, resolve } = props;

	function removeFn(next?: boolean) {
		document.body.removeChild(element);
		if (next) {
			resolve();
		}
	}

	useEffect(() => {
		remove = (next) => {
			element.className = "portal leave";
			element.addEventListener("animationend", () => {
				removeFn(next);
			});
		};

		return () => {
			element.removeEventListener("animationend", () => {
				removeFn();
			});
		};
	}, []);

	return (
		<div
			className={"portalWrapper"}
			style={{
				width,
				height,
			}}
		>
			{type !== "type" ? (
				<DefaultModal title={title}> {content}</DefaultModal>
			) : (
				""
			)}
		</div>
	);
}

export default {
	create: (data: any) => {
		return new Promise((resolve) => {
			const seed = create_seed();

			const init = () => {
				element = document.createElement("section");
				element.className = "portal";
				element.setAttribute("seed", seed);
				document.body.appendChild(element);
				return createRoot(element);
			};

			init().render(<CreateModal resolve={resolve} seed={seed} {...data} />);
		});
	},
	next: () => {
		remove && remove(true);
	},
	cancel: () => {
		remove && remove();
	},
};

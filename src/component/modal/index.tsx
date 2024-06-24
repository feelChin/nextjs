import React from "react";
import Portal from "./portal";
import modal_static from "./static";
import "./index.scss";

function Modal(props: any) {
	return <Portal {...props} />;
}

Modal.create = modal_static["create"];
Modal.next = modal_static["next"];
Modal.cancel = modal_static["cancel"];

export default Modal;

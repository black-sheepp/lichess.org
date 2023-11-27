import React from "react";
import Styles from "./Loader.module.css";

const Loader = () => {
	return (
		<div className="flex justify-center mt-10">
			<div className={Styles.spinner}>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Loader;

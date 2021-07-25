import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	const cartTotalItems = cartCtx.items.reduce((accumulator, item) => {
		return accumulator + item.amount;
	}, 0);

	// Max's example
	// const [btnBadgeChanged, setBtnBadgeChanged] = useState(false);
	// const btnClasses = `${classes.button} ${btnBadgeChanged ? classes.bump : ""}`;
	// useEffect(() => {
	// 	if (cartCtx.items.length === 0) return;
	// 	setBtnBadgeChanged(true);
	// 	const timer = setTimeout(() => {
	// 		setBtnBadgeChanged(false);
	// 	}, 300);
	// 	return () => {
	// 		clearTimeout(timer);
	// 	};
	// }, [cartCtx.items]);

	const [btnClasses, setBtnClasses] = useState(`${classes.button}`);

	useEffect(() => {
		if (cartCtx.items.length === 0) return;
		setTimeout(() => {
			setBtnClasses(`${classes.button} ${classes.bump}`);
		}, 30);
		return () => {
			setBtnClasses(`${classes.button}`);
		};
	}, [cartCtx.items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{cartTotalItems}</span>
		</button>
	);
};

export default HeaderCartButton;

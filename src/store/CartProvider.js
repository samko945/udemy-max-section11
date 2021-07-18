import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartDefaultState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		// const updatedItems = state.items.concat(action.item);
		const updatedItems = [...state.items, action.item];
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return cartDefaultState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, cartDefaultState);

	const addToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};
	const removeFromCartHandler = (id) => {};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addToCartHandler,
		removeItem: removeFromCartHandler,
	};
	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;

import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartDefaultState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = [...state.items, action.item];
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE") {
		const cartItemIndex = state.items.findIndex((item) => item.id === action.id);
		const cartItem = state.items[cartItemIndex];

		let updatedState = { ...state };
		updatedState.totalAmount -= cartItem.price;
		if (cartItem.amount === 1) {
			const updatedItems = updatedState.items.filter((item) => item.id !== action.id);
			updatedState.items = updatedItems;
		} else {
			updatedState.items[cartItemIndex].amount -= 1;
		}
		return updatedState;
	}

	return cartDefaultState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, cartDefaultState);

	const addToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};
	const removeFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addToCartHandler,
		removeItem: removeFromCartHandler,
	};
	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;

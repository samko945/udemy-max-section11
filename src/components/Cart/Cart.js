import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const removeItemHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const addItemHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					/*
            Alternative to using anonymous function to pass params without executing.
            The bind() method creates a new function that, when called, has its this keyword set to the provided value, 
            with a given sequence of arguments preceding any provided when the new function is called.
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
          */
					onRemove={removeItemHandler.bind(null, item.id)}
					onAdd={addItemHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal closeModal={props.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button onClick={props.onHideCart} className={classes["button--alt"]}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;

import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);
	function showCartHandler() {
		setCartIsShown(true);
	}
	function hideCartHandler() {
		setCartIsShown(false);
	}
	return (
		<Fragment>
			{cartIsShown && <Cart onHideCart={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<Meals />
		</Fragment>
	);
}

export default App;

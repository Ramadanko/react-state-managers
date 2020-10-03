import React, { useMemo } from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";

export default function Cart({ cart, updateQuantity }) {
    const urls = cart.map((i) => `products/${i.id}`);
    const { data: products, loading, error } = useFetchAll(urls);

    function renderItem(itemInCart) {
        const { id, sku, quantity } = itemInCart;
        const { price, name, image, skus } = products.find(
            (p) => p.id === parseInt(id)
        );
        const { size } = skus.find((s) => s.sku === sku);

        return (
            <li key={sku} className="cart-item">
                <img src={`/images/${image}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>Size: {size}</p>
                    <p>
                        <select
                            aria-label={`Select quantity for ${name} size ${size}`}
                            onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
                            value={quantity}
                        >
                            <option value="0">Remove</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                </div>
            </li>
        );
    }



    /**
     * @description
     * derived state that changes when cart items get updated
     * The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
     * @param total: accumulator variable that gets passed to each element of the array to increase it or to do whatever we want
     * it is mostly used to get the sum of specific key across all object in a givin array
     * ANY REACT HOOK, must be called before any return of the the rendered items since hooks cannot be called conditionally
     */
    const numItemsInCart = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

    if (loading) return <Spinner />;
    if (error) throw error;

    return (
        <section id="cart">
            <h1>
                {numItemsInCart === 0
                    ? "Your cart is empty"
                    : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
            </h1>
            <ul>{cart.map(renderItem)}</ul>
        </section>
    );
}

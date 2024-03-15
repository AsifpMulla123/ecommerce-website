import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../Stripe.css";
import { useSelector } from "react-redux";
import CheckOutForm from "./CheckOutForm";
import { selectCurrentOrder } from "../features/order/OrderSlice";

const stripePromise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");

export default function Stripecheckout() {
    const [clientSecret, setClientSecret] = useState("");
    const CurrentOrder = useSelector(selectCurrentOrder);
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:8080/create-payment-intent", {
        // fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId:currentOrder.id }),
            body: JSON.stringify({ totalAmount: CurrentOrder.totalAmount }),
            meta: {
                order_id: CurrentOrder.id
            }
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
            // eslint-disable-next-line
    }, []);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            )}
        </div>
    );
}
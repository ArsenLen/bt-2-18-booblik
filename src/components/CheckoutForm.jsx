import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import styled from "styled-components";

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "black",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "black",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const Form = styled.form`
    width: 30%;
    background-color : lightblue;
    height : 100px;
  `

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = (e) => {
        e.preventDefault()
        const { paymentMethod } = stripe.createPaymentMethod({
          type : "card",
          card : elements.getElement(CardElement)
        }) 
    }
    return (
        <Form onSubmit={handleSubmit}>
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
        </Form>
    );
};

export default CheckoutForm;
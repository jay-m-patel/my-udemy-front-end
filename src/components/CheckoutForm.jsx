import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent } from '@material-ui/core'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { uploadPaidStatus } from './../state/user/action'
import { serverURL } from './../state/serverURL'

function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))

    const token = tokenCookie ? tokenCookie
    .split('=')[1] : null;

    const body = {
      paymentType: (props.location.state && props.location.state.paymentType) || props.paymentType ,
      payable: (props.location.state && props.location.state.payable) || props.payable 
    }

    console.log(body)
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(`${serverURL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    console.log("paying")
    // this.props.showLoading()

    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      console.log("payment successful")
      const body = {
        paymentType: (props.location.state && props.location.state.paymentType) || props.paymentType,
        paidAmount: (props.location.state && props.location.state.payable) || props.payable
      } 

      if((props.location.state && props.location.state.paymentType === "purchase") || props.paymentType !== "premium") {
        body.purchaserId = (props.location.state && props.location.state.purchaserId) || props.purchaserId
        body.courseId = (props.location.state && props.location.state.courseId) || props.courseId
        // body.redirectTo = `/course/${props.courseId}`
      }
      else {
        body.uploaderId = (props.location.state && props.location.state.uploaderId) || props.uploaderId
        // body.redirectTo = '/'
      }
      console.log(body)
      // const returnedHideLoading = await 
      props.uploadPaidStatus(body)
      // returnedHideLoading()
      if((props.location.state && props.location.state.paymentType !== "purchase") || props.paymentType === "premium")
      props.history.replace('/')
      
      else props.history.replace(`/course`)

    }
  };
  return (
    <Container maxWidth='xs'>
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className="pay-button"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded
        <br/>
        Thank you
      </p>
    </form>
    </Container>
  );
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  uploadPaidStatus: body => dispatch(uploadPaidStatus(body)),
  showLoading: () => dispatch(showLoading()),
  // hideLoading: () => dispatch(hideLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
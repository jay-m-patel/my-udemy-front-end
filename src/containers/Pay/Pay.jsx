import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./../../components/CheckoutForm";
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, FormControlLabel, Checkbox } from '@material-ui/core'
import "./style.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.

const promise = loadStripe("pk_test_51HT7gBGEQ5yLDQXHY6IK9SaeM6WsRE4fpg5RPH07IRF51XOHCJCzJDSxilZXO45SAdEpM7gFacrvtd1ipU0dO7WB00t3AgZJMq");
export default class Pay extends Component {
  render() {

    return (
      <Container maxWidth='xs'>
        <Card>
          <CardHeader title="Payment"
            subheader={`${(this.props.location.state && this.props.location.state.payable) || this.props.payable}/- INR`}
          >
          </CardHeader>
          <CardContent>
            <Elements stripe={promise}>
              <CheckoutForm {...this.props}/>
            </Elements>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

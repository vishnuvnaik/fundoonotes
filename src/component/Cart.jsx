import React, { Component } from "react";
import CardStepper from "./Cardstepper";
import { Divider, Button, IconButton } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { myCart } from "../services/userServices";
import userServices from "../services/userServices";
import "../CSS/cart.css";
import Snackbar from "@material-ui/core/Snackbar";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressBarView: false,
      address: "",
      cartStepper: 0,
      cartData: "",
      cartID: "",
      isOrderPlaced: "",
      snackbarOpen: false,
      snackbarMsg: "",
      snackbarMsgType: "",
    };
  }

  componentDidMount = () => {
    myCart().then((response) => {
      this.setState({ cartID: response.data.data[0].id });
      this.setState({ cartData: response.data.data[0].product });
      this.setState({ isOrderPlaced: response.data.data[0].isOrderPlaced });
      this.setState({
        cartStepper: response.data.data[0].isOrderPlaced ? 2 : 0,
      });
    });
  };
  cartStepperChange = () => {
    this.setState({ cartStepper: this.state.cartStepper + 1 });
  };
  displaySnackbar = (open, type, msg) => {
    this.setState({
      snackbarOpen: open,
      snackbarMsgType: type,
      snackbarMsg: msg,
    });
  };
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  checkOutOrder = () => {
    this.setState({ addressBarView: true });
    this.cartStepperChange();
  };
  placeOrder = () => {
    if (!this.state.address) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Address should not be empty",
      });
    } else {
      userServices
        .placeOrder(this.state.cartID, this.state.address)
        .then((res) => {
          this.cartStepperChange();
        });
    }
  };

  render() {
    return (
      <div className="notes_container">
        <div className="cart_container">
          <CardStepper cartStepper={this.state.cartStepper} />
          <h3>Shopping Cart</h3>
          <Divider />
          <div className="shopping_cart">
            <div className="shopping_cart_service_main">
              <div className="shopping_cart_service">
                <div>${this.state.cartData.price} per month</div>
                <div>{this.state.cartData.name}</div>
              </div>
            </div>
            <div>
              <div className="shopping_cart_blueFont">basic Pack Details</div>
              <div style={{ width: "240px" }}>
                {this.state.cartData.description}
              </div>
            </div>
            <div>
              <div>price</div>
              <div className="shopping_cart_blueFont">
                ${this.state.cartData.price}
              </div>
            </div>
            <div>
              <div>validity</div>
              <div className="shopping_cart_blueFont">per month</div>
            </div>
            <div className="service_card_subtotal_media">
              <div className="service_card_subtotal">
                <div>Subtotal(1 item) : ${this.state.cartData.price}</div>
                {this.state.isOrderPlaced ? (
                  <div className="orderPlaced">Order Placed</div>
                ) : (
                  <div>
                    <div
                      className={this.state.addressBarView ? "showAdd" : "hide"}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.placeOrder}
                      >
                        Place Your Order
                      </Button>
                    </div>
                    <div
                      className={
                        !this.state.addressBarView ? "showAdd" : "hide"
                      }
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.checkOutOrder}
                      >
                        Process to checkout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Divider />

          <div className="shopping_cart_blueFont">
            Sub Total ( 1 item ): ${this.state.cartData.price}
          </div>
          <div
            className={
              this.state.addressBarView ? "shopping_address showAdd" : "hide"
            }
          >
            <div>
              <TextareaAutosize
                aria-label="minimum height"
                value={this.state.address}
                onChange={(e) => this.setState({ address: e.target.value })}
                rowsMin={3}
                placeholder="Enter Your Address"
              />
              <div>
                <p>payment method</p>
                <h4 className="shopping_cart_blueFont">Cash on Delivery</h4>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackbarOpen: false })}
          message={this.state.snackbarMsg}
        ></Snackbar>
      </div>
    );
  }
}

export default Cart;

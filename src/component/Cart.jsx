import React, { Component } from "react";
import CardStepper from "./Cardstepper";
import { Divider, Button, IconButton } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import userServices from "../services/userServices";
import "../CSS/cart.css";

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
    };
  }

  componentWillMount = () => {
    userServices.myCart().then((res) => {
      this.setState({ cartData: res.data.data[0].product });
      this.setState({ cartID: res.data.data[0].id });
      this.setState({ isOrderPlaced: res.data.data[0].isOrderPlaced });
      this.setState({ cartStepper: res.data.data[0].isOrderPlaced ? 2 : 0 });
    });
  };
  cartStepperChange = () => {
    this.setState({ cartStepper: this.state.cartStepper + 1 });
  };
  checkOutOrder = () => {
    this.setState({ addressBarView: true });
    this.cartStepperChange();
  };
  placeOrder = () => {
    if (!this.state.address) {
      this.props.displaySnackbar(true, "error", "Fill your address");
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
                      className={this.state.addressBarView ? "show" : "hide"}
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
                      className={!this.state.addressBarView ? "show" : "hide"}
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
              this.state.addressBarView ? "shopping_address show" : "hide"
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
            </div>
            <div>
              <p>payment method</p>
              <h4 className="shopping_cart_buleFont">Cash on Delivery</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;

import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "../CSS/cart.css";

function getSteps() {
  return ["signin", "review", "complete"];
}

export default function CardStepper(props) {
  const [] = React.useState(2);
  const steps = getSteps();

  return (
    <div className="cartStepper">
      <span>FundooNotes</span>
      <Stepper activeStep={props.cartStepper}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <div>
                {props.cartStepper === index ? (
                  <ShoppingCartIcon fontSize="large" color="primary" />
                ) : null}
              </div>
              <div>{label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

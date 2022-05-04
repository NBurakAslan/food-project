import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = val => val.trim() === "";
const isFiveChars = val => val.trim().length === 5;
const Checkout = props => {
  const [formInputValidty, setFormInputValidty] = useState({
    name: true,
    stree: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    if (!enteredName) {
      console.log(enteredName);
    }

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid =
      !isFiveChars(enteredPostal);

    setFormInputValidty({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={confirmHandler}
    >
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidty.name && (
          <p>plz enter valid name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          ref={streetInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          ref={postalInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='city' ref={cityInputRef}>
          City
        </label>
        <input type='text' id='city' />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

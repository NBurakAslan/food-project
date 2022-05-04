import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = val => val.trim() === "";
const isFiveChars = val => val.length === 5;
const Checkout = props => {
  const [formInputValidty, setFormInputValidty] = useState({
    name: true,
    street: true,
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

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

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
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };

  const ınputClassName = `${classes.control} ${
    formInputValidty.name ? "" : classes.invalid
  }`;

  const ınputClassStreet = `${classes.control} ${
    formInputValidty.street ? "" : classes.invalid
  }`;

  const ınputClassPostal = `${classes.control} ${
    formInputValidty.postalCode ? "" : classes.invalid
  }`;

  const ınputClassCity = `${classes.control} ${
    formInputValidty.city ? "" : classes.invalid
  }`;

  return (
    <form
      className={classes.form}
      onSubmit={confirmHandler}
    >
      <div className={ınputClassName}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidty.name && (
          <p>plz enter valid name</p>
        )}
      </div>
      <div className={ınputClassStreet}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          ref={streetInputRef}
        />
        {!formInputValidty.street && (
          <p>plz enter valid street</p>
        )}
      </div>
      <div className={ınputClassPostal}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          ref={postalInputRef}
        />
        {!formInputValidty.postalCode && (
          <p>plz enter valid postalCode (5 digit number)</p>
        )}
      </div>
      <div className={ınputClassCity}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidty.city && (
          <p>plz enter valid city</p>
        )}
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

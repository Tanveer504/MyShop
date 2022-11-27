import React, { Component } from "react";
import "./AddressCheckout.scss";
import { NavLink } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
import Select from "react-select";
import { withRouter } from "./withRouter";
import fetchUrls from "../../config/config.json";
const options = [
  { value: "India", label: "India" },
  { value: "China", label: "China" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "Russia", label: "Russia" },
];

const states = [
  { value: "Karnataka", label: "Karnataka" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Kerala", label: "Kerala" },
];

class AddressCheckout extends Component {
  constructor() {
    super();
    this.handleContinue = this.handleContinue.bind(this);
    this.data = null;
    this.cartNo = 0;
    this.total = 0;
    this.billingInput = 0;
    this.state = {
      itemList: [],
      cartNo: 0,
      totalItems: 0,
      error: "",
      firstNameError: "",
      lastNameError: "",
      streetAddressError: "",
      cityError: "",
      pinCodeError: "",
      mobilePhoneError: "",
      addressContdError: "",
      countryInputError: "",
      stateError: "",
      billingFirstName: "",
      billingLastName: "",
      billingStreetAddress: "",
      billingStreetAddressContd: "",
      billingCity: "",
      billingCountryInput: {},
      billingState: "State",
      billingPin: "",
      billingPhoneInput: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingStreetAddress: "",
      shippingStreetAddressContd: "",
      shippingCity: "",
      shippingCountryInput: {},
      shippingState: "",
      shippingPin: "",
      shippingPhoneInput: "",
      BillingSameAsShipping: false,
    };
  }

  handleCheckboxSelection(event) {
    const checked = event.target.checked;

    if (checked) {
      this.setState({
        shippingFirstName: this.state.billingFirstName,
        shippingLastName: this.state.billingLastName,
        shippingStreetAddress: this.state.billingStreetAddress,
        shippingCity: this.state.billingCity,
        shippingPhoneInput: this.state.billingPhoneInput,
        shippingPin: this.state.billingPin,
        shippingStreetAddressContd: this.state.billingStreetAddressContd,
        shippingCountryInput: { ...this.state.billingCountryInput },
        shippingState: { ...this.state.billingState },
        BillingSameAsShipping: true,
      });
    } else {
      this.setState({
        shippingFirstName: "",
        shippingLastName: "",
        shippingStreetAddress: "",
        shippingCity: "",
        shippingPhoneInput: "",
        shippingPin: "",
        shippingStreetAddressContd: "",
        shippingCountryInput: "",
        shippingState: "",
        BillingSameAsShipping: false,
      });
    }
  }

  handleRequiredValidation(event) {
    let errorMessage = event.target.name;
    switch (errorMessage) {
      case "billingFirstName":
        if (event.target.value === "") {
          this.setState({ firstNameError: "This field is required" });
        } else {
          this.setState({ firstNameError: "" });
        }
        break;
      case "billingLastName":
        if (event.target.value === "") {
          this.setState({ lastNameError: "This field is required" });
        } else {
          this.setState({ lastNameError: "" });
        }
        break;
      case "billingStreetAddress":
        if (event.target.value === "") {
          this.setState({ streetAddressError: "This field is required" });
        } else {
          this.setState({ streetAddressError: "" });
        }
        break;
      case "billingCity":
        if (event.target.value === "") {
          this.setState({ cityError: "This field is required" });
        } else {
          this.setState({ cityError: "" });
        }
        break;
      case "billingPin":
        if (event.target.value === "") {
          this.setState({ pinCodeError: "This field is required" });
        } else {
          this.setState({ pinCodeError: "" });
        }
        break;

      case "billingPhoneInput":
        if (event.target.value === "") {
          this.setState({ mobilePhoneError: "This field is required" });
        } else {
          this.setState({ mobilePhoneError: "" });
        }
        break;
      case "billingStreetAddressContd":
        if (event.target.value === "") {
          this.setState({ addressContdError: "This field is required" });
        } else {
          this.setState({ addressContdError: "" });
        }
        break;
      case "billingCountryInput":
        if (event.target.value === "") {
          this.setState({ countryInputError: "This field is required" });
        } else {
          this.setState({ countryInputError: "" });
        }
        break;
      case "billingState":
        if (event.target.value === "") {
          this.setState({ stateError: "This field is required" });
        } else {
          this.setState({ stateError: "" });
        }
        break;
      default:
    }
  }

  handleNameCharValidation(event) {
    if (event.target.name === "billingFirstName") {
      this.setState({ billingFirstName: event.target.value });
    } else if (event.target.name === "billingLastName") {
      this.setState({ billingLastName: event.target.value });
    }
    let textElement = event.target.value;
    let pattern = /^[A-Za-z ]+$/;
    // Validate TextBox value against the Regex.
    let isValid = pattern.test(textElement);
    if (event.target.value == "") {
      this.handleRequiredValidation(event);
    }
    if (!isValid && event.target.name === "billingFirstName") {
      this.setState({ firstNameError: "Name should only have alphabets!" });
    }
    if (!isValid && event.target.name === "billingLastName") {
      this.setState({ lastNameError: "Name should only have alphabets!" });
    }
    if (isValid) {
      if (event.target.name === "billingFirstName") {
        this.setState({ firstNameError: "" });
      }
      if (event.target.name === "billingLastName") {
        this.setState({ lastNameError: "" });
      }
    }
    if (event.target.value.length >= 40) {
      this.setState({
        firstNameError: "Name should have less than 40 characters!",
      });
    }
  }

  handleAddressValidation(event) {
    let streetAddressName = event.target.name;
    let booleanVal = streetAddressName === "billingStreetAddress";

    if (booleanVal) {
      this.setState({ billingStreetAddress: event.target.value });

      if (event.target.value.length >= 70) {
        this.setState({
          streetAddressError: "Address should have less than 70 characters!",
        });
      } else if (event.target.value.length < 70) {
        this.setState({ streetAddressError: "" });
      }
    } else {
      this.setState({ billingStreetAddressContd: event.target.value });

      if (event.target.value.length >= 70) {
        this.setState({
          addressContdError: "Address should have less than 70 characters!",
        });
      } else if (event.target.value.length < 70) {
        this.setState({ addressContdError: "" });
      }
    }
  }

  handleCityValidation(event) {
    this.setState({ billingCity: event.target.value });

    let textElement = event.target.value;
    let pattern = /^[A-Za-z ]+$/;
    // Validate TextBox value against the Regex.
    let isValid = pattern.test(textElement);

    if (!isValid) {
      this.setState({ cityError: "City should only have alphabets!" });
    } else {
      this.setState({ cityError: "" });
    }
    if (event.target.value.length >= 20) {
      this.setState({ cityError: "City should have less than 20 characters!" });
    }
  }

  handlePincodeValidation(event) {
    this.setState({ billingPin: event.target.value });
    var pin = "^[1-9][0-9]{4}$";

    if (event.target.value.match(pin)) {
      this.setState({ pinCodeError: "" });
      this.correctPin = true;
    }
    if (event.target.value.length > 6) {
      this.setState({ pinCodeError: "Pincode should have 6 digits!" });
    }
  }

  handlePhoneValidation(event) {
    this.setState({ billingPhoneInput: event.target.value });
    let phoneno = "^([0|+[0-9]{1,5})?([0-9]{11})$";

    if (event.target.value.match(phoneno)) {
      this.setState({ mobilePhoneError: "" });
      this.correctPhone = true;
    }
    if (event.target.value.length > 13) {
      this.setState({ mobilePhoneError: "This number is not valid!" });
      // event.preventDefault();
    }
  }

  getCartDetails(orderList) {
    let cartNo = orderList.length;
    let total = 0;
    for (let i = 0; i < cartNo; i++) {
      let prices = orderList[i].price;
      let matches = String(prices).match(/(\d+)/);
      total += parseInt(matches[0]) * orderList[i].quantity;
    }
    let detailsArray = [cartNo, total];
    return detailsArray;
  }

  finalAlert() {
    if (
      this.state.billingFirstName !== "" &&
      this.state.billingLastName !== "" &&
      this.state.billingCity !== "" &&
      this.state.billingStreetAddress !== "" &&
      this.state.billingStreetAddressContd !== "" &&
      this.state.billingState !== "" &&
      this.state.billingCountryInput !== "" &&
      this.state.billingPhoneInput !== "" &&
      this.state.billingPin !== ""
    ) {
      return true;
    }
    alert("All fields are required");
    return false;
  }

  handleContinue() {
    fetch(`${fetchUrls.cartItemsApi}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          itemList: data,
        });
        // json converted data
        let details = this.getCartDetails(this.state.itemList);
        this.cartNo = details[0];
        this.total = details[1];
        this.setState({
          cartNo: details[0],
          totalItems: details[1],
        });

        this.totalItems += this.cartNo;
        this.orderTotal += this.total;
        let search = window.location.search;

        if (search === "") {
          this.handleContinueForNewUsers(this.cartNo, this.total);
        } else {
          this.handleContinueForExistingUsersAfterContinue(
            this.cartNo,
            this.total
          );
        }
      });
  }

  componentDidMount() {
    let search = window.location.search;
    if (search !== "") {
      this.handleContinueForExistingUsers();
    }
  }

  forContinue() {
    let billingData = {
      firstName: this.state.billingFirstName,
      lastName: this.state.billingLastName,
      address: this.state.billingStreetAddress,
      addressContd: this.state.billingStreetAddressContd,
      city: this.state.billingCity,
      country: this.state.billingCountryInput,
      state: this.state.billingState,
      pin: this.state.billingPin,
      phone: this.state.billingPhoneInput,
    };
    let shippingData = {
      firstName: this.state.shippingFirstName,
      lastName: this.state.shippingLastName,
      address: this.state.shippingStreetAddress,
      addressContd: this.state.shippingStreetAddressContd,
      city: this.state.shippingCity,
      country: this.state.shippingCountryInput,
      state: this.state.shippingState,
      pin: this.state.shippingPin,
      phone: this.state.shippingPhoneInput,
    };
    let postData = {
      totalItems: this.cartNo,
      totalPrice: this.total,
      billingAddress: billingData,
      shippingAddress: shippingData,
      isOrderCompleted: false,
    };
    return billingData, shippingData, postData;
  }

  handleContinueForExistingUsersAfterContinue(cartNo, total) {
    if (this.finalAlert()) {
      let billingData,
        shippingData,
        postData = this.forContinue();
      let search = window.location.href;
      let orderId = search.split("?")[1];
      postData.totalItems = cartNo;
      postData.totalPrice = total;
      fetch(`${fetchUrls.orderApi}/${orderId}`, {
        method: "PATCH",
        // Adding body or contents to send
        body: JSON.stringify(postData),
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          // success response
          return res.json();
        })
        .then((data) => {
          this.props.navigate(`/checkout/shipping/orderID=${data.id}`);
          //	window.location.href = "http://localhost:3000/checkout/shipping/orderID=" + data.id;
          return data.id;
        });
    }
  }

  handleContinueForNewUsers(cartNo, total) {
    if (this.finalAlert()) {
      let billingData,
        shippingData,
        postData = this.forContinue();
      postData.totalItems = cartNo;
      postData.totalPrice = total;
      fetch(`${fetchUrls.orderApi}`, {
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(postData),
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.props.navigate(`/checkout/shipping/orderID=${data.id}`);
          //window.location.href = "http://localhost:3000/checkout/shipping/orderID=" + data.id;
        });
    }
  }
  handleContinueForExistingUsers() {
    // If someone is coming from final-checkout page to edit the details
    let search = window.location.search;
    let orderId = parseInt(search.match(/(\d+)/)[0]);
    fetch(`${fetchUrls.orderApi}/${orderId}`)
      .then((res) => {
        return res.json();
      })
      .then((orderList) => {
        this.setState({
          billingFirstName: orderList.billingAddress.firstName,
          billingLastName: orderList.billingAddress.lastName,
          billingStreetAddress: orderList.billingAddress.address,
          billingStreetAddressContd: orderList.billingAddress.addressContd,
          billingCity: orderList.billingAddress.city,
          billingPhoneInput: orderList.billingAddress.phone,
          billingPin: orderList.billingAddress.pin,
          billingCountryInput: { ...orderList.billingAddress.country },
          billingState: { ...orderList.billingAddress.state },
          BillingSameAsShipping: false,
        });
        this.setState({
          shippingFirstName: orderList.shippingAddress.firstName,
          shippingLastName: orderList.shippingAddress.lastName,
          shippingStreetAddress: orderList.shippingAddress.address,
          shippingCity: orderList.shippingAddress.city,
          shippingPhoneInput: orderList.shippingAddress.phone,
          shippingPin: orderList.shippingAddress.pin,
          shippingStreetAddressContd: orderList.shippingAddress.addressContd,
          shippingCountryInput: { ...orderList.shippingAddress.country },
          shippingState: { ...orderList.shippingAddress.state },
          BillingSameAsShipping: false,
        });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCountryInput(e) {
    this.setState({
      billingCountryInput: e,
    });
  }

  handleStateShipping(e) {
    this.setState({
      billingState: e,
    });
  }

  render() {
    var { billingCountryInput } = this.state;
    return (
      <div>
        <section className="orderStep">
          <h1>Checkout</h1>
          <NavLink
            to="/checkout/addresscheckout"
            activeClassName="active"
            id="address-checkout"
          >
            Address
          </NavLink>
          <NavLink to="#" activeclassname="active" id="shipping-checkoutt">
            Shipping
          </NavLink>
          <NavLink to="#" activeclassname="active" id="payment-checkoutt">
            Payment
          </NavLink>
          <NavLink to="#" activeclassname="active" id="final-checkoutt">
            FinalCheckout
          </NavLink>
        </section>
        <section className="formsSection">
          <form
            className="addressForm1"
            id="billingForm"
            name="billingForm"
            onKeyUp={this.handleCheckboxSelection1}
          >
            <fieldset>
              <legend>Billing Address</legend>
              <div>
                <label htmlFor="billingFirstName" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.billingFirstName}
                  id="billingFirstName"
                  name="billingFirstName"
                  onChange={this.handleNameCharValidation.bind(this)}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  required={true}
                  autoFocus
                  placeholder="First name"
                  defaultValue={this.state.billingFirstName}
                />
                <p className="errorMessage">{this.state.firstNameError}</p>
              </div>
              <div>
                <label htmlFor="billingLastName" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.billingLastName}
                  id="billingLastName"
                  name="billingLastName"
                  onChange={this.handleNameCharValidation.bind(this)}
                  required={true}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  placeholder="Last name"
                  defaultValue={this.state.billingLastName}
                />
                <p className="errorMessage">{this.state.lastNameError}</p>
              </div>
              <div>
                <label htmlFor="billingStreetAddress" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.billingStreetAddress}
                  id="billingStreetAddress"
                  name="billingStreetAddress"
                  onChange={this.handleAddressValidation.bind(this)}
                  required={true}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  placeholder="Street Address"
                  defaultValue={this.state.billingStreetAddress}
                />
                <p className="errorMessage">{this.state.streetAddressError}</p>
              </div>
              <div>
                <label htmlFor="billingStreetAddressContd" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.billingStreetAddressContd}
                  id="billingStreetAddressContd"
                  name="billingStreetAddressContd"
                  onChange={this.handleAddressValidation.bind(this)}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  placeholder="Street Address Continued"
                  defaultValue={this.state.billingStreetAddressContd}
                />
                <p className="errorMessage">{this.state.addressContdError}</p>
              </div>
              <div>
                <label htmlFor="billingCity" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.billingCity}
                  id="billingCity"
                  name="billingCity"
                  onChange={this.handleCityValidation.bind(this)}
                  required={true}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  placeholder="City"
                  defaultValue={this.state.billingCity}
                />
                <p className="errorMessage">{this.state.cityError}</p>
              </div>
              <div>
                <label htmlFor="billingCountryInput">Country</label>
                <Select
                  options={options}
                  value={this.state.billingCountryInput}
                  onChange={this.handleCountryInput.bind(this)}
                  className="inputSelect"
                />
              </div>
              <div>
                <label htmlFor="billingState">State</label>
                <Select
                  options={states}
                  value={this.state.billingState}
                  onChange={this.handleStateShipping.bind(this)}
                  className="inputSelect"
                />
              </div>
              <div>
                <label htmlFor="billingPin" />
                <input
                  type="number"
                  className="focusField"
                  ref={this.billingPin}
                  id="billingPin"
                  name="billingPin"
                  required={true}
                  onChange={this.handlePincodeValidation.bind(this)}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  placeholder="Pincode"
                  defaultValue={this.state.billingPin}
                />
                <p className="errorMessage">{this.state.pinCodeError}</p>
              </div>
              <div>
                <label htmlFor="billingPhoneInput" />
                <span>
                  <strong>Format:+(country-code)(phone-number)</strong>
                </span>
                <input
                  type="tel"
                  className="focusField"
                  ref={this.billingPhoneInput}
                  id="billingPhoneInput"
                  name="billingPhoneInput"
                  onChange={this.handlePhoneValidation.bind(this)}
                  required={true}
                  onBlur={this.handleRequiredValidation.bind(this)}
                  placeholder="Phone Number"
                  defaultValue={this.state.billingPhoneInput}
                />
                <p className="errorMessage">{this.state.mobilePhoneError}</p>
              </div>
            </fieldset>
          </form>
          <div className="addressCheckbox">
            <input type="checkbox" onClick={this.handleCheckboxSelection} />
            <label htmlFor="checkboxIdMobile">
              Billing address same as shipping address.
            </label>
          </div>
          <form className="addressForm2" id="shippingForm" name="shippingForm">
            <fieldset>
              <legend>Shipping Address</legend>
              <div>
                <label htmlFor="shippingFirstName" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.shippingFirstName}
                  id="shippingFirstName"
                  name="shippingFirstName"
                  onChange={this.handleNameCharValidation.bind(this)}
                  required={true}
                  disabled={this.state.BillingSameAsShipping}
                  placeholder="First name"
                  defaultValue={this.state.shippingFirstName}
                />
                <span id="errorMsg" />
              </div>
              <div>
                <label htmlFor="shippingLastName" />
                <input
                  type="text"
                  title="Enter in valid format"
                  className="focusField"
                  ref={this.shippingLastName}
                  id="shippingLastName"
                  name="shippingLastName"
                  onChange={this.handleNameCharValidation.bind(this)}
                  required={true}
                  disabled={this.state.BillingSameAsShipping}
                  placeholder="Last name"
                  defaultValue={this.state.shippingLastName}
                />
                <span id="errorMsg" />
              </div>
              <div>
                <label htmlFor="shippingStreetAddress" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.shippingStreetAddress}
                  id="shippingStreetAddress"
                  name="shippingStreetAddress"
                  onChange={this.handleAddressValidation.bind(this)}
                  required={true}
                  disabled={this.state.BillingSameAsShipping}
                  placeholder="Street Address"
                  defaultValue={this.state.shippingStreetAddress}
                />
                <span id="errorMsg" />
              </div>
              <div>
                <label htmlFor="shippingStreetAddressContd" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.shippingStreetAddressContd}
                  id="shippingStreetAddressContd"
                  name="shippingStreetAddressContd"
                  onChange={this.handleAddressValidation.bind(this)}
                  placeholder="Street Address Continued"
                  defaultValue={this.state.shippingStreetAddressContd}
                />
                <span id="errorMsg" />
              </div>
              <div>
                <label htmlFor="shippingCity" />
                <input
                  type="text"
                  className="focusField"
                  ref={this.shippingCity}
                  id="shippingCity"
                  name="shippingCity"
                  onChange={this.handleCityValidation.bind(this)}
                  required={true}
                  disabled={this.state.BillingSameAsShipping}
                  placeholder="City"
                  defaultValue={this.state.shippingCity}
                />
                <span id="errorMsg" />
              </div>
              <div>
                <label htmlFor="shippingCountryInput">Country</label>
                <Select
                  options={options}
                  value={this.state.shippingCountryInput}
                  onChange={this.handleCountryInput.bind(this)}
                  className="inputSelect"
                />
              </div>
              <div>
                <label htmlFor="shippingState">State</label>
                <Select
                  options={states}
                  value={this.state.shippingState}
                  onChange={this.handleStateShipping.bind(this)}
                  className="inputSelect"
                />
              </div>
              <div>
                <label htmlFor="shippingPin" />
                <input
                  type="number"
                  className="focusField"
                  ref={this.shippingPin}
                  id="shippingPin"
                  name="shippingPin"
                  onChange={this.handlePincodeValidation}
                  defaultValue={this.state.shippingPin}
                  required={true}
                  disabled={this.state.BillingSameAsShipping}
                  placeholder="Pincode"
                />
                <span id="errorMsg" />
              </div>
              <div>
                <label htmlFor="shippingPhoneInput" />
                <span>
                  <strong>Format:+(country-code)(phone-number)</strong>
                </span>
                <input
                  type="tel"
                  className="focusField"
                  ref={this.shippingPhoneInput}
                  id="shippingPhoneInput"
                  name="shippingPhoneInput"
                  onChange={this.handlePhoneValidation}
                  defaultValue={this.state.shippingPhoneInput}
                  required={true}
                  disabled={this.state.BillingSameAsShipping}
                  placeholder="Phone Number"
                />
                <span id="errorMsg" />
              </div>
            </fieldset>
          </form>
        </section>
        <section className="continue">
          <div className="addressCheckbox">
            <input
              type="checkbox"
              onClick={this.handleCheckboxSelection.bind(this)}
              id="checkboxIdDesktop"
            />
            <label htmlFor="checkboxIdDesktop">
              Billing address same as shipping address.
            </label>
          </div>
          <div>
            <button
              id="conBtn"
              className="continueButton"
              ref={this.conBtn}
              onClick={this.handleContinue}
            >
              Continue
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(AddressCheckout);

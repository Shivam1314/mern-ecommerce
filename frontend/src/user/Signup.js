import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.err) {
          setValues({ ...values, error: data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(err => console.log("Error in signup"));
  };

  const successMessage = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? "" : "none" }}
    >
      New account was created successfully. Please{" "}
      <Link to='/signin'>Login Here</Link>
    </div>
  );
  const errorMessage = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const signUpForm = () => (
    <div className='row'>
      <div className='col-md-6 offset-sm-3 text-left'>
        <form>
          <div className='form-group'>
            <label className='text-light'>Name</label>
            <input
              className='form-control'
              type='text'
              onChange={handleChange("name")}
              value={name}
            />
          </div>
          <div className='form-group'>
            <label className='text-light'>Email</label>
            <input
              className='form-control'
              type='email'
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <div className='form-group'>
            <label className='text-light'>Password</label>
            <input
              className='form-control'
              type='password'
              onChange={handleChange("password")}
              value={password}
            />
          </div>
          <button onClick={onSubmit} className='btn btn-success btn-block'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  return (
    <Base title='Sign up Page' description='A page for user to sign up'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;

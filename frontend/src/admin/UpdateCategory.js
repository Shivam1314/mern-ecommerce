import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div className='mt-5'>
        <Link className='btn btn-small btn-success mb-3' to='/admin/dashboard'>
          Admin Home
        </Link>
      </div>
    );
  };

  const preload = categoryId => {
    getCategory(categoryId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      data => {
        if (data.error) {
          setError(true);
          setName("");
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className='text-success'>Category updated successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className='text-warning'>Failed to update category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className='form-group'>
          <p className='lead'>Update the category</p>
          <input
            type='text'
            className='form-control my-3'
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
          <button onClick={onSubmit} className='btn btn-outline-info'>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title='Update a Category'
      description='Update the category for new tshirts'
      className='container bg-info p-4'
    >
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

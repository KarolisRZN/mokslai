import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        setIsSubmitted(true);
        navigate("/success");
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="alert alert-success">
          <h3>Form submitted successfully!</h3>
          <p>Your animal has been successfully registered.</p>
        </div>
      ) : (
        <form className="col-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Z]/,
                  message: "Name must start with an uppercase letter",
                },
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="form-control"
              {...register("type", {
                required: "Type is required",
                minLength: {
                  value: 2,
                  message: "Type must be at least 2 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Type can be at most 50 characters long",
                },
              })}
            />
            {errors.type && (
              <p className="text-danger">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="breed" className="form-label">
              Breed
            </label>
            <input
              type="text"
              id="breed"
              className="form-control"
              {...register("breed", {
                required: "Breed is required",
                minLength: {
                  value: 5,
                  message: "Breed must be at least 5 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Breed can be at most 100 characters long",
                },
                pattern: {
                  value: /^[A-Z]/,
                  message: "Breed must start with an uppercase letter",
                },
              })}
            />
            {errors.breed && (
              <p className="text-danger">{errors.breed.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 1,
                  message: "Age should be at least 1",
                },
                max: {
                  value: 100,
                  message: "Age can be at most 100",
                },
              })}
            />
            {errors.age && <p className="text-danger">{errors.age.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
            <input
              type="number"
              id="weight"
              step="0.01"
              className="form-control"
              {...register("weight", {
                min: {
                  value: 0.05,
                  message: "Minimum weight is 0.05",
                },
              })}
            />
            {errors.weight && (
              <p className="text-danger">{errors.weight.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              className="form-control"
              {...register("gender", {
                required: "Gender is required",
              })}
            />
            {errors.gender && (
              <p className="text-danger">{errors.gender.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

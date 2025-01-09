import { useForm } from "react-hook-form";

export default function Form({ onAnimalAdded }) {

  const { register, handleSubmit, reset } = useForm();


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
        onAnimalAdded(); 
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <form className="col-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          {...register("name", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          type="text"
          id="type"
          className="form-control"
          {...register("type", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="breed" className="form-label">
          Breed
        </label>
        <input
          type="text"
          id="breed"
          className="form-control"
          {...register("breed")}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          type="number"
          id="age"
          className="form-control"
          {...register("age", { required: true })}
        />
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
          {...register("weight", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          className="form-control"
          {...register("gender", { required: true })}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

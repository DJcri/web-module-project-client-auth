import axios from "axios";
import React, { useState } from "react";

const initialValues = {
  username: "",
  password: "",
  isLoading: "",
};

const Login = (props) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, isLoading: true });
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setFormValues({ ...formValues, isLoading: false });
      });
  };

  return (
    <div>
      {formValues.isLoading ? (
        <div>loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="enter username"
            value={formValues.username}
            required={true}
          />

          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="enter password"
            value={formValues.password}
            required={true}
          />
          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default Login;

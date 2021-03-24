import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const intitialFormValues = {
  id: "",
  name: "",
  age: "",
  email: "",
};

const FriendsList = () => {
  const [formValues, setFormValues] = useState(intitialFormValues);
  const [friends, setFriends] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    axiosWithAuth()
      .post("/api/friends", formValues)
      .then((res) => {
        console.log("post success");
      })
      .catch((err) => {
        console.log(`post error ${err}`);
      });
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log(res);
        setFriends([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        {friends.map((friend) => {
          return (
            <div key={friend.id}>
              <div>Name: {friend.name}</div>
              <div>Age: {friend.age}</div>
              <div>Email: {friend.email}</div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="name"
          value={formValues.name}
        />
        <input
          name="age"
          onChange={handleChange}
          type="text"
          placeholder="age"
          value={formValues.age}
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="email"
          value={formValues.email}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default FriendsList;

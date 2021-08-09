import axios from "axios";
const API_URL = "http://localhost:4000/login";
const login = (username, password) => {
    return axios
      .post(API_URL , {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };


  const logout = () => {
    localStorage.removeItem("user");
  };

  export {login,logout}
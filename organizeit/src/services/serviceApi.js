// import axios from 'axios';
export const baseURL = 'http://localhost:3001';

const LOGIN_URL = `${baseURL}/auth/login`;

export const loginApi = async (inputs) => {
    let data = { userNameOrEmail: inputs.email, password: inputs.password };
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "Application/json",
      },
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.error);
    }
    return resData;
};

import { UserDetails } from "../data/userDetails";
import fetch from "node-fetch";

export const getLoginToken = async (userDetails: UserDetails) => {
  const response = await fetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({
      username: userDetails.username,
      password: userDetails.password,
    }),
  });
  if (response.status !== 200) {
    throw new Error("An error occured trying to retrieve the login token.");
  }
  const body = await response.json();
  return body.token;
};

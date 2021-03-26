import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";

// @ts-ignore
import { IUser, IRootProps } from "@cd/models";

const appUsers = [
  {
    username: "admin",
    password: "test1234",
    fullName: "Test User",
  } as IUser,
];

const Root = (props: IRootProps) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (props.user.username && path !== "/logout") {
      navigate("/dashboard");
    } else if (path == "/logout") {
      props.publish("USER_DATA_EVENT", {});
    }
  }, [props.user]);

  const login = () => {
    setShowError(false);

    const user = appUsers
      .filter(
        (user) =>
          user.username.toLowerCase() == username && user.password == password
      )
      .pop();

    if (user) {
      props.publish("USER_DATA_EVENT", user);

      navigate("/dashboard");
    } else {
      setShowError(true);
    }
  };

  const errorMessage = showError ? (
    <div className="block flex justify-center">
      <span className="text-danger">
        Username and/or Password are incorrect
      </span>
    </div>
  ) : null;

  return (
    <section className="flex flex-row justify-center p-32">
      <div className="box-border h-96 w-96 p-4 border-4 border-white rounded-md bg-white text-black">
        <form action="" className="min-w-full space-y-6 ">
          <label className="block">
            <span className="text-gray-700">username</span>
            <input
              type="text"
              className="mt-1 block w-full"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">password</span>
            <input
              type="password"
              className="mt-1 block w-full"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block flex justify-center">
            <input
              type="button"
              onClick={login}
              className="bg-primary m-2 px-8 py-4 rounded-md text-white"
              value="login"
            />
          </label>

          {errorMessage}
        </form>
      </div>
    </section>
  );
};

export default React.memo(Root);

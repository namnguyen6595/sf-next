"use client";

import {useEffect} from "react";

const LogoutPage: React.FC = () => {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL+"api/user/logout").then( (response) => {
      if (response.ok) {
        window.location.href = "/";
      }
    });
  }, []);
  return <div></div>;
};

export default LogoutPage;

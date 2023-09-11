import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/loading-screen.component";

import authService from "../../services/auth.service";
import Navbar from "../../components/nav.component";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const superuser = authService.isSuperUser();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
    {isLoading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar isSuperUser={superuser} />
        <h1>Main Page</h1>
      </>
    )}
    </>
  );
}

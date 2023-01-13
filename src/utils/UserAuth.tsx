import UserContext from "./userContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import { useState } from "react";

const UserAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate();

  const [isAlert, setIsAlert] = useState<{
    isOpen: boolean;
    title: string;
    type: string;
  }>({
    isOpen: false,
    title: "",
    type: "",
  });

  const {
    data: user,
    refetch,
    isSuccess,
    isFetching,
  } = useQuery({
    // queryFn: () => auth(),
    queryKey: ["authorization"],
  });

  const user1 = {
    name: 'ha',
    username: 'ha',
    // email: string;
    online: false,
    // fullname: string;
    status: 'ssf',
    photo: 'fffs',
    // updatedAt: string;
    messages: [{
        text: 's',
        sender: 'hi',
        date_time: Date,
        read: true,
    }]
  }
  

  const userLogout = (): void => {
    localStorage.removeItem("token");
    refetch();
    navigate("/signup");
  };

  return (
    <UserContext.Provider
      value={{
        // user,
        refetch,
        userLogout,
        isSuccess,
        isFetching,
        setIsAlert,
        isAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserAuth;

// import { Types } from "mongoose";
import React, { createContext } from "react";

interface context {
  refetch: any;
  isSuccess: boolean;
  isFetching: boolean;
  userLogout: () => void;
  isAlert: { isOpen: boolean; title: string; type: string };
  setIsAlert: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; title: string; type: string }>
  >;
}

const userContext = createContext<context | null>(null);

export default userContext;

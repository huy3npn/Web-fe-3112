// import { Types } from "mongoose";
import React, { createContext } from "react";

interface context {
  // user: {
  //   // _id: string | Types.ObjectId;
  //   name: string;
  //   username: string;
  //   // email: string;
  //   online: boolean;
  //   // fullname: string;
  //   status: string
  //   photo: string;
  //   // updatedAt: string;
  //   messages: { text: string, sender: string, date_time: Date,read: boolean }[]
  // };
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

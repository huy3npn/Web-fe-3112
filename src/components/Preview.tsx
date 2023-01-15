import React, { useContext, useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Types } from "mongoose";
import { Avatar, Button, Modal, Spinner } from "flowbite-react";
import { Buffer } from "buffer";
import axios from "axios";
import { getAllUsers, setAvatar, deleteUser } from "../api";
import userContext from "../utils/userContext";
import { statusSocket } from "../ws/ws"
import { chatSocket } from "../ws/ws"

interface Props {
  inboxToggle: boolean;
  setInboxToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

}



const Preview: React.FC<Props> = ({
  inboxToggle,
  setInboxToggle,
  setUsername,

}) => {
  const { user, userLogout, isSuccess, refetch, isAlert, setIsAlert } =
    useContext<any>(userContext);

  const searchRef = useRef() as any;

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] =
    useState<boolean>(false);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);

  const [avatarImage, setAvatarImage] = useState<string[]>([]);

  const [avatarSelectIndex, setAvatarSelectIndex] = useState<number>(NaN);

  const [focus, setFocus] = useState<boolean>(false)

  const [userOnline, setUserOnline] = useState<string[]>([])

  const [searchName, setSearchName] = useState<string>("All")

  const [searchItems, setSearchItems] = useState<any>(undefined)

  const [date, setDate] = useState<string[]>([])

  const [chose, setChose] = useState<boolean>(true)

  const [avt, setAvt] = useState<any>(null)

  const dataid = localStorage.getItem("id")

  
  
  const checkStranger = (username: any, allUsers: any) => {
    const user = allUsers.find((el: any) => el.username === username)
    if (user) {
      if (user.messages.length === 0) {
        return true
      }
      else {
        return true
      }
    } else {
      return true
    }
  }

  useEffect(() => {
    axios.get('https://project-ltw-final.onrender.com/chat-app/images/')
      .then((res) => {
        setAvt(res.data)
      }) 
      .catch((err) => {
        
      })
  },[])

  
  const {
    data: allUsers,
    isLoading: isPreviewLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryFn: () => getAllUsers(),
  });

  // // console.log(allUsers);

  useEffect(() => {
    if (allUsers) {
      setSearchItems(allUsers)
    }
  }, [allUsers])


  const { isLoading: isAvatarLoading } = useQuery({
    queryFn: async () => {
      const imageData = [];
      for (let i = 0; i < 6; i++) {
        const { data } = await axios.get(
          `https://api.multiavatar.com/4645646/${Math.round(
            Math.random() * 1000
          )}?apikey=nQluaHjWZ83G95`
        );
        const buffer = new Buffer(data);
        imageData.push(buffer.toString("base64"));
      }
      setAvatarImage(imageData);
    },
    refetchOnWindowFocus: false,
  });
  

  const handleSetAvatar = useMutation(
    ({ id, imgUrl }: { id: string | Types.ObjectId; imgUrl: string }) =>
      setAvatar({ id, imgUrl }),
    {
      onSuccess: (res) => {
        refetchAllUsers();
        refetch();
        setIsAvatarModalOpen(false);
        setIsAlert({
          ...isAlert,
          isOpen: true,
          title: res.message,
          type: "success",
        });
      },
      onError: (err: any) =>
        setIsAlert({
          ...isAlert,
          isOpen: true,
          title: err.message,
          type: "failure",
        }),
    }
  );

  const handleDeleteUser = useMutation((id: string) => deleteUser(id), {
    onSuccess: (res) => {
      userLogout();
      setIsDeleteUserModalOpen(false);
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: res.message,
        type: "success",
      });
    },
    onError: (err: any) =>
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: err.response.data,
        type: "failure",
      }),
  });
  
  statusSocket.onmessage = function(evet) {
    const status = JSON.parse(evet.data)
    const userOnline = status.user.split(",")
    setUserOnline(userOnline)
    
  }
 
  const handleDate = (date: string) => {
    return new Date(date).toLocaleTimeString()
  }
 
  const username = JSON.parse(localStorage.getItem('user')||'').username

  const searchFunction = (seachName: string) => {
    if (allUsers) {
      if (searchName === "All" || searchName.length === 1) {
        setSearchItems(allUsers)
      } else {
        const search = allUsers.filter((user:any) => {
          return user.username.toLowerCase().includes(searchName.toLowerCase())
        })
        setSearchItems(search)
      }

    }
  }

  const findAvt = (id: any) => {
    if (avt && dataid) {
      const result = avt.find((x:any) => x.id == id)
      if (!result) {
        console.log('No avt found')
        return 'https://project-ltw-final.onrender.com/media/girl.svg'
      } else {
        return result.images1
      }
    }
    else {
    }
  }

  return (
    
    <div
      className={`${
        inboxToggle ? "hidden" : "flex"
      } h-full md:col-span-2 col-span-full md:flex flex-col gap-2 drop-shadow-lg z-10`}
    >
      <div className="w-full basis-20 flex justify-between items-center rounded-tl-lg px-4 shadow-lg">
        <div className="flex items-center justify-end w-full z-10">
          
        </div>
      </div>

      {user && (
        <>
          <Modal
            show={isAvatarModalOpen}
            onClose={() => setIsAvatarModalOpen(false)}
          >
            <Modal.Header>Pick an Avatar</Modal.Header>
            <Modal.Body>
              <div className="w-full h-full flex justify-between items-center">
                {isAvatarLoading ? (
                  <Button color="gray">
                    <Spinner aria-label="Alternate spinner button example" />
                    <span className="pl-3">Loading...</span>
                  </Button>
                ) : (
                  avatarImage.map((element, index) => (
                    <img
                      src={`data:image/svg+xml;base64,${element}`}
                      alt="avatar"
                      key={index}
                      className={`w-12 h-12 md:w-16 md:h-16 p-[0.2rem] rounded-full cursor-pointer ${
                        index === avatarSelectIndex &&
                        "border-[0.25rem] border-[#4e0eff]"
                      }`}
                      onClick={(): void => setAvatarSelectIndex(index)}
                    />
                  ))
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  handleSetAvatar.mutate({
                    id: user._id,
                    imgUrl: avatarImage[avatarSelectIndex],
                  })
                }
              >
                {handleSetAvatar.isLoading && (
                  <div className="mr-3">
                    <Spinner size="sm" light={true} />
                  </div>
                )}
                Set Avatar
              </Button>
              <Button color="gray" onClick={() => setIsAvatarModalOpen(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={isDeleteUserModalOpen}
            onClose={() => setIsDeleteUserModalOpen(false)}
          >
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Body>
              <div className="text-black">
                Once performed the action is irreversible.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  handleDeleteUser.mutate(user._id);
                }}
                color="failure"
              >
                Delete Account
              </Button>
              <Button
                color="gray"
                onClick={() => setIsDeleteUserModalOpen(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      <div className="px-4">
        <input
          type="search"
          placeholder="Search"
          ref={searchRef}
          className="w-full rounded-xl focus:outline-none focus:border-0 border-0"
          onChange={(e) => {
            searchFunction(searchName)
            // handleSearchName(searchName)
            setSearchName(e.target.value)
          }}
        />
      </div>

      <div
        className={`basis-[80%] flex flex-col overflow-scroll overflow-x-hidden px-3 ${
          isPreviewLoading && "items-center justify-center"
        }`}
      >
        {isPreviewLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <>
            {searchItems &&
              searchItems.map((element: any, index: number) => (
                checkStranger(element.username, allUsers) && (

                  <div

                    className={focus ? (`w-full flex justify-between items-start px-3 my-1 py-3 cursor-pointer rounded-lg hover:bg-gray-50 bg-gray-50`) : (`w-full flex justify-between items-start px-3 my-1 py-3 cursor-pointer rounded-lg hover:bg-gray-50`)}
                    key={index}
                    onClick={(e): void => {
                      setInboxToggle(true);
                      setUsername(element.username);
                      // setFocus(!focus)
                      localStorage.setItem('id', element.id)
                    }}

                  >
                    <Avatar
                      img={
                        findAvt(element.id) 
                      }
                      rounded={true}
                      status={userOnline.includes(element.username) ? "online" : "busy"}
                      statusPosition="bottom-right"
                      bordered={chose}
                      color="gray"
                    >
                      <div className="space-y-1 font-medium w-40">
                        <div className="truncate">{element.fullname}</div>
                        <div className="text-sm text-dark-600 truncate ">
                          {element.username}
                        </div>
                        <div className={`text-sm text-gray-500 truncate ${element.username}-mess`}>
                          {element.messages.length >=1 ? element.messages[element.messages.length - 1].text : 'No messages'}
                        </div>
                      </div>
                    </Avatar>
                    <div className="text-gray-500 text-xs py-1">
                      {/* {moment(element.createdAt).format("ll").slice(0, -6)} */}
                      {userOnline.includes(element.username) ? "online" : "offline"}
                      <br />
                      <div className="mt-3">
                        {element.messages.length >=1 ? ((element.messages[element.messages.length - 1].sender === username) ? ('me') : (element.username)) : ('')}
                      </div>
                    </div>
                    <br />
                    
                  </div>
                )
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;


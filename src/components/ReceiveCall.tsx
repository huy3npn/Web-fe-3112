import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdCallEnd } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Peer } from "peerjs";
import axios from "../axios";



const AnswerCall: React.FC = () => {
  const [currentUser, setcurrentUser] = useState<any>(undefined);
  const [MyPeer, setMyPeer] = useState<any>(undefined);
  const [isTakeCall, setisTakeCall] = useState<boolean>(false);
  const [isEndCall, setisEndCall] = useState<boolean>(false);
  const negative = useNavigate();
  const myVideo = document.getElementsByClassName("myVideo")[0];
  const currentVideoCall =
    document.getElementsByClassName("currentVideoCall")[0];
  const takeCall = document.getElementsByClassName("takeCall")[0];
 
  const [status, setStatus] = useState<string>('Calling...') 
  let { answerusername } = useParams();
  

  function addVideoStream(video: any, stream: any) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }
  const handleEndCall = () => {
    endCall();
    setisTakeCall(false)
    
    setStatus('End call')
    setTimeout(() => {
      window.close();
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) { 
      negative("/signup");
    } else {
      setcurrentUser(JSON.parse(localStorage.getItem("user")||""));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setMyPeer(
        new Peer(JSON.parse(localStorage.getItem('user')||'').username, {
            host: "0.peerjs.com",
            port: 443,
            secure: true,
        })
      );
    }
  }, [currentUser]);

  const socket = new WebSocket(`wss://project-ltw-final.onrender.com/ws/message/${answerusername}/`)
  socket.onmessage = (event) => {
    let message = JSON.parse(event.data);
    switch (message.status) {
      case 'end_call':
        
        handleEndCall()
        break
    }
  }
  

  if (MyPeer) {
    MyPeer.on("open", (id: any) => {
      MyPeer.on("call", (call: any) => {
        takeCall.addEventListener("click", () => {
          setisTakeCall(true);
          navigator.mediaDevices 
            .getUserMedia({
              video: true,
              audio: true,
            })
            .then((stream) => {
              addVideoStream(myVideo, stream);
              call.answer(stream)
              call.on('stream', function(remoteStream: any) {
                addVideoStream(currentVideoCall, remoteStream);
              });
            });
        });
      });
    });
  }

  const endCall = () => {
    let data = {
      receiver: JSON.parse(localStorage.getItem("user")||"").username,
      sender: answerusername,
      peer_id: answerusername
    }

    const token = localStorage.getItem('token')

    const config = {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        
      }
    };

    axios.post('https://project-ltw-final.onrender.com/chat-app/end-call/', data, config).then(response => {

    }).catch(error => {
      
    })
  }

  return (
    <Container>
      <div className="videocall-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src="https://avatars.dicebear.com/api/micah/:242.svg"
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3> {answerusername} </h3>
          </div>
        </div>
      </div>
      <div className="videocall-content">
        <video className="myVideo"></video>
        <video className="currentVideoCall" ></video>
        {!isTakeCall && <h3>{status}</h3>}
      </div>
      <div className="videocall-action">
        {isTakeCall ? (
          <>
            {isEndCall ? (
              <h3>End call</h3>
            ) : (
              <>
                <div className="endCall" onClick={handleEndCall}>
                  <MdCallEnd />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="endCall anwser">
              <MdCallEnd />
            </div>
            <div
              className="takeCall anwser"
              onClick={() => setisTakeCall(true)}
            >
              <IoMdCall />
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: #0a0a0a;
  display: grid;
  grid-template-rows: 8% 81% 11%;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  .videocall-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .myVideo {
      width: 20vw;
      height: 20vh;
      border: 1px solid white;
      display: block;
      position: fixed;
      top: 3px;
      right: 3px;
    }
    .currentVideoCall {
      width: 100%;
      height: 100%;
    }
    h3 {
      color: white;
      position: absolute;
    }
  }

  .videocall-header {
    background-color: #080420;
    display: flex;
    align-items: center;
    padding: 5px 1rem;
    .user-details {
      display: flex;
      align-items: center;
      height: 70%;
      gap: 1rem;
      .avatar {
        img {
          border: 2px solid #4e0eff;
          border-radius: 50px;
          padding: 3px;
          height: 2.5rem;
          background-color: #f3f3f35c;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .videocall-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    h3 {
      color: white;
      position: absolute;
      top: 50%;
      right: calc(50% - 35px);
      font-size: 35px;
    }
    .endCall {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ce0c0c;
      transition: 0.2s ease-in;
      &:hover {
        transition: 0.2s ease-in;
        opacity: 0.8;
      }
      svg {
        font-size: 30px;
        color: white;
      }
    }
    .anwser {
      margin: 0 30px;
      margin-bottom: 20px;
    }
    .takeCall {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: green;
      transition: 0.2s ease-in;
      &:hover {
        transition: 0.2s ease-in;
        opacity: 0.8;
      }
      svg {
        font-size: 30px;
        color: white;
      }
    }
  }
  .offCam {
    background-color: #9186f3;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in;
    svg {
      font-size: 20px;
      color: white;
    }
    &:hover {
      transition: 0.2s ease-in;
      opacity: 0.8;
    }
  }
  .offMic {
    background-color: #9186f3;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in;
    svg {
      font-size: 20px;
      color: white;
    }
    &:hover {
      transition: 0.2s ease-in;
      opacity: 0.8;
    }
  }
`;
export default AnswerCall;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdCallEnd } from "react-icons/md";
// import { BsFillCameraVideoOffFill } from "react-icons/bs";
// import { IoMdMicOff } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Peer } from "peerjs";
import axios from "../axios";
import { chatSocket } from "../ws/ws";


const VideoCall: React.FC = () => {
  const [currentUser, setcurrentUser] = useState<any>(undefined);
  const [isEndCall, setisEndCall] = useState<boolean>(false);
  const [MyPeer, setMyPeer] = useState<any>(undefined);
  const [peerId, setPeerId] = useState<any>(undefined);
  const negative = useNavigate();
  let { callusername } = useParams();
  const myVideo = document.getElementsByClassName("myVideo")[0];
  const currentVideoCall =
    document.getElementsByClassName("currentVideoCall")[0];


  function addVideoStream(video: any, stream: any) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }

  const handleEndCall = () => {
    endCall();
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
      // // console.log(JSON.parse(localStorage.getItem('user')||'').username, 1)
      setMyPeer(
        new Peer(JSON.parse(localStorage.getItem('user')||'').username, {
            host: "0.peerjs.com",
            port: 443,
            secure: true,
        })
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (MyPeer) {
      MyPeer.on("open", (id: any) => {
        setPeerId(id)
        navigator.mediaDevices 
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream: any) => {
            const call = MyPeer.call(callusername, stream);
            addVideoStream(myVideo, stream);
            if (call) {
              call.on("stream", (remoteStream: any) => {
                addVideoStream(currentVideoCall, remoteStream);
              });
            }
          });
      });
      
    }
  }, [MyPeer]);

  useEffect(() => {
    if (peerId) {
      let data = {
        receiver: callusername,
        sender: JSON.parse(localStorage.getItem("user")||"").username,
        peer_id: peerId
      }

      const token = localStorage.getItem('token')

      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          
        }
      }

      axios.post('  https://project-ltw-final.onrender.com/chat-app/start-call/', data, config).then(response => {
        
      }).catch(error => {
       
      })

      

      

    }
  }, [peerId])

  const socket = new WebSocket(`wss://project-ltw-final.onrender.com/ws/message/${peerId}/`)
  socket.onmessage = (event) => {
    let message = JSON.parse(event.data);
    switch (message.status) {
      case 'end_call':
        handleEndCall()
        break
    }
  }

  const endCall = () => {
    let data = {
      receiver: callusername,
      sender: JSON.parse(localStorage.getItem("user")||"").username,
      peer_id: peerId
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
            <h3> {callusername} </h3>
          </div>
        </div>
      </div>
      <div className="videocall-content">
        <video className="myVideo"></video>
        {isEndCall && <h3>End call</h3>}
        <video className="currentVideoCall"></video>
      </div>
      {!isEndCall && (
        <div className="videocall-action">
          <div className="endCall" onClick={handleEndCall}>
            <MdCallEnd />
          </div>
        </div>
      )}
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
    h3 {
      color: white;
      position: absolute;
      top: 50%;
      right: calc(50% - 35px);
      font-size: 35px;
    }
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
        min-width: 85px;
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
  }
`;
export default VideoCall;

import React, { useEffect, useState } from "react";
import Avtar from "../../assets/avtar.png";
import Input from "../../components/Input";

const Dashborad = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, sentMessage] = useState("");
  const [users, setUsers] = useState([]);
  // console.log("user:>>", user);
  // console.log("conversations: >>", conversations);
  // console.log("messages:>>", messages);
  // console.log("users:>>", users);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));

    const fetchConversations = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/conversations/${loggedInUser?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const resdata = await res.json();
        setConversations(resdata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversations();
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resdata = await res.json();
        setUsers(resdata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );

  const fetchMessages = async (conversationId, user) => {
    // console.log(conversationId.conversationId);
    try {
      const res = await fetch(
        `http://localhost:8000/api/message/${conversationId.conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      console.log("resdata:>>", resData);
      console.log("user", user);
      setMessages({
        messages: resData,
        receiver: conversationId.user,
        conversationId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (e) => {
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
    // console.log('Sending message:', {
    //   conversationId: messages?.conversationId.conversationId,
    //   senderId: user?.id,
    //   message,
    //   receiverId: messages?.receiver?.receiverId,
    // });
    // const resData=await res.json();
    // console.log("resData:>>", resData);
    setMessages("");
  };

  return (
    <div className="w-screen flex">
      <div className="w-[25%] bg-secondary">
        <div className="flex justify-center items-center my-8">
          <div className="border border-primary p-[1px] rounded-full">
            <img src={Avtar} width={75} height={75} alt="avtar-img" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl">{user?.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-10 mt-4">
          <div className="text-primary text-lg">Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map((conversationId, user) => {
                return (
                  <div className="flex items-center py-4 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div className="border border-gray-300 rounded-full">
                        <img
                          src={Avtar}
                          width={50}
                          height={50}
                          alt="profile-img"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold cursor-pointer">
                          {conversationId.user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {conversationId.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-10">
                No Conversation
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-secondary h-[70px] my-10 rounded-full flex items-center px-10 shadow-md py-2">
            <div className="cursor-pointer">
              <img src={Avtar} width={45} height={45} alt="profile-img" />
            </div>
            <div className="ml-6 mr-auto ">
              <h3 className="text-lg">{messages?.receiver?.fullName}</h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-brand-zoom"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mr-4"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17.011 9.385v5.128l3.989 3.487v-12z" />
                <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-phone-outgoing"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 9l5 -5" />
                <path d="M16 4l4 0l0 4" />
              </svg>
            </div>
          </div>
        )}
        <div className="h-[100%] w-full overflow-auto shadow">
          <div className="p-14 ">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <div
                    className={`max-w-[40%] rounded-b-xl mb-6 ${
                      id === user?.id
                        ? "bg-primary text-center text-white rounded-tl-xl ml-auto"
                        : "bg-secondary text-center rounded-b-xl"
                    }`}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-10">
                No Messages
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <div className="p-8 w-full flex justify-center">
            <Input
              placeholder="Type a message.."
              value={message}
              onChange={(e) => sentMessage(e.target.value)}
              className="w-[75%]"
              inputClassName="p-2 border-0 shadow-md rounded-full bg-secondary focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-secondary rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div
              c
              className={`ml-4 p-2 cursor-pointer bg-secondary rounded-full ${
                !message && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-circle-plus"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l6 0" />
                <path d="M12 9l0 6" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="w-[25%] h-screen bg-light px-6 py-10">
        <div className="text-primary text-lg">People</div>
        <div>
          {users.length > 0 ? (
            users.map((userId, user) => {
              return (
                <div className="flex items-center py-4 border-b border-b-gray-300">
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => fetchMessages('new', user)}
                  >
                    <div className="border border-gray-300 rounded-full">
                      <img
                        src={Avtar}
                        width={50}
                        height={50}
                        alt="profile-img"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold cursor-pointer">
                        {userId.user?.fullName}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {userId.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-semibold mt-10">
              No Conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashborad;

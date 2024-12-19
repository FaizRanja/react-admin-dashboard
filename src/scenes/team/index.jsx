import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const index = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({
    user1: [],
    user2: [],
    user3: [],
  });

  const users = [
    { id: "user1", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: "user2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: "user3", name: "Michael Lee", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      setChats({
        ...chats,
        [selectedUser.id]: [...chats[selectedUser.id], { text: message, sender: "me" }],
      });
      setMessage("");
    }
  };

  return (
    <Box display="flex" height="80vh">
      {/* Left Side - User List */}
      <Box width="30%" p={2} boxShadow="2px 0px 5px rgba(0, 0, 0, 0.1)">
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Users
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => setSelectedUser(user)}
              selected={selectedUser?.id === user.id}
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Side - Chat Area */}
      {selectedUser ? (
        <Box flex={1} display="flex" flexDirection="column">
          {/* Chat Header */}
          <Box
            p={2}
            boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
            display="flex"
            alignItems="center"
          >
            <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
            <Typography variant="h6" ml={2}>
              {selectedUser.name}
            </Typography>
          </Box>

          {/* Chat Messages */}
          <Box flex={1} p={2} bgcolor="#e9f5fe" overflow="auto">
            {chats[selectedUser.id].length > 0 ? (
              chats[selectedUser.id].map((chat, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={chat.sender === "me" ? "flex-end" : "flex-start"}
                  mb={2}
                >
                  <Box
                    bgcolor={chat.sender === "me" ? "#1976d2" : "white"}
                    color={chat.sender === "me" ? "white" : "black"}
                    px={2}
                    py={1}
                    borderRadius="10px"
                    maxWidth="70%"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                  >
                    {chat.text}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography color="gray" textAlign="center">
                No messages yet.
              </Typography>
            )}
          </Box>

          {/* Chat Input */}
          <Box
            display="flex"
            alignItems="center"
            p={2}
            bgcolor="white"
            boxShadow="0px -2px 5px rgba(0, 0, 0, 0.1)"
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              color="secondary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6" color="gray">
            Select a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default index;

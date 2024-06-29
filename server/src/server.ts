import initApp from "./app";
import http from 'http';
import { Server } from 'socket.io';
import CodeBlock from './models/codeBlock';


initApp().then((app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type"], // Allowed headers
      credentials: true // Allow credentials
    }
  });
  // Keep track of users in each code block room
  const codeBlockRooms: { [key: string]: string[] } = {};
  console.log(codeBlockRooms)
  //{ block1: ['user123', 'user456'] }
  
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining a code block room
    socket.on('joinCodeBlock', (codeBlockId) => {
      if (!codeBlockRooms[codeBlockId]) {
        codeBlockRooms[codeBlockId] = [];
      }
      // Assign role based on the order of entry
      let role: 'mentor' | 'student' = 'student';
      if (codeBlockRooms[codeBlockId].length === 0) {
        role = 'mentor';
      }

      codeBlockRooms[codeBlockId].push(socket.id);
      socket.join(codeBlockId);

      // Inform the client of their role
      socket.emit('roleAssignment', { role });

      console.log(`User ${socket.id} joined code block room: ${codeBlockId} as ${role}`);
    });

    // Handle code change events
    socket.on('codeChange', async({ codeBlockId, newCode }) => {
      console.log(codeBlockId)
      //Updating Code in the db in the codeChange Event 
      try{
        await CodeBlock.findByIdAndUpdate(codeBlockId, { code: newCode });
        
        // Broadcast code change to other users in the room
        socket.to(codeBlockId).emit('codeUpdate', newCode);
        console.log(`Broadcasting code change for code block: ${codeBlockId}`);
      }catch(err){
        console.error(`Error updating code block ${codeBlockId}:`, err);
        socket.emit('error', 'Failed to update code block');
      }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Remove the user from code block rooms
      for (const [room, users] of Object.entries(codeBlockRooms)) {
        //finds the index of the disconnected user's socket.id in the list of users for the current room
        const index = users.indexOf(socket.id);
        if (index !== -1) {
          users.splice(index, 1);//removes the user from the array
          console.log(`User ${socket.id} removed from room: ${room}`);
          // If no users are left in the room, remove the room
          if (users.length === 0) {
            delete codeBlockRooms[room];
          }
        }
      }
    });
  });

  server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});

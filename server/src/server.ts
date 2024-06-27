import initApp from "./app";
import http from 'http';
import path from 'path';


initApp().then((app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Live-Code-Sessions",
        version: "1.0.0",
        description: "Live-Code-Sessions REST server ",
      },
      servers: [{ url: `http://localhost:${process.env.PORT}` }],
    },
    apis: [
      path.join(__dirname, './routes/*.ts'),
    ],
  };
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});

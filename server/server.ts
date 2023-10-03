import createApp from "./app";

const port = process.env.PORT || 3000;
const app = createApp();

const server = app.listen(port, () => {
  console.log(`server is working correctly in port ${port}`);
});

export default server;
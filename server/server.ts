import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is working correctly on port ${port}`);
});




// import createApp from "./app";

// const port = process.env.PORT || 3000;
// const app = createApp();

// const server = app.listen(port, () => {
//   console.log(`server is working correctly in port ${port}`);
// });

// export default server;
// class Player  {
//   public id!: number;
//   public name!: string;
//   public password!: string;
//   public wins!: number;
//   public losses!: number;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }


// const getAllPlayers = async () => {
//   "use server";
//   const getPlayers = await fetch("http://localhost:3001/api/getPlayers");
//   const pillaPl = await getPlayers.json();
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pillaPl.map((player) => (
//             <tr key={player.id}>
//               <td>{player.id}</td>
//               <td>{player.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };
  
  // export default getAllPlayers;

  const Page = async () => {
    "use server";
    const todoss = await fetch("http://localhost:3001/api/getPlayers");
    console.log(todoss)
    const todos = await todoss.json();
    console.log(todos)
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Page;  
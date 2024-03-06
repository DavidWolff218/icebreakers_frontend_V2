import React from 'react';
// @ts-ignore
import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import './App.css';

function App() {

  // interface respUser {
  //   id: number,
  //   username: string
  // }

  // const handleClick = async () => {
  //   console.log("clicked")
  //   await fetch(
  //     `http://localhost:3000/users/by_room/1620`
  //   )
  // }

  const handleReceived = (): void => {
    console.log("i been recieved")
  }

  return (
    <div className="App">
      <ActionCableConsumer channel={{
          channel: "UsersChannel",
          room: 1620
        }}
        onReceived={handleReceived}>
          {/* /users/by_room/:room_id */}
        <button>CLICK ME</button>

      </ActionCableConsumer> 
    </div>
  );
}

export default App;

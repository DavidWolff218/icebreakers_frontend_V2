import { useParams } from "react-router-dom";

const Room = () => {

  const {roomId} = useParams()

  console.log(roomId)
  
  return (
    <>
      <div>THIS IS ROOM</div>
    </>
  );
};

export default Room;

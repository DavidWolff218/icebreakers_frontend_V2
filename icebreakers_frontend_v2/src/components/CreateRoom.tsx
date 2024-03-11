import { useEffect, useState } from "react";
import { API_ROOT } from "../constants";

const CreateRoom = () => {

  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    const fetchRoomCode = async () => {
      try{
        const resp = await fetch(`${API_ROOT}/rooms/room_code`)
        if(resp.ok){
          const data = await resp.json()
          setRoomName(data)
        } else {
          console.log('Failed to fetch room name')
        }
      } catch(error){
        console.error('Error fetching room name:', error)
      }
    }
    fetchRoomCode()
  }, [])

  const renderForm = (): JSX.Element => {
    return(
      <form>
        
      </form>
    )
  }

  return (
    <div>
      Here we can give you the room code and you can create your host name
    </div>
  );
};

export default CreateRoom;

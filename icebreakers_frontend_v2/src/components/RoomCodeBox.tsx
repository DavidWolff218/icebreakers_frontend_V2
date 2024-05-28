
type RoomCodeBoxProps = {
  roomName: string
} 

const RoomCodeBox = ({roomName}: RoomCodeBoxProps) => {

  return (
    <>
      <div className='w-[155px] h-[60px] absolute bottom-0 left-0 mb-4 ml-4 bg-white rounded-2xl flex flex-col justify-center'>
        <h3 className='font-semibold text-xl'>Room Code</h3>
        <h3 className='text-xl font-normal'>{roomName}</h3>
      </div>
    </>
  );
}
 
export default RoomCodeBox;
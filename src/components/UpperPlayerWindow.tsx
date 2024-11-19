type UpperPlayerWindowProps = {
  currentPlayer: string,
  nextPlayer: string
}
//changed outer div to px-4 from px-6, look further into if this is right

const UpperPlayerWindow = ({currentPlayer, nextPlayer}: UpperPlayerWindowProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-evenly w-[280px] h-[65px] bg-white rounded-2xl px-4">
        <h2 className="font-semibold text-xl">{currentPlayer}</h2>
        <h3>Up Next: {nextPlayer}</h3>
      </div>
    </>
  );
};

export default UpperPlayerWindow;

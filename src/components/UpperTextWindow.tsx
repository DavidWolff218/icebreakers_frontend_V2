type UpperTextWindowProps = {
  title: string,
  description: string
}
//changed outer div to px-4 from px-6, look further into if this is right

const UpperTextWindow = ({title, description}: UpperTextWindowProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-evenly w-[280px] h-[86px] bg-white rounded-2xl px-4">
        <h2 className="font-semibold text-xl">{title}</h2>
        <h3>{description}</h3>
      </div>
    </>
  );
};

export default UpperTextWindow;

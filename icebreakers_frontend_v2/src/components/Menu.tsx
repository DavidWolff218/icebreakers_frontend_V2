const Menu = () => {

  const logOutHandler = (): JSX.Element => {
    return <h2>Logout</h2>
  }

  return (
  <div>
    <h1>Menu</h1>
    <h2>How To Play</h2>
    <h2>Invite Link</h2>
    {logOutHandler()}
  </div>
  );
};

export default Menu;

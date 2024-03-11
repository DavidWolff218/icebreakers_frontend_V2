const NavBar = () => {
  const logOutBtn = (): JSX.Element => {
    if (true) {
      return <button>ENDGAME</button>;
    } else {
      return <button>LOGOUT</button>;
    }
  };

  return <>
  {logOutBtn()}
  </>;
};

export default NavBar;

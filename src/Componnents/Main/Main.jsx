function Main({ children }) {
  return (
    <main className="app relative max-w-[100rem] my-16 mx-auto grid grid-cols-[4fr_3fr] grid-rows-[auto_repeat(3,_18rem)_auto] gap-8 transition-all duration-1000 pb-4">
      {children}
    </main>
  );
}

export default Main;

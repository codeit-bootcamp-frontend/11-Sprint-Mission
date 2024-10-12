import Header from './Components/Header';

function App({ children }) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  );
}

export default App;

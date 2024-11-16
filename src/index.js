import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

const RootComponent = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

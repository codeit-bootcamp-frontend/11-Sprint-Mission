import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/loading.css';

const RootComponent = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

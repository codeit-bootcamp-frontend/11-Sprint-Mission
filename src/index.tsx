import ReactDOM from 'react-dom/client';
import App from '@/component/App.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('root element not found');
}

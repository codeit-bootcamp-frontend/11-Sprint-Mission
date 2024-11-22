import BestBoard from '../components/BestBoard';
import EntierBoard from '../components/EntireBoard';

export default function Boards() {
  return (
    <div className='boards-page'>
      <BestBoard />
      <EntierBoard />
    </div>
  );
}

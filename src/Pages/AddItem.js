// switch gnb class
// document.body.classList
// find

import { useEffect } from 'react';
import { switchGnbClass } from '../utils/switchGnbClass';

export default function AddItem() {
  useEffect(() => {
    switchGnbClass('market');
  }, []);
  return <h1>AddItem</h1>;
}

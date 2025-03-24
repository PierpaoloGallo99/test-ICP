import { useState } from 'react';
import { pierpaolo_backend } from '../../declarations/pierpaolo_backend';

function App() {
  const [somma, setSomma] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const value = event.target.elements.num.value;
    await pierpaolo_backend.aggiungi_numero(BigInt(value))
    await pierpaolo_backend.ottieni_somma_totale().then((sum) =>{
      setSomma(Number(sum))
    })
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="numero">Enter a number: &nbsp;</label>
        <input id="num" alt="num" type="number" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="sum">Somma : {somma}</section>
    </main>
  );
}

export default App;

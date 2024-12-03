import '@/styles/css/style.css'
import BestItemDetail from '@/components/BestItems'
import ItemDetail from '@/components/ItemDetail'

function Items() {
  return (
    <main>
      <section className='section'>
        <BestItemDetail />
      </section>
      <section className='section'>
        <ItemDetail />
      </section>
    </main>
  )
}

export default Items

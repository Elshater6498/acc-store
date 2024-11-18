import { Link } from 'react-router-dom'
import { BASE_URL } from '../constatns'

const OfferCard = ({ offer }) => {
  return (
    <Link className='px-5 py-2 cursor-pointer' to={`/offers/${offer?.id}`}>
      <img
        src={BASE_URL + offer?.image}
        alt={offer.name}
        className='h-40 w-full object-cover rounded-lg'
      />
    </Link>
  )
}

export default OfferCard

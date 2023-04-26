import { IOffer } from './types/offers';
import './Offer.css';

interface Props {
  offer: IOffer;
}

export function Offer({ offer }: Props) {
  return (
    <li key={offer.id} className='offer-item'>
      <img
        className='offer-image'
        src={offer.splashImages ? offer.splashImages[0]?.narrowMedium : ''}
        alt={offer.headlines.description}
      />
      <h2 className='offer-title'>{offer.headlines.description}</h2>
      <p className='offer-price'>Price: {offer.prices.totalPrice.amount.display}</p>
    </li>
  );
}

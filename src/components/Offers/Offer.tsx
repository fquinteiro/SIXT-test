import { IOffer } from "./Types/offers";

interface Props {
  offer: IOffer;
}

export function Offer({ offer }: Props) {
  return (
    <li key={offer.id}>
      <h2>{offer.headlines.description}</h2>
      <img src={offer.splashImages ? offer.splashImages[0]?.narrowMedium : ''} alt={offer.headlines.description} />
      <p>Price: {offer.prices.totalPrice.amount.display}</p>
    </li>
  );
}

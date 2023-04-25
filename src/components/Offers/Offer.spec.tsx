import { render } from '@testing-library/react';
import { Offer } from './Offer';
import { IOffer } from './Types/offers';

describe('Offers', () => {
  const offer: IOffer = {
    id: '123',
    headlines: {
      description: 'Test offer',
    },
    splashImages: [
      {
        narrowMedium: 'https://example.com/image.png',
      },
    ],
    prices: {
      totalPrice: {
        amount: {
          display: '100.00',
        },
      },
    },
  };

  test('renders offer description', () => {
    const { getByText } = render(<Offer offer={offer} />);
    const descriptionElement = getByText(offer.headlines.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders offer image', () => {
    const { getByAltText } = render(<Offer offer={offer} />);
    const imageElement = getByAltText(offer.headlines.description);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', offer.splashImages[0].narrowMedium);
  });

  test('renders offer price', () => {
    const { getByText } = render(<Offer offer={offer} />);
    const priceElement = getByText(`Price: ${offer.prices.totalPrice.amount.display}`);
    expect(priceElement).toBeInTheDocument();
  });
});
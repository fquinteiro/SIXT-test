import { render } from '@testing-library/react';
import { Offer } from './Offer';
import { IOffer } from './types/offers';

describe('Offers', () => {
  const offerMock: IOffer = {
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
    const { getByText } = render(<Offer offer={offerMock} />);
    const descriptionElement = getByText(offerMock.headlines.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders offer image', () => {
    const { getByAltText } = render(<Offer offer={offerMock} />);
    const imageElement = getByAltText(offerMock.headlines.description);
    expect(imageElement).toBeInTheDocument();
    if (offerMock.splashImages) expect(imageElement).toHaveAttribute('src', offerMock.splashImages[0].narrowMedium);
  });

  test('renders offer price', () => {
    const { getByText } = render(<Offer offer={offerMock} />);
    const priceElement = getByText(`Price: ${offerMock.prices.totalPrice.amount.display}`);
    expect(priceElement).toBeInTheDocument();
  });
});
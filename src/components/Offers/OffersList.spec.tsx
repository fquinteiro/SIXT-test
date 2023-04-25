import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { OffersList } from './OffersList';

jest.mock('axios');

const mockOffers = [
  {
    id: '1',
    headlines: { description: 'Offer 1' },
    splashImages: [{ narrowMedium: 'image1' }],
    prices: { totalPrice: { amount: { display: '$100' } } },
  },
  {
    id: '2',
    headlines: { description: 'Offer 2' },
    splashImages: [{ narrowMedium: 'image2' }],
    prices: { totalPrice: { amount: { display: '$200' } } },
  },
];
describe('OffersList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading when fetching offers', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { offers: mockOffers } });
    render(<OffersList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
  });

  test('should render error message when failed to fetch offers', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ message: 'Error fetching data' });
    render(<OffersList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText('Error: Error fetching data')).toBeInTheDocument()
    );
  });

  test('should render list of offers', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { offers: mockOffers } });
    render(<OffersList />);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2));
    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByAltText('Offer 1')).toHaveAttribute('src', 'image1');
    expect(screen.getByText('Price: $100')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.getByAltText('Offer 2')).toHaveAttribute('src', 'image2');
    expect(screen.getByText('Price: $200')).toBeInTheDocument();
  });
});
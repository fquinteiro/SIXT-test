import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { IOffer, IOfferResponse } from './Types/offers';
import { Offer } from './Offer';

const PAGE_SIZE = 10;

export function OffersList() {
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getOffers() {
      try {
        const {
          data: { offers },
        } = await axios.get<IOfferResponse>(
          'https://cdn.sixt.io/codingtask/offers.json'
        );
        setOffers(offers);
      } catch (error) {
        if (typeof error === "string") {
          setError(error)
        } else if (error instanceof Error) {
          setError(error.message)
        }
      }
    }
    getOffers();
  }, []);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedOffers = offers.slice(startIndex, endIndex);

  const renderOffer = () => {
    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!offers.length) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {paginatedOffers.map((offer) => (
          <Offer offer={offer} />
        ))}
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          totalItems={offers.length}
          onPageChange={setPage}
        />
      </ul>
    );
  };

  return (
    <div>
      <h1>Offers</h1>
      {renderOffer()}
    </div>
  );
}

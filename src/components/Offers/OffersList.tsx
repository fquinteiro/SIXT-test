import { useEffect, useState } from 'react';
import axios from 'axios';
import { IOffer, IOfferResponse } from './types/offers';
import { Pagination } from '../Pagination/Pagination';
import { Offer } from './Offer';
import './OfferList.css';

const PAGE_SIZE = 9;

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
        setError(error.message)
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
      <>
        <ul className='offer-list'>
          {paginatedOffers.map((offer) => (
            <Offer offer={offer} />
          ))}
        </ul>
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          totalItems={offers.length}
          onPageChange={setPage}
        />
      </>
    );
  };

  return (
    <>
      <h1 className='offer-title'>Offers</h1>
      {renderOffer()}
    </>
  );
}

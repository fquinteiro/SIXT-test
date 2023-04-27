import { useState } from 'react';
import { IOffer } from './types/offers';
import { Pagination } from '../Pagination/Pagination';
import { Offer } from './Offer';
import './OfferList.css';
import { useFetch } from '../../hooks/useFetch';

const PAGE_SIZE = 9;

export function OffersList() {
  const [page, setPage] = useState<number>(1);

  const {
    data: offers,
    error,
    isFetching,
  } = useFetch<IOffer[]>('https://cdn.sixt.io/codingtask/offers.json');

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedOffers = offers?.slice(startIndex, endIndex);

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      {isFetching && <p>Loading...</p>}
      {offers && (
        <>
          <h1 className="offers-title">Offers</h1>
          <ul className="offers-list">
            {paginatedOffers?.map((offer) => (
              <Offer offer={offer} />
            ))}
          </ul>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            totalItems={offers?.length}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}

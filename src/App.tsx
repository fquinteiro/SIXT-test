import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination/Pagination";

interface Offer {
  id: string;
  headlines: {
    description: string;
  };
  splashImages?: {
    narrowMedium: string;
  }[];
  prices: {
    totalPrice: {
      amount: {
        display: string;
      };
    };
  };
}

interface OfferResponse {
  offers: Offer[];
}

const PAGE_SIZE = 10;

function App() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get<OfferResponse>("https://cdn.sixt.io/codingtask/offers.json")
      .then((response) => setOffers(response.data.offers))
      .catch((error) => setError(error.message));
  }, []);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedOffers = offers.slice(startIndex, endIndex);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!offers.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {paginatedOffers.map((offer) => (
          <li key={offer.id}>
            <h2>{offer.headlines.description}</h2>
            <img src={offer.splashImages ? offer.splashImages[0]?.narrowMedium : ''} alt={offer.headlines.description} />
            <p>Price: {offer.prices.totalPrice.amount.display}</p>
          </li>
        ))}
      </ul>
      <Pagination
        current={page}
        pageSize={PAGE_SIZE}
        totalItems={offers.length}
        onPageChange={setPage}
      ></Pagination>
    </div>
  );
}

export default App;

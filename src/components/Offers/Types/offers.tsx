interface IOffer {
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

interface IOfferResponse {
  offers: IOffer[];
}

export type { IOffer, IOfferResponse }
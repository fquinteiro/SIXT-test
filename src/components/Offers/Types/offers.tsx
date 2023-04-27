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

export type { IOffer };

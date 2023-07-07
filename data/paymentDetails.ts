export type paymentDetails = {
  cardOwner: string;
  cardNumber: string;
  experationDate: string;
  CVCNum: string;
};

export const mockPaymentDetails: paymentDetails = {
  cardOwner: "Andrzej Bajan",
  cardNumber: "1234123412341234",
  experationDate: "12/27",
  CVCNum: "123",
};

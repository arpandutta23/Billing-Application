const currentBill = (data) => {
  return { type: "CURRENT_BILL", payload: data };
};

export const startCurrentBill = (data) => {
  return currentBill(data);
};

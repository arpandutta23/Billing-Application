const lineItems = (data) => {
  return { type: "LINE_ITEMS", payload: data };
};
const deleteLineItems = (data) => {
  return { type: "DELETE_LINEITEMS", payload: data };
};
const emptyLineItems = (data) => {
  return { type: "EMPTY_LINEITEMS", payload: data };
};

export const startLineItems = (data) => {
  localStorage.setItem("data", data);
  return lineItems(data);
};

export const startDeleteLineItems = (data) => {
  return deleteLineItems(data);
};
export const startEmptyLineItems = () => {
  return emptyLineItems();
};

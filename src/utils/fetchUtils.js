
export const handleErrors = (resp) => {
  if (!resp.ok) {
     throw Error(resp.statusText);
  }
  return resp;
};

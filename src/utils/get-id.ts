export const getId = (url: string) => {
  const arr = url.split('/');
  return arr[arr.length - 2];
};
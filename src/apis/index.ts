export const fetchData = async <T>(
  fetcher: any,
  body?: any,
  sideEffect?: (data: T) => void
) => {
  try {
    const data: T = await fetcher(body).unwrap();
    if (sideEffect) {
      sideEffect(data);
    }
  } catch (err) {
    networkAlert();
  }
};

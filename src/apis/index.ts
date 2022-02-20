import Toast from 'react-native-root-toast';

const errorText: { [key: number]: string } = {
  404: `Couldn't reach server.`,
};

export const networkAlert = (code?: number) => {
  Toast.show(errorText[<number>code] ?? 'Unknown API error.', {
    duration: Toast.durations.LONG,
  });
};

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

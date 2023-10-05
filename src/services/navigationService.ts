export let navigationRef: any;

export function setNavigationRef(_navigationRef: any) {
  navigationRef = _navigationRef;
}

export function navigationIsReady() {
  return navigationRef?.isReady(); // returns true when called in a redux saga file.
}

export const navigate = (name: string, params?: any) => {
  if (navigationIsReady() && !!navigationRef.current) {
    return navigationRef.current.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationIsReady() && !!navigationRef.current) {
    return navigationRef.current.goBack();
  }
};

export const reset = (name: string, params = null) => {
  if (navigationIsReady() && !!navigationRef.current) {
    return navigationRef.current.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    });
  }
};

import { useRef, useEffect } from 'react';

export const getStepFromPath = (path: string) => {
  return parseInt(path.split('/').slice(-1).pop() || '0');
};

export const emailValidation = (email: string) => {
  const reg: RegExp = /\S+@\S+\.\S+/;
  return reg.test(email);
};

export const pinCodeValidation = (pin: string | null) => {
  const reg: RegExp = /^[0-9]{6}$/;
  return reg.test(pin || '');
};

export const usePrevious = (value: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

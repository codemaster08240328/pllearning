export interface IProps {
  error?: boolean;
  onChange?: (file: File | undefined) => {};
  accept?: string;
  className?: string;
  size?: number;
}

export interface Event<T = EventTarget> {
  target: T;
}

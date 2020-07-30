export interface IProps {
  error?: boolean;
  onChange?: (file: File | undefined) => void;
  accept?: string;
  className?: string;
  size?: number;
}

export interface Event<T = EventTarget> {
  target: T;
}

export interface IProps {
  value?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
  error?: boolean;
  type?: 'email' | 'tel' | 'number';
  className?: string;
}

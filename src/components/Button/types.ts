export interface IProps {
  type?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
  text: string;
  className?: string;
  loading?: boolean;
}

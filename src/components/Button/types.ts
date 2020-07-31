export interface IProps {
  type?: 'primary' | 'secondary' | 'ghost' | 'transparent';
  disabled?: boolean;
  onClick?: () => void;
  text: string;
  className?: string;
  loading?: boolean;
}

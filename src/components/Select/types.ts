export type TOption = {
  value: string;
  label: string;
};

export interface IProps {
  options: Array<TOption>;
  placeholder?: string;
  value?: string;
  label?: string;
  noMatch?: TOption;
  onSelect?: (value: string) => void;
}

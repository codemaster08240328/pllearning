export type TOption = {
  value: string;
  label: string;
};

export interface IProps {
  options: Array<TOption>;
  placeholder?: string;
  selectItem?: TOption;
  label?: string;
  onSelect?: (item: TOption) => void;
  onChange?: (value: string) => void;
}

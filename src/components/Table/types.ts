export type TFieldItem = {
  key: string;
  label: string;
  component?: () => React.ReactNode;
  error?: () => boolean;
};

export type TItem = {
  [key: string]: string;
};

export interface IProps {
  fields: Array<TFieldItem>;
  items?: TItem;
}

export interface IProps {
  size: number;
}

export type IPropsSocialIcon = {
  type: 'twitter' | 'wordpress' | 'facebook' | 'linkedin';
};

export interface IIcons {
  [state: string]: React.FC;
}

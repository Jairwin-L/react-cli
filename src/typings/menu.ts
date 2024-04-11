export interface MenuItem {
  key: string;
  title: string;
  icon: string;
  auth?: number[];
  subs?: Array<{
    title: string;
    key: string;
    icon: string;
  }>;
}

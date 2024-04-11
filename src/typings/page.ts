export interface Columns {
  title: string;
  dataIndex?: string;
  key?: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: any;
}

export interface RouterParams {
  id: string;
  userId: string;
}

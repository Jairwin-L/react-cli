import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1656278_wpdl6yus09s.js',
});

interface Props {
  type: string;
  className?: string;
}

export default function Icon(props: Props) {
  return (
    <>
      {props.className ? (
        <IconFont type={props.type} className={props.className} />
      ) : (
        <IconFont type={props.type} />
      )}
    </>
  );
}

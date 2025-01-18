import './href.less';

interface HrefProps {
  hrefLink: string;
  hrefText: string;
}

export default function Href(props: HrefProps) {
  const { hrefLink, hrefText } = props;
  return (
    <a className="href" href={hrefLink} target="_blank" rel="noopener noreferrer">
      {hrefText}
    </a>
  );
}

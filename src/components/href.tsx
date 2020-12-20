import React from 'react'
import '@css/components/href.less';

type HrefProps = {
  hrefLink: string,
  hrefText: string,
}

export default (props: HrefProps) => {
  const { hrefLink, hrefText } = props;
  return <a className="href" href={hrefLink} target="_blank" rel="noopener noreferrer">{hrefText}</a>
}

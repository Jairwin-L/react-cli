import React from 'react';
import Href from '../components/href';
import '@css/components/footer.less';

export default (): JSX.Element => (
  <footer>
    <Href hrefLink="https://jairwin.cn" hrefText="https://jairwin.cn" />
    <span className="space_between">&copy;{new Date().getFullYear()}</span>
    <span>By Jairwin</span>
  </footer>
);

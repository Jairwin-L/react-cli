import '@css/components/footer.less';
import Href from '../components/href';

export default function Footer() {
  return (
    <footer>
      <Href hrefLink="https://jairwin.cn" hrefText="https://jairwin.cn" />
      <span className="space_between">&copy;{new Date().getFullYear()}</span>
      <span>By Jairwin</span>
    </footer>
  );
}

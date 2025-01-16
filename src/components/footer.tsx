import Href from '../components/href';
import '../assets/css/components/footer.less';

export default function Footer() {
  return (
    <footer>
      <Href hrefLink="https://jairwin.cn" hrefText="https://jairwin.cn" />
      <span className="space_between">&copy;{new Date().getFullYear()}</span>
      <span>By Jairwin</span>
    </footer>
  );
}

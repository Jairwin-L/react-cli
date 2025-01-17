import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Loadable from 'react-loadable';

const useLoadingComponent = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <div />;
};

export default (loader: any, loading = useLoadingComponent) => {
  return Loadable({
    loader,
    loading,
  });
};

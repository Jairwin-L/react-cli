interface Size {
  width: number;
  height: number;
}

// 自定义hook：useWinSize
export default function useWinSize(): Size {
  const [size, setSize] = useState<Size>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);
  return size;
}

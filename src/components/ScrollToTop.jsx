import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa yolu (pathname) her değiştiğinde pencereyi en üste kilitler
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
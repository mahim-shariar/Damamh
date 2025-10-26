import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GTMPageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_url: window.location.href,
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location]);

  return null;
};

export default GTMPageViewTracker;

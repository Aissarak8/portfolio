import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view to highlight the active nav link.
 * @param {string[]} ids section element ids to observe
 * @param {number} offset rootMargin top offset
 */
export function useScrollSpy(ids, offset = 0.4) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px` }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

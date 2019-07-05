import React, { useEffect } from 'react';
import './social-media.css';

export function SocialMediaWall({ id, style }) {
  id = id || "social-container";
  useEffect(() => {
    window._flockler = [{
      container: id,
      count: 20,
      refreshType: 'auto',
      refresh: 60000,
      site: 8069,
      style: 'wall_v1'
    }];
    const f = document.createElement('script');
    f.async = 1;
    f.src = 'https://embed-cdn.flockler.com/embed-v2.js';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(f, s);
  })

  return (
    <div id={id} style={style}></div>
  )
}

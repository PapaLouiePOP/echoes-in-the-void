import { useEffect, useState } from 'react';
import { nasaImageUrl, nasaPageUrl } from '../data/artifacts';
import { Holo } from './art/lineArt';

/*
  The card's picture. Reads the artifact's `image` prop:
    { src, nasaId, alt, credit }
  - src set            → shows that URL
  - only nasaId set    → builds the images.nasa.gov asset URL
  - neither, or error  → shows the hologram placeholder
*/
export default function ArtifactImage({ image = {}, art, name }) {
  const src = image.src || nasaImageUrl(image.nasaId);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);

  if (src && !failed) {
    const page = nasaPageUrl(image.nasaId);
    return (
      <figure className="nasa-figure">
        <img src={src} alt={image.alt || name} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        <figcaption className="img-credit">
          {page ? <a href={page} target="_blank" rel="noreferrer">{image.credit || 'NASA'}</a> : image.credit || 'NASA'}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="nasa-placeholder">
      <Holo art={art} />
      <span className="img-note">📷 NASA image slot</span>
    </div>
  );
}

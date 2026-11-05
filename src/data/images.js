// Every raster asset the site uses, in one place.
//
// To serve these from Cloudinary, upload them keeping the same paths
// (img/everest.jpg, img/wide-k2.webp, app/zh/path.webp,
// badges/first_steps.webp, ...) and set CDN to the delivery base only:
//   https://res.cloudinary.com/<cloud>/image/upload
// Each asset type then adds its own transformation, so a 256 px badge is not
// upscaled to the width used by a full-bleed photograph. With CDN empty the
// local files in public/ are used and the project runs offline.

const CDN = '';

const delivery = (path, transform) => (CDN ? CDN + '/' + transform + path : path);

const PHOTO = 'f_auto,q_auto,w_1600,c_limit';
const WIDE = 'f_auto,q_auto,w_2200,c_limit';
const BADGE_T = 'f_auto,q_auto,w_512,c_limit';
const APP_T = 'f_auto,q_auto,w_720,c_limit';

export const IMG = {
  everest: delivery('/img/everest.jpg', PHOTO),
  everestCenter: delivery('/img/everest-center.jpg', PHOTO),
  k2: delivery('/img/k2.jpg', PHOTO),
  manaslu: delivery('/img/manaslu-camp.jpg', PHOTO),
  nanga: delivery('/img/nanga-camp.jpg', PHOTO),
  broadPeak: delivery('/img/broad-peak.jpg', PHOTO),
  aconcagua: delivery('/img/aconcagua.jpg', PHOTO),
  ropeTeam: delivery('/img/rope-team.jpg', PHOTO),
  iceClimber: delivery('/img/ice-climber.jpg', PHOTO),
};

export const WIDE_IMG = {
  k2: delivery('/img/wide-k2.webp', WIDE),
  ice: delivery('/img/wide-ice.webp', WIDE),
  camp: delivery('/img/wide-camp.webp', WIDE),
};

export const BADGE = (file) => delivery('/badges/' + file + '.webp', BADGE_T);

export const APP_SHOT = (lang, name) =>
  delivery('/app/' + (lang === 'zh' ? 'zh' : 'en') + '/' + name + '.webp', APP_T);

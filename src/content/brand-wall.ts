/* Customer logo wall. Every brand marked `source: "datadrew.io"` is already shown
 * publicly on the live datadrew.io homepage; `source: "app"` brands appear on the
 * app.datadrew.io login screen. Both are the company's own published assets.
 *
 * Brands from the Datadrew connector (`connector` below) are live client stores
 * that are NOT public anywhere yet — they need the merchant's OK before `show`
 * flips to true, and a logo file dropped into /public/customers/logos. */

export type WallBrand = {
  slug: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  source: "datadrew.io" | "app";
  show: boolean;
};

export const logoWall = {
  lead: "Trusted by 1,000+",
  trail: "stores around the world",
};

export const wallBrands: WallBrand[] = [
  {
    slug: "monos",
    name: "Monos",
    logo: "/customers/logos/monos.png",
    width: 483,
    height: 161,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "aqualogica",
    name: "Aqualogica",
    logo: "/customers/logos/aqualogica.png",
    width: 512,
    height: 93,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "hello-bello",
    name: "Hello Bello",
    logo: "/customers/logos/hello-bello.png",
    width: 911,
    height: 522,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "zouk",
    name: "Zouk",
    logo: "/customers/logos/zouk.png",
    width: 236,
    height: 78,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "clinikally",
    name: "Clinikally",
    logo: "/customers/logos/clinikally.png",
    width: 1024,
    height: 571,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "cava-athleisure",
    name: "CAVA Athleisure",
    logo: "/customers/logos/cava-athleisure.png",
    width: 200,
    height: 90,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "kradle",
    name: "Kradle",
    logo: "/customers/logos/kradle.webp",
    width: 976,
    height: 208,
    source: "app",
    show: true,
  },
  {
    slug: "nude-lucy",
    name: "Nude Lucy",
    logo: "/customers/logos/nude-lucy.png",
    width: 1344,
    height: 444,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "beyond-the-vines",
    name: "Beyond The Vines",
    logo: "/customers/logos/beyond-the-vines.png",
    width: 3531,
    height: 450,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "juicy-chemistry",
    name: "Juicy Chemistry",
    logo: "/customers/logos/juicy-chemistry.png",
    width: 512,
    height: 171,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "fashor",
    name: "Fashor",
    logo: "/customers/logos/fashor.png",
    width: 882,
    height: 147,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "froens",
    name: "Froens",
    logo: "/customers/logos/froens.png",
    width: 320,
    height: 91,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "ninepine",
    name: "Ninepine",
    logo: "/customers/logos/ninepine.png",
    width: 1553,
    height: 528,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "shredlights",
    name: "ShredLights",
    logo: "/customers/logos/shredlights.png",
    width: 400,
    height: 80,
    source: "app",
    show: true,
  },
  {
    slug: "farmers-pick",
    name: "Farmers Pick",
    logo: "/customers/logos/farmers-pick.png",
    width: 1530,
    height: 252,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "passage-du-desir",
    name: "Passage du Désir",
    logo: "/customers/logos/passage-du-desir.png",
    width: 1235,
    height: 197,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "the-scent-reserve",
    name: "The Scent Reserve",
    logo: "/customers/logos/the-scent-reserve.png",
    width: 512,
    height: 172,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "preethiwear",
    name: "Preethiwear",
    logo: "/customers/logos/preethiwear.png",
    width: 1240,
    height: 258,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "yourmedicals",
    name: "YourMedicals",
    logo: "/customers/logos/yourmedicals.png",
    width: 512,
    height: 106,
    source: "datadrew.io",
    show: true,
  },
  {
    slug: "disguise",
    name: "Disguise Cosmetics",
    logo: "/customers/logos/disguise.png",
    width: 400,
    height: 136,
    source: "app",
    show: true,
  },
  {
    slug: "silvertraq",
    name: "Silvertraq",
    logo: "/customers/logos/silvertraq.png",
    width: 282,
    height: 40,
    source: "app",
    show: true,
  },
];

/* Seen in the Datadrew connector (Growth Internal workspace, 4 Sep 2026). Not rendered. */
export const connectorBrandsPendingPermission = [
  {
    slug: "henri-lloyd",
    name: "Henri-Lloyd",
    domain: "henrilloyd.com",
  },
  {
    slug: "jaded-london",
    name: "Jaded London",
    domain: "jadedldn.com",
  },
  {
    slug: "here-we-flo",
    name: "Here We Flo",
    domain: "hereweflo.co",
  },
  {
    slug: "yuicy",
    name: "yuicy",
    domain: "yuicy.de",
  },
];

/*
  Catalog data — framework and CMS agnostic on purpose.

  Commerce is undecided. This shape lets a Shopify/CMS adapter populate it later
  without changing any component. No cart, no SKU mapping, no size run: the brand
  confirms availability over Instagram.

  Two pieces (the co-ords) have NO confirmed price — `prices: []` renders as
  "Price on request". Do not invent one.

  Descriptions describe only what is visible in the photography. Fabric
  composition and care are NOT known.
*/

export type Price = {
  /** "Shirt", "With skinny shalwar", "With trouser" */
  label: string;
  amountPkr: number;
};

export type Product = {
  slug: string;
  /** Uppercase, as the brand writes it: "BLUSH BAGGY" */
  name: string;
  print: string;
  cut: string;
  /** Visible detail only. */
  description: string;
  /** Empty = price on request. */
  prices: Price[];
  image: { src: string; alt: string };
  collection: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "blush-baggy",
    name: "BLUSH BAGGY",
    print: "Blush floral on ivory",
    cut: "Relaxed, dropped shoulder",
    description:
      "A loose shirt in a soft blush floral, with a straight hem and a full-length sleeve. Cut generously through the body so it sits away from the frame rather than on it. Shown with white trousers; available with the skinny shalwar.",
    prices: [
      { label: "Shirt", amountPkr: 5500 },
      { label: "With skinny shalwar", amountPkr: 7500 },
    ],
    image: {
      src: "/images/products/blush-baggy.jpg",
      alt: "Model in the blush baggy shirt and white trousers, standing against a clipped hedge.",
    },
    collection: "Fall 2026",
  },
  {
    slug: "lavender-vanilla",
    name: "LAVENDER VANILLA",
    print: "Lavender sprigs on ivory",
    cut: "Straight, V-neck",
    description:
      "A V-neck shirt scattered with lavender sprigs, cut straight through the body with a full sleeve. The print is light enough to read as ivory from a distance. Shown with white trousers; available with the skinny shalwar.",
    prices: [
      { label: "Shirt", amountPkr: 5500 },
      { label: "With skinny shalwar", amountPkr: 7500 },
    ],
    image: {
      src: "/images/products/lavender-vanilla.jpg",
      alt: "Model in the lavender vanilla shirt and white trousers on a brick path at dusk.",
    },
    collection: "Fall 2026",
  },
  {
    slug: "sunflower-ivory",
    name: "SUNFLOWER IVORY",
    print: "Small sunflowers on ivory",
    cut: "Notched neck, gold buttons",
    description:
      "A notched V-neck with a row of gold buttons down the placket, printed with small sunflowers on ivory. The sleeve falls full to the wrist. Shown with white trousers; available with the skinny shalwar.",
    prices: [
      { label: "Shirt", amountPkr: 7000 },
      { label: "With skinny shalwar", amountPkr: 9500 },
    ],
    image: {
      src: "/images/products/sunflower-ivory.jpg",
      alt: "Model in the sunflower ivory shirt, seated on a sand-coloured banquette.",
    },
    collection: "Fall 2026",
  },
  {
    slug: "burgundy-co-ord",
    name: "BURGUNDY CO-ORD",
    print: "Solid burgundy",
    cut: "Straight tunic, wide-leg trouser",
    description:
      "A deep burgundy co-ord. The tunic is cut straight with a narrow split neckline and a full sleeve; the trouser sits high and falls wide to the floor. Sold as a set.",
    prices: [],
    image: {
      src: "/images/products/burgundy-co-ord.jpg",
      alt: "Model in a deep burgundy tunic and wide-leg trouser beside a timber louvre screen.",
    },
    collection: "Fall 2026",
  },
  {
    slug: "ivory-co-ord",
    name: "IVORY CO-ORD",
    print: "Solid ivory",
    cut: "Straight tunic, wide-leg trouser",
    description:
      "An ivory co-ord in a straight tunic and a wide trouser. The placket is covered, with small buttons down the front, and the sleeve falls to the wrist. Sold as a set.",
    prices: [],
    image: {
      src: "/images/products/ivory-co-ord.jpg",
      alt: "Model in an ivory tunic and wide-leg trouser in front of a carved timber door.",
    },
    collection: "Fall 2026",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

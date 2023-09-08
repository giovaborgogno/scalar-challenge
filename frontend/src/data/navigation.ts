import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: ncNanoId(), href: "/", name: "Home  1" },
      { id: ncNanoId(), href: "/", name: "Home  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Header  1" },
      { id: ncNanoId(), href: "/", name: "Header  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Coming Soon" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/", name: "Category Page 1" },
      { id: ncNanoId(), href:"/", name: "Category Page 2" },
      { id: ncNanoId(), href: "/", name: "Product Page 1" },
      { id: ncNanoId(), href: "/", name: "Product Page 2" },
      { id: ncNanoId(), href: "/", name: "Cart Page" },
      { id: ncNanoId(), href: "/", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/", name: "Checkout Page" },
      { id: ncNanoId(), href: "/", name: "Search Page" },
      { id: ncNanoId(), href: "/", name: "Cart Page" },
      { id: ncNanoId(), href: "/", name: "Accout Page" },
      { id: ncNanoId(), href: "/", name: "Order Page" },
      { id: ncNanoId(), href: "/", name: "Subscription" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Blog Page",
    children: [
      { id: ncNanoId(), href: "/", name: "Blog Page" },
      { id: ncNanoId(), href: "/", name: "About Page" },
      { id: ncNanoId(), href: "/", name: "Contact Page" },
      { id: ncNanoId(), href: "/", name: "Login" },
      { id: ncNanoId(), href: "/", name: "Signup" },
      { id: ncNanoId(), href: "/", name: "Forgot Password" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home Demo 1",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Home Demo 2",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Category Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/",
        name: "Category page 1",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Category page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Product Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/",
        name: "Product detail 1",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Product detail 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Cart Page",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Checkout Page",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Search Page",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Account Page",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/",
        name: "About",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Contact us",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Login",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Signup",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Subscription",
      },
      { id: ncNanoId(), href: "/auth/password/reset", name: "Forgot Password" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Blog Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        href: "/",
        name: "Blog Single",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Men",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Women",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Beauty",
  },

  {
    id: ncNanoId(),
    href: "/",
    name: "Sport",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Blog",
    // type: "megaMenu",
    // children: MEGAMENU_TEMPLATES,
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Explore",
    // type: "dropdown",
    // children: OTHER_PAGE_CHILD,
  },
];

import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa6";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  { label: "Facebook", href: "https://facebook.com/", icon: <FaFacebook /> },
  { label: "Instagram", href: "https://instagram.com/", icon: <FaInstagram /> },
  { label: "Threads", href: "https://threads.com/", icon: <FaThreads /> },
  { label: "TikTok", href: "https://tiktok.com/", icon: <FaTiktok /> },
  { label: "Twitter", href: "https://twitter.com/", icon: <FaTwitter /> },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };

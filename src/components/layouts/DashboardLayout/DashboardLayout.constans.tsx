import {
  CiGrid41,
  CiWallet,
  CiSettings,
  CiViewList,
  CiShoppingTag,
  CiBookmark,
} from "react-icons/ci";

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member",
    icon: <CiGrid41 />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: <CiWallet />,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/member/setting",
    icon: <CiSettings />,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: <CiGrid41 />,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <CiViewList />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <CiShoppingTag />,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <CiBookmark />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: <CiWallet />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };

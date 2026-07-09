"use client";

import { setIsSidebarCollapsed } from "@/app/state";

import {
  Archive,
  CircleDollarSign,
  Clipboard,
  HelpCircle,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import plowLogo from "../../../public/plow_logo.svg";
import smallLogo from "../../../public/small.svg";

/* ─────────────────────────────
   NAVIGATION LINKS
───────────────────────────── */

const PRIMARY_LINKS = [
  {
    href: "/dashboard",
    icon: Layout,
    label: "Dashboard",
  },

  {
    href: "/inventory",
    icon: Archive,
    label: "Inventory",
  },

  {
    href: "/products",
    icon: Clipboard,
    label: "Products",
  },
];

const SECONDARY_LINKS = [
  {
    href: "/users",
    icon: User,
    label: "Users",
  },

  {
    href: "/expenses",
    icon: CircleDollarSign,
    label: "Expenses",
  },
];

const FOOTER_LINKS = [
  {
    href: "/help",
    icon: HelpCircle,
    label: "Help and support",
  },

  {
    href: "/settings",
    icon: SlidersHorizontal,
    label: "Settings",
  },
];

/* ─────────────────────────────
   SIDEBAR LINK TYPES
───────────────────────────── */

interface SidebarLinkProps {
  href: string;

  icon: LucideIcon;

  label: string;

  isCollapsed: boolean;
}

/* ─────────────────────────────
   SIDEBAR LINK
───────────────────────────── */

const SidebarLink = ({
  href,

  icon: Icon,

  label,

  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    (pathname === "/" &&
      href === "/dashboard");

  return (
    <Link
      href={href}
      prefetch={false}
    >
      <div
        className={`
          mx-3
          my-0.5

          flex
          cursor-pointer
          items-center

          gap-3

          rounded-xl

          transition-all
          duration-200

          ${
            isCollapsed
              ? `
                justify-center

                px-2
                py-2.5
              `
              : `
                justify-start

                px-4
                py-2.5
              `
          }

          ${
            isActive
              ? `
                bg-gray-100

                font-semibold

                text-gray-950

                dark:bg-gray-800
                dark:text-gray-50
              `
              : `
                text-gray-700

                hover:bg-gray-50
                hover:text-gray-950

                dark:text-gray-400

                dark:hover:bg-gray-800
                dark:hover:text-gray-50
              `
          }
        `}
      >
        {/* LINK ICON */}

        <Icon
          className={`
            h-5
            w-5

            shrink-0

            ${
              isActive
                ? `
                  text-gray-950

                  dark:text-gray-50
                `
                : `
                  text-gray-500

                  dark:text-gray-500
                `
            }
          `}
        />

        {/* LINK NAME */}

        {!isCollapsed && (
          <span
            className="
              truncate

              text-[14px]
              font-medium
              tracking-tight
            "
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

/* ─────────────────────────────
   SIDEBAR
───────────────────────────── */

const Sidebar = () => {
  const dispatch = useDispatch();

  const isSidebarCollapsed =
    useSelector(
      (state: any) =>
        state.global
          .isSidebarCollapsed
    );

  return (
    <aside
      className={`
        fixed

        left-0
        top-0

        z-40

        hidden
        md:flex

        h-screen

        flex-col

        border-r
        border-gray-100

        bg-white

        shadow-sm

        transition-all
        duration-300

        dark:border-gray-800
        dark:bg-gray-900

        ${
          isSidebarCollapsed
            ? "w-16"
            : "w-64"
        }
      `}
    >
      {/* ─────────────────────────
          SIDEBAR HEADER
      ───────────────────────── */}

      <div
        className="
          flex
          h-16

          items-center
          justify-between

          gap-2

          border-b
          border-gray-50

          px-4

          dark:border-gray-800
        "
      >
        {/* LOGO */}

        <div
          className="
            flex
            flex-1

            items-center

            overflow-hidden
          "
        >
          {isSidebarCollapsed ? (
            /* SMALL LOGO */

            <button
              type="button"
              title="Expand sidebar"
              aria-label="Expand sidebar"
              onClick={() =>
                dispatch(
                  setIsSidebarCollapsed(
                    false
                  )
                )
              }
              className="
                relative

                h-8
                w-8

                shrink-0

                transition-transform

                active:scale-95
              "
            >
              <Image
                src={smallLogo}
                fill
                priority

                alt="Plow"

                className="
                  object-contain
                "
              />
            </button>
          ) : (
            /* FULL LOGO */

            <div
              className="
                relative

                h-10
                w-32

                shrink-0
              "
            >
              <Image
                src={plowLogo}
                fill
                priority

                alt="Plow logo"

                className="
                  object-contain
                  object-left
                "
              />
            </div>
          )}
        </div>

        {/* COLLAPSE BUTTON */}

        {!isSidebarCollapsed && (
          <button
            type="button"

            title="Collapse sidebar"

            aria-label="Collapse sidebar"

            onClick={() =>
              dispatch(
                setIsSidebarCollapsed(
                  true
                )
              )
            }

            className="
              shrink-0

              rounded-lg

              p-1.5

              text-gray-400

              transition-colors

              hover:bg-gray-50
              hover:text-gray-600

              dark:text-gray-500

              dark:hover:bg-gray-800
              dark:hover:text-gray-300
            "
          >
            <Menu
              className="
                h-4
                w-4
              "
            />
          </button>
        )}
      </div>

      {/* ─────────────────────────
          MAIN NAVIGATION
      ───────────────────────── */}

      <nav
        className="
          custom-scrollbar

          grow

          overflow-x-hidden
          overflow-y-auto

          py-3
        "
      >
        {/* PRIMARY LINKS */}

        {PRIMARY_LINKS.map(
          (link) => (
            <SidebarLink
              key={link.href}

              {...link}

              isCollapsed={
                isSidebarCollapsed
              }
            />
          )
        )}

        {/* DIVIDER */}

        <div
          className="
            mx-3
            my-3

            border-t
            border-gray-100

            dark:border-gray-800
          "
        />

        {/* SECONDARY LINKS */}

        {SECONDARY_LINKS.map(
          (link) => (
            <SidebarLink
              key={link.href}

              {...link}

              isCollapsed={
                isSidebarCollapsed
              }
            />
          )
        )}
      </nav>

      {/* ─────────────────────────
          FOOTER
      ───────────────────────── */}

      <div
        className="
          mt-auto

          border-t
          border-gray-100

          bg-gray-50/40

          pb-3
          pt-2

          dark:border-gray-800
          dark:bg-gray-900/40
        "
      >
        {/* FOOTER LINKS */}

        {FOOTER_LINKS.map(
          (link) => (
            <SidebarLink
              key={link.href}

              {...link}

              isCollapsed={
                isSidebarCollapsed
              }
            />
          )
        )}

        {/* PROFILE */}

        <Link
          href="/profile"
          prefetch={false}
        >
          <div
            className={`
              mx-3
              mt-1

              flex
              cursor-pointer
              items-center

              gap-3

              rounded-xl

              p-2

              transition-colors

              hover:bg-gray-100

              dark:hover:bg-gray-800

              ${
                isSidebarCollapsed
                  ? `
                    justify-center
                  `
                  : `
                    justify-start

                    px-4
                  `
              }
            `}
          >
            {/* PROFILE IMAGE */}

            <div
              className="
                relative

                h-5
                w-5

                shrink-0
              "
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"

                fill

                sizes="20px"

                alt="User avatar"

                className="
                  rounded-full

                  object-cover

                  ring-1
                  ring-gray-200
                "
              />
            </div>

            {/* PROFILE TEXT */}

            {!isSidebarCollapsed && (
              <span
                className="
                  truncate

                  text-[14px]
                  font-medium

                  text-gray-800

                  dark:text-gray-300
                "
              >
                My Profile
              </span>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
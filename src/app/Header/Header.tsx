// components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { MdLocalPhone } from "react-icons/md";
import { BsEnvelopePlusFill } from "react-icons/bs";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProductMenuOpen(false);
    setActiveSubMenu(null);
  };

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
    setActiveSubMenu(null);
  };

  const toggleSubMenu = (index: number) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProductMenuOpen(false);
    setActiveSubMenu(null);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Products",
      href: "#",
      submenu: [
        {
          name: "House Wire",
          href: "/products/cables",
          submenu: [
            { name: "FR Wires", href: "/products/cables/copper" },
            { name: "FRLSH Wire", href: "/products/cables/fiber" },
            { name: "ZHFR Wire", href: "/products/cables/fiber" },
         
          ],
        },
        {
          name: "Multicore Flexible Cable",
          href: "/products/cables",
          // submenu: [
          //   { name: "Copper Cables", href: "/products/cables/copper" },
          //   { name: "Fiber Optic Cables", href: "/products/cables/fiber" },
          // ],
        },
        {
          name: "Submersible cable",
          href: "/products/cables",
          // submenu: [
          //   { name: "Copper Cables", href: "/products/cables/copper" },
          //   { name: "Fiber Optic Cables", href: "/products/cables/fiber" },
          // ],
        },
        {
          name: "Service Wire",
          href: "/products/cables",
          // submenu: [
          //   { name: "Copper Cables", href: "/products/cables/copper" },
          //   { name: "Fiber Optic Cables", href: "/products/cables/fiber" },
          // ],
        },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden sm:block">
        <div className="flex justify-between p-5 items-center">
          <div className="flex-1">
            <div className="flex justify-start gap-20">
              <div className="flex items-center gap-1">
                <MdLocalPhone color="white" />
                <p className="text-white">+91-9312219262</p>
              </div>
              <div className="flex items-center gap-2">
                <BsEnvelopePlusFill color="white" />
                <p className="text-white">accord_cables@yahoo.co.in</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <a href="/Accord-Cables-Brochure.pdf" download>
              <button className="text-white flex gap-3 items-center border-2 border-white p-2 rounded-full cursor-pointer">
                <LuDownload color="white" /> Download
              </button>
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" >
              <img src="logo.png" className="w-60" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <div key={`nav-${index}`} className="relative">
                  <Link href={item.href} >
                  <button
                    onClick={() => item.submenu ? toggleProductMenu() : closeMenus()}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                  >
                    {item.name} {item.submenu && (isProductMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                  </button>
                  </Link>

                  {item.submenu && isProductMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 min-w-max bg-gray-800 text-white rounded-md shadow-lg"
                    >
                      {item.submenu.map((sub, subIndex) => (
                        <div key={`sub-${index}-${subIndex}`} className="relative">
                          <button
                            onClick={() => sub.submenu ? toggleSubMenu(subIndex) : closeMenus()}
                            className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center gap-1"
                          >
                            {sub.name} {sub.submenu && (activeSubMenu === subIndex ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                          </button>
                          {sub.submenu && activeSubMenu === subIndex && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="absolute left-full top-0 mt-0 min-w-max bg-gray-800 text-white rounded-md shadow-lg"
                            >
                              {sub.submenu.map((subItem, subItemIndex) => (
                                <Link
                                  key={`subItem-${index}-${subIndex}-${subItemIndex}`}
                                  href={subItem.href}
                                  className="block px-4 py-2 hover:bg-gray-700"
                                  onClick={closeMenus}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? (
                <IoIosCloseCircleOutline   className="w-6 h-6" />
              ) : (
                <RxHamburgerMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gray-900 text-white p-5 rounded-lg"
          >
            {navItems.map((item, index) => (
              <div key={`mobile-nav-${index}`} className="mb-2">
                <button
                  onClick={() => item.submenu ? toggleProductMenu() : closeMenus()}
                  className="w-full text-left flex justify-between items-center p-2 hover:bg-gray-700 rounded"
                >
                  {item.name} {item.submenu && (isProductMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                </button>
                {/* {item.submenu && isProductMenuOpen && (
                  <div className="ml-4">
                    {item.submenu.map((sub, subIndex) => (
                      <Link key={`mobile-sub-${index}-${subIndex}`} href={sub.href} className="block p-2 hover:bg-gray-700 rounded">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )} */}
                {item.submenu && isProductMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 min-w-max bg-gray-800 text-white rounded-md shadow-lg"
                    >
                      {item.submenu.map((sub, subIndex) => (
                        <div key={`sub-${index}-${subIndex}`} className="relative">
                          <button
                            onClick={() => sub.submenu ? toggleSubMenu(subIndex) : closeMenus()}
                            className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center gap-1"
                          >
                            {sub.name} {sub.submenu && (activeSubMenu === subIndex ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                          </button>
                          {sub.submenu && activeSubMenu === subIndex && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="absolute left-full top-0 mt-0 min-w-max bg-gray-800 text-white rounded-md shadow-lg"
                            >
                              {sub.submenu.map((subItem, subItemIndex) => (
                                <Link
                                  key={`subItem-${index}-${subIndex}-${subItemIndex}`}
                                  href={subItem.href}
                                  className="block px-4 py-2 hover:bg-gray-700"
                                  onClick={closeMenus}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
              </div>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
}

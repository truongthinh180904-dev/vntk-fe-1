"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const UserDropdownContext = createContext<any>(null);

export const UserDropdownProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Click ngoài -> đóng
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <UserDropdownContext.Provider value={{ open, setOpen, userDropdownRef }}>
      {children}
    </UserDropdownContext.Provider>
  );
};

export const useUserDropdown = () => useContext(UserDropdownContext);

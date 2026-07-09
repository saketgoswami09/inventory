"use client";

import React from "react";

type HeaderProps = {
  name: string;
  subtitle?: string; // Optional subtitle to add clarity to page sections
};

const Header = ({ name, subtitle }: HeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {name}
      </h1>
      {subtitle && (
        <p className="text-xs font-medium text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
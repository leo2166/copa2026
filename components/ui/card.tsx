// components/ui/card.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils"; // helper to concat classNames, create if missing

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 shadow-lg transition-transform hover:scale-105",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

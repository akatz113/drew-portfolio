import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 text-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

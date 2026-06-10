import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverClass = hoverable ? 'hover:shadow-lg transition-shadow' : '';

  return (
    <div
      className={`bg-white rounded-lg shadow ${paddingClasses[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

import React from 'react';

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardWrapper;

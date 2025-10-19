import React from 'react';

interface SafeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  target?: '_blank' | '_self';
}

/**
 * SafeLink component that ensures external links are secure
 * Automatically adds rel="noopener noreferrer" for external links
 */
const SafeLink: React.FC<SafeLinkProps> = ({ 
  href, 
  children, 
  className, 
  'aria-label': ariaLabel,
  target = '_blank'
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={isExternal ? target : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};

export default SafeLink;

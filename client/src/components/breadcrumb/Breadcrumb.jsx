import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const convertToReadable = (text) => {

  return text
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((item) => item);

  return (
    <div className='app-breadcrumb'>
      <Link to="/" className='text-decoration-none text-dark'>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            <span><FontAwesomeIcon icon={faChevronRight} className='breadcrumb-icon' size='sm' /></span>
            {isLast ? (
              <span className='text-muted'>{convertToReadable(name)}</span>
            ) : (
              <Link to={routeTo} className='text-decoration-none text-dark'>{convertToReadable(name)}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default React.memo(Breadcrumb);
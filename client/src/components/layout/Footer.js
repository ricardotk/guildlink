import React from 'react';

export default () => {
  return (
    <footer className="bg-dark text-light mt-5 p-2 text-center">
      <small>
        &copy; {new Date().getFullYear()} {'//'} GuildLink
      </small>
    </footer>
  );
};

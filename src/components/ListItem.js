import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ name, photo }) => (
  <div className="rounded overflow-hidden inline-block w-1/3 pl-4 pr-4 pb-20">
    <img className="w-full" src={photo} alt="Sunset in the mountains" />
    <div className="font-bold list-item-text mb-2 mt-6 text-white">
      {name.replace(/^(.{20}).+/, '$1…')}
    </div>
  </div>
);

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.any.isRequired,
};

export default ListItem;

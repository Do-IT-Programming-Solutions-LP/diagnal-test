import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '../components/ListItem';

class Listing extends PureComponent {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getPhoto = (photo) => {
    let image = require('../assets/images/placeholder_for_missing_posters.png');

    try {
      image = require(`../assets/images/${photo}`);
    } catch (e) {
      console.log(e);
    }
    return image;
  };

  handleScroll = () => {
    const { onGetMorePages } = this.props;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onGetMorePages();
    }
  };

  renderList = list => (
    <div className="flex flex-row justify-start items-start flex-wrap">
      {list.map((item, index) => (<ListItem key={index} name={item.name} photo={this.getPhoto(item['poster-image'])} />))}
    </div>
  );

  render() {
    const { listing, searchResults, searchEnabled } = this.props;
    const list = searchEnabled ? searchResults : listing;

    return (
      <div className="container mx-auto main block p-4 pt-32">
        {listing.length ? this.renderList(list) : null}
      </div>
    );
  }
}

Listing.propTypes = {
  listing: PropTypes.array.isRequired,
  searchResults: PropTypes.array.isRequired,
  onGetMorePages: PropTypes.func.isRequired,
  searchEnabled: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  listing: state.listing.listing,
  searchResults: state.listing.searchResults,
  searchEnabled: state.listing.searchEnabled,
});


export default connect(mapStateToProps, null)(Listing);

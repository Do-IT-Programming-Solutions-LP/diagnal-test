import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import searchIcon from '../assets/images/search.png';
import { onSearchItem, toggleSearch } from '../actions/index';

class Search extends PureComponent {
  state = {
    value: '',
    scrollStarted: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onSearchIconPress = () => {
    const { handleOnToggleSearch } = this.props;

    handleOnToggleSearch();
  };

  handleSearchChange = (event) => {
    const { handleOnSearchItem } = this.props;

    handleOnSearchItem(event.target.value);

    this.setState({ value: event.target.value });
  };

  handleScroll = () => {
    const { scrollStarted } = this.state;

    if (window.pageYOffset < 50) {
      if (scrollStarted) {
        this.setState({ scrollStarted: false });
      }
    } else {
      this.setState({ scrollStarted: true });
    }
  };

  renderSearchForm = () => {
    const { value } = this.state;

    return (
      <form>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"
          id="search"
          type="search"
          placeholder="Search"
          value={value}
          onChange={this.handleSearchChange}
        />
      </form>
    );
  };

  renderTitle = title => (
    <h1 className="text-white">
      {title}
    </h1>
  );

  render() {
    const { listingTitle, searchEnabled } = this.props;
    const { scrollStarted } = this.state;
    const scrolledClass = scrollStarted ? 'scrolled' : '';

    return (
      <div className={`rounded p-6 flex justify-between items-center fixed w-full max-w-md search ${scrolledClass}`}>
        { searchEnabled ? this.renderSearchForm() : this.renderTitle(listingTitle)}
        <div className="w-5 h-5" onClick={this.onSearchIconPress} role="presentation">
          <img src={searchIcon} alt="" />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  listingTitle: PropType.string.isRequired,
  handleOnSearchItem: PropType.func.isRequired,
  handleOnToggleSearch: PropType.func.isRequired,
  searchEnabled: PropType.bool.isRequired,
};
const mapStateToProps = state => ({
  listingTitle: state.listing.title,
  searchEnabled: state.listing.searchEnabled,
});
const mapDispatchToProps = {
  handleOnSearchItem: onSearchItem,
  handleOnToggleSearch: toggleSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

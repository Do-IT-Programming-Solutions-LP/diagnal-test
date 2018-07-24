import React, { PureComponent } from 'react';
import './styles/style.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Listing from './containers/Listing';
import Search from './containers/Search';
import { onGetPage } from './actions';

class App extends PureComponent {
  state = {
    currentPage: -1,
  };

  componentWillMount() {
    const { currentPage } = this.state;

    this.onGetMorePages(currentPage);
  }

  onGetMorePages = () => {
    const { handleOnGetPage } = this.props;
    const { currentPage } = this.state;
    const nextPage = currentPage + 1;

    if (nextPage < 3) {
      this.setState({ currentPage: nextPage }, () => {
        handleOnGetPage(nextPage);
      });
    }
  };

  render() {
    return (
      <div className="container mx-auto main">
        <div className="container mx-auto max-w-md relative">
          <Search />
          <Listing onGetMorePages={this.onGetMorePages} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleOnGetPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ listing: state.listing });

export default connect(mapStateToProps, {
  handleOnGetPage: onGetPage,
})(App);

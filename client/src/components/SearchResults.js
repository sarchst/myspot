import React from "react";
import { connect } from "react-redux";

class SearchResults extends React.Component {
  render() {
    // if (this.props.search.data === null) {
    return <h1>No one with that username found :(</h1>;
    // } else {
    // return <h1>Search Results Page ${this.props.search.data.username}</h1>;
    // }
  }
}

const mapStateToProps = (state) => ({
  search: state.searchResults,
});

export default connect(mapStateToProps)(SearchResults);

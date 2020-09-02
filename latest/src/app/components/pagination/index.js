
import React from "react";
import ReactPaginate from 'react-paginate';

export default class Pagination extends React.Component {
    render() {
        return (
            <div>
                {this.props.count > this.props.perPage ?
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(this.props.count / this.props.perPage)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={this.props.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    /> : ''}
            </div>
        );
    }
}

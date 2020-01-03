/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
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
                        pageCount={this.props.count / this.props.perPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.props.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    /> : ''}
            </div>
        );
    }
}

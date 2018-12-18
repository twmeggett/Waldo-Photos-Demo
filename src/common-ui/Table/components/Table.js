import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { getDict } from '../../I18n';
import LoadingIcon from '../../LoadingIcon';

class Table extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    style: PropTypes.object,
    minRows: PropTypes.number,
    getTdProps: PropTypes.object,
    getTrProps: PropTypes.object,
    getTheadThProps: PropTypes.object,
  }

  render() {
    const headerFontSize = 12;
    const defaultWidth = (length) => {
      return Math.max(length * (headerFontSize - 2.5), 75);
    };

    return (
      <section>
        {
          <div>
            <div className={this.props.isFetching ? '' : 'hide'}>
              <LoadingIcon />
            </div>
            <div className={this.props.isFetching ? 'hide' : ''}>
              <ReactTable
                {...this.props}
                className="-striped -highlight"
                data={this.props.data}
                minRows={this.props.minRows || 0}
                style={this.props.style}
                previousText={getDict('table.previousText')}
                nextText={getDict('table.nextText')}
                loadingText={getDict('table.loadingText')}
                noDataText={getDict('table.noDataText')}
                pageText={getDict('table.pageText')}
                ofText={getDict('table.ofText')}
                rowsText={getDict('table.rowsText')}
                onPageChange={page => this.setState({ page })}
                columns={this.props.columns.map((col) => {
                  return {
                    ...col,
                    minWidth: col.minWidth ? col.minWidth : defaultWidth(col.Header.length),
                  };
                })}
                getTdProps={this.props.getTdProps ? this.props.getTdProps : () => {
                  return {
                    style: {
                      padding: '3px 13px',
                    },
                  };
                }}
                getTheadThProps={this.props.getTheadThProps ? this.props.getTheadThProps : (state, rowInfo, column) => {
                  return {
                    style: {
                      whiteSpace: 'normal',
                      fontSize: headerFontSize + 'px',
                    },
                  };
                }}
                getTrProps={this.props.getTrProps ? this.props.getTrProps : (state, rowInfo, column) => {
                  return {
                    style: {
                      height: '33px',
                    },
                  };
                }}
                defaultFilterMethod={
                  (filter, row) => {
                    const rowValue = row[filter.id];
                    const filterValue = filter.value;

                    return textSearch(rowValue, filterValue);
                  }
                }
              />
            </div>
          </div>
    }
      </section>
    );
  }
}

export default Table;

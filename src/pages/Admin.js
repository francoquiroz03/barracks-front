import React, {useState, useEffect} from "react";
import Menu from "./Menu";
import {getRecord} from "./apiCore";
import {useHistory} from "react-router-dom";
import Cookies from "universal-cookie";
import {useTable} from 'react-table';
import styled from 'styled-components'

const Admin = () => {
    const Styles = styled.div `
    table {
      width: 100%;
      border-spacing: 0;
      border: 1px solid black;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
      th,
      td {
        margin: 0;
        padding: 1rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        :last-child {
          border-right: 0;
        }
      }
    }
  `
  function Table({columns, data}) {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup
                .headers
                .map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row
                  .cells
                  .map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

    const columns = [
        {
        Header: 'Usuario',
        accessor: 'usuario'
        }, {
        Header: 'Rol',
        accessor: 'rol'
        }, {
        Header: 'Dispositivo',
        accessor: 'dispositivo'
        }, {
        Header: 'Fecha',
        accessor: 'fecha'
        }, {
            Header: 'Hora',
            accessor: 'hora'
        }
    ]

    const history = useHistory();
    const cookies = new Cookies();
    const [Record, setRecord] = useState([]);

    const loadRecord = () => {
        getRecord().then(data => {
            if (data.status === 401) {
                cookies.remove('jwt', {path: '/'});
                history.push("/");
            } else {
                setRecord(data);
            }
        });
    };

    useEffect(() => {
        loadRecord();
    }, []);

    const userInfo = () => {
        return (
            <Styles>
              <Table
                data={Record}
                columns={columns}
              />
            </Styles>
          )
    };

    return (
        <div
            title="Dashboard"
            description=""
            className="container-fluid"
        >
            <Menu />
            <div className="row">
                <div className="col-9">
                    {userInfo()}
                </div>
            </div>
        </div>
    );
};

export default Admin;
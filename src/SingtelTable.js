// React
import { useEffect, useState } from "react"

// css
import './Table.scss';

// Components
import SingtelCheckbox from "./components/Checkbox/SingtelCheckbox"
import SingtelRadioButton from "./components/Radiobox/SingtelRadioButton"


const SingtelTable = ({
  dataSource,
  columns,
  isCheckboxRows,
  isRadioBoxRows
}) => {

  console.log(isCheckboxRows,
    isRadioBoxRows)

  const [dataSet, setDataSet] = useState(dataSource);
  const [radioSelectedRowId, setRadioSelectedRowId] = useState(null);
  const [checkboxClassRow, setCheckboxClassRow] = useState([]);
  const [orderBy, setOrderBy] = useState([]);
  const [columnNameDataset, setColumnNameDataset] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState(false);
  const [selectAllSelected, setSelectAllSelected] = useState(false);

  const windowWidth = window.innerWidth

  useEffect(() => {
    if (columns) {
      getColumnNames()
    }
  }, [
    columns,
  ])

  const getColumnNames = () => {
    return columns.map(({ title }) => {
      // return columnNameDataset.push(title)
      setColumnNameDataset((oldArray) => [
        ...oldArray,
        title
      ])
    })
  }

  const camelCase = (str) => {
    return str
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
  }

  const handleCheckboxClick = (rowId) => {
    if (isCheckboxRows && checkboxClassRow?.indexOf(rowId) === -1) {
      setCheckboxClassRow((oldArray) => [
        ...oldArray,
        rowId
      ])
    } else {
      setCheckboxClassRow(checkboxClassRow.filter(item => item !== rowId));
    }
  }

  const handleSortBy = (title) => {

    const index = orderBy.findIndex((record) => record.columnName === title);

    if (index === -1) {
      const record = {
        columnName: title,
        sortBy: true
      }

      setOrderBy((oldArray) => [
        ...oldArray,
        record
      ]);

    } else {
      setOrderBy([]);

      setOrderBy((prevState) => {
        return prevState.map((item) => {
          return { ...item, sortBy: !item.sortBy }
        })
      })


    }

    setSortBy(title);
    setSortDirection((prev) => !prev);

    getFilteredData(index, title);

  }

  const getFilteredData = (index, title) => {
    const newDataset = [...dataSet];
    const parsedValue = camelCase(title);
    const poistion = index === -1 ? ">" : "<";

    const updatedData = newDataset.sort((a, b) => {
      if (poistion === ">" && a[parsedValue] > b[parsedValue]) {
        return 1
      } else {
        return -1
      }
    });

    setDataSet(updatedData);
  }

  const renderTableHeader = () => {
    const record = dataSet[0]
    if (isRadioBoxRows && Object.keys(record).length > 3 && windowWidth < 1023) return

    return <tr>
      {isCheckboxRows && <th className="singtel-table-cell" style={{ textAlign: "left" }}><SingtelCheckbox onClick={() => setSelectAllSelected(!selectAllSelected)} /></th>}
      {isRadioBoxRows && <th className="singtel-table-cell"></th>}
      {columns.map(({ title }) => {
        return <th className={`singtel-table-cell`} onClick={() => handleSortBy(title)}>
          {title}

          {(sortBy === title && sortDirection) && <span className="ascending"></span>}
          {sortBy === title && !sortDirection && <span className="descending"></span>}
        </th>
      })}
    </tr>

  }

  const renderTableBody = () => dataSet.map(({ key, ...record }) => {

    // for mobile view
    if (isRadioBoxRows && Object.keys(record).length > 3 && windowWidth < 1023) {

      return <tr
        data-row-key={`${key}`}
        className={`
          singtel-table-row
          ${(isRadioBoxRows && (radioSelectedRowId === key)) ? "selected-row" : ""}
        `}
      >

        {<td style={{ width: "100px" }} className="singtel-table-cell"><SingtelRadioButton id={key} name={"row"} onClick={() => setRadioSelectedRowId(key)} /></td>}

        <td className="singtel-table-cell">
          {
            Object.values(record).map((data, index) => {
              return <p><span>{columnNameDataset[index]}:</span> <span>{data}</span></p>
            })
          }
        </td>
      </tr >

    } else {
      return <tr
        data-row-key={`${key}`}
        className={`
      singtel-table-row
      ${isCheckboxRows && checkboxClassRow.indexOf(key) !== -1 ? "selected-row" : ""} ${(isRadioBoxRows && (radioSelectedRowId === key)) ? "selected-row" : ""}`}
      >
        {isCheckboxRows && <td className="singtel-table-cell">
          <SingtelCheckbox
            handleOnClick={() => handleCheckboxClick(key)}
          />
        </td>}
        {isRadioBoxRows && <td className="singtel-table-cell"><SingtelRadioButton id={key} name={"row"} onClick={() => setRadioSelectedRowId(key)} /></td>}
        {
          Object.values(record)
            .map((data) => (
              <td>{data}</td>
            ))
        }
      </tr >
    }

  })

  const renderData = () => {
    if (isCheckboxRows && isRadioBoxRows) {
      return <div class='error-wrapper'>Please pass either checkbox or radio button option only. Both options are not allowed.</div>
    } else {
      return renderTable()
    }
  }

  const renderTable = () => {
    return (
      <table className="singtel-table">
        <thead className="singtel-table-thead">
          {renderTableHeader()}
        </thead>
        <tbody className="singtel-table-tbody">
          {renderTableBody()}
        </tbody>
      </table>
    )
  }

  return (
    <div className="table-wrapper">
      {renderData()}
    </div>
  )
}

export default SingtelTable;

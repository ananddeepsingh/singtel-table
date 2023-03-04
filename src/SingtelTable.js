// React
import { useState } from "react"

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

  const [dataSet, setDataSet] = useState(dataSource);
  const [radioSelectedRowId, setRadioSelectedRowId] = useState(null);
  const [checkboxClassRow, setCheckboxClassRow] = useState([]);
  const [orderBy, setOrderBy] = useState([]);

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
    console.log(rowId)
    if (isCheckboxRows && checkboxClassRow?.indexOf(rowId) === -1) {
      setCheckboxClassRow((oldArray) => [
        ...oldArray,
        rowId
      ])
    } else {
      setCheckboxClassRow(checkboxClassRow.filter(item => item !== rowId));
    }
  }

  const handleSortBy = (sortByKey) => {

    const index = orderBy.findIndex((record) => record.columnName === sortByKey);
    if (index === -1) {
      const record = {
        columnName: sortByKey,
        sortBy: true
      }
      setOrderBy((oldArray) => [
        ...oldArray,
        record
      ]);

    } else {
      setOrderBy((oldArray) => [
        ...oldArray,
        orderBy[index].sortBy = !orderBy[index].sortBy
      ])
    }


    const newDataset = [...dataSet];
    const parsedValue = camelCase(sortByKey);
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

  const renderTableHeader = () => <tr>
    {/* {isCheckboxRows && <th className="singtel-table-cell" style={{ textAlign: "left" }}><SingtelCheckbox onClick={() => setSelectAllSelected(!isSelectAllSelected)} /></th>} */}
    {/* {isRadioBoxRows && <th className="singtel-table-cell"></th>} */}
    {<th className="singtel-table-cell"></th>}
    {columns.map(({ title }) => {
      return <th className="singtel-table-cell" onClick={() => handleSortBy(title)}>{title}</th>
    })}
  </tr>

  const renderTableBody = () => dataSet.map(({ key, ...record }) => (
    <tr
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
  ))

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

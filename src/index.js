import SingtelTable from "./SingtelTable";
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    key: 'expiry',
  },
  {
    title: 'Penalty',
    dataIndex: 'penalty',
    key: 'penalty',
  },
];

const dataSource = [
  {
    key: 1,
    name: 'Mavis Chen',
    mobile: '8899 7654',
    expiry: 'Dec 2022',
    penalty: '$600',
  },
  {
    key: 2,
    name: 'Rodney Artichoke',
    mobile: '8899 7654',
    expiry: 'Jan 2022',
    penalty: '$400',
  },
  {
    key: 3,
    name: 'Eric Widget',
    mobile: '8899 7654',
    expiry: 'Feb 2022',
    penalty: '$700',
  },
];

root.render(
  <React.StrictMode>
    <SingtelTable
      dataSource={dataSource}
      columns={columns}
      isCheckboxRows={true}
    // isRadioBoxRows={true}
    />
  </React.StrictMode>
);

export * from './SingtelTable'



# Singtel React Table Component

This is custom table

## if need to show checkbox then use below snippet

```
<SingtelTable
      dataSource={dataSource}
      columns={columns}
      isCheckboxRows={true}
    />
```

## if need to show checkbox then use below snippet

```
<SingtelTable
      dataSource={dataSource}
      columns={columns}
       isRadioBoxRows={true}
    />
```

## if both option will be true so it will give an error

```
<SingtelTable
      dataSource={dataSource}
      columns={columns}
       isRadioBoxRows={true}
      isCheckboxRows={true}
    />
```

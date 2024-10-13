import * as React from 'react'
import { Table, TableProps } from "antd"
import "./index.css"

interface AppTableProps<RecordT> extends TableProps<RecordT> {
}
const locale = {
    emptyText: () => <span className='text-theme-black text-xl font-poppins_cf'>No Data Available</span>,
};
export const AppTable = <RecordT extends {}>(props: AppTableProps<RecordT>) => {
    return <Table locale={locale} scroll={undefined}  {...props}  />
}





import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppTable } from '.';

describe('AppTable', () => {
    test('should render Table component with props', () => {
        const columns = [
            { key: 1, title: 'First Name', dataIndex: 'firstName' },
            { key: 2, title: 'Last Name', dataIndex: 'lastName' },
            { key: 3, title: 'Age', dataIndex: 'age' },
        ];

        const data = [
            { key: 1, firstName: 'John', lastName: 'Doe', age: 25 },
            { key: 2, firstName: 'Jane', lastName: 'Smith', age: 30 },
        ];

        const { container } = render(
            <AppTable columns={columns} dataSource={data} />
        );

        const tableComponent = container.querySelector('.ant-table');

        expect(tableComponent).toBeInTheDocument();
        expect(tableComponent).toHaveClass('ant-table');
    });

    test('should render "No Data Available" when data source is empty', () => {

        const columns = [
            { key: 1, title: 'First Name', dataIndex: 'firstName' },
            { key: 2, title: 'Last Name', dataIndex: 'lastName' },
            { key: 3, title: 'Age', dataIndex: 'age' },
        ];

        const data: {
            key: number;
            title: string;
            dataIndex: string;
        }[] = [];

        const { container} = render(
            <AppTable columns={columns} dataSource={data} />
        );

        const emptyText = screen.getByText('No Data Available');
        expect(emptyText).toBeInTheDocument();

        const tableComponent = container.querySelector('.ant-table');
        expect(tableComponent).toBeInTheDocument();
        expect(tableComponent).toHaveClass('ant-table');
    });
});

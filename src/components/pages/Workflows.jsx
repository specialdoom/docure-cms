import { useEffect, useState } from 'react';
import { Table } from 'rsuite';
import { WorkflowService } from '../../services/WorkflowService';

const workflowService = new WorkflowService();

const Articles = () => {
  const [workflows, setWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    workflowService
      .getAll()
      .then((data) => {
        setWorkflows(data.workflows);
        setIsLoading(false);
      })
      .catch((e) => {
        setWorkflows([]);
        setIsLoading(false);
      });
  }, [setWorkflows]);

  return (
    <Table height={400} data={workflows} loading={isLoading}>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.Cell dataKey='title' />
      </Table.Column>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Published date</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => {
            const date = new Date(rowData.date);
            return date.toLocaleString('en-GB');
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default Articles;

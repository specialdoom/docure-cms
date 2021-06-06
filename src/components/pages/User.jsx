import { useEffect, useState } from 'react';
import { Notification } from 'rsuite';

import { Toggle, Table } from 'rsuite';
import { UserService } from '../../services/UserService';

const userService = new UserService();

const User = () => {
  const [users, setUsers] = useState([]);

  const updateRoles = (set, userId, role) => {
    userService.updateUserRole(userId, role, set);
  };

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        Notification.error({
          title: 'Server error',
          description: 'Something went wrong getting the users'
        });
      });
  }, []);

  return (
    <Table height={400} data={users} loading={users.length <= 0}>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>uid</Table.HeaderCell>
        <Table.Cell dataKey='uid' />
      </Table.Column>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Display name</Table.HeaderCell>
        <Table.Cell dataKey='displayName' />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.Cell dataKey='email' />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Roles</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => {
            return (
              <>
                <Toggle
                  defaultChecked={rowData.roles.includes('admin')}
                  checkedChildren='Admin'
                  unCheckedChildren='Admin'
                  onChange={(value) => updateRoles(value, rowData.uid, 'admin')}
                />
                <Toggle
                  defaultChecked={rowData.roles.includes('editor')}
                  checkedChildren='Editor'
                  unCheckedChildren='Editor'
                  onChange={(value) =>
                    updateRoles(value, rowData.uid, 'editor')
                  }
                />
                <Toggle
                  defaultChecked={rowData.roles.includes('user')}
                  checkedChildren='User'
                  unCheckedChildren='User'
                  onChange={(value) => updateRoles(value, rowData.uid, 'user')}
                />
              </>
            );
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default User;

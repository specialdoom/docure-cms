import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Notification } from 'rsuite';
import { ArticleService } from '../../services/ArticleService';

const articleService = new ArticleService();

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    articleService
      .getAll()
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((e) => {
        setArticles([]);
        setIsLoading(false);
      });
  };

  const addArticle = () => {
    history.push('/article');
  };

  const remove = (articleId) => {
    articleService
      .remove(articleId)
      .then(() => {
        Notification.success({
          title: 'Success',
          description: 'Article was removed successfully!'
        });
        getArticles();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <docure-button primary onClick={addArticle}>
        Create new article
      </docure-button>
      <Table height={400} data={articles} loading={isLoading}>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.Cell dataKey='title' />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.Cell dataKey='author' />
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
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <docure-button secondary onClick={() => remove(rowData.id)}>
                Delete
              </docure-button>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
    </>
  );
};

export default Articles;

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormGroup,
  Input,
  Notification,
  SelectPicker,
  Divider
} from 'rsuite';
import { FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { ArticleService } from '../../services/ArticleService';
import { WorkflowService } from '../../services/WorkflowService';

const articleService = new ArticleService();
const workflowService = new WorkflowService();

const Article = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      title: '',
      description: '',
      content: '',
      author: '',
      workflowId: ''
    }
  });

  const [workflows, setWorkflows] = useState([{ label: '1', value: '1' }]);

  useEffect(() => {
    workflowService.getAll().then((data) =>
      setWorkflows(
        data.workflows.map((item) => ({
          label: item.title,
          value: item.id
        }))
      )
    );
  }, [setWorkflows]);

  const submit = (data) => {
    articleService
      .add(data)
      .then(() => {
        Notification.success({
          title: 'Success',
          description: 'Article was added successfully!'
        });
        reset();
      })
      .catch(() => {
        Notification.error({
          title: 'Success',
          description:
            'Something went wrong while adding the article. Try again!'
        });
      });
  };

  return (
    <FlexboxGrid>
      <FlexboxGridItem colspan={6}>
        <Form>
          <FormGroup>
            <Controller
              name='title'
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} placeholder='Title' />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} placeholder='Description' />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name='content'
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  componentClass='textarea'
                  rows={3}
                  placeholder='Content'
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name='author'
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} rows={3} placeholder='Author' />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name='workflowId'
              control={control}
              render={({ field: { onChange } }) => (
                <SelectPicker
                  onChange={onChange}
                  data={workflows}
                  style={{ width: 224 }}
                />
              )}
            />
          </FormGroup>
          <docure-button primary onClick={handleSubmit(submit)}>
            Submit
          </docure-button>
        </Form>
      </FlexboxGridItem>
      <FlexboxGridItem colspan={18}>
        <Divider>Article card</Divider>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <docure-article-card>
            <span slot='title'>{watch('title')}</span>
            <span slot='description'>{watch('description')}</span>
          </docure-article-card>
        </div>
        <Divider>Article</Divider>
        <docure-article title={watch('title')} workflow={watch('workflowId')}>
          <div>{watch('content')}</div>
        </docure-article>
      </FlexboxGridItem>
    </FlexboxGrid>
  );
};

export default Article;

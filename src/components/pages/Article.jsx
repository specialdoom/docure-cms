import { useForm, Controller } from 'react-hook-form';
import { Form, FormGroup, Input, Notification } from 'rsuite';
import { FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { ArticleService } from '../../services/ArticleService';

const articleService = new ArticleService();

const Article = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      title: '',
      description: '',
      content: '',
      author: ''
    }
  });

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
          <docure-button primary onClick={handleSubmit(submit)}>
            Submit
          </docure-button>
        </Form>
      </FlexboxGridItem>
      <FlexboxGridItem colspan={18}>
        {watch('title')}
        {watch('description')}
        <div
          dangerouslySetInnerHTML={{
            __html: watch('content')
          }}
        ></div>
      </FlexboxGridItem>
    </FlexboxGrid>
  );
};

export default Article;

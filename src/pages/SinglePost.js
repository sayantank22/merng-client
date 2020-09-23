import React, { useContext, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Form,
  Grid,
  Image,
  Card,
  Button,
  Label,
  Icon,
  Popup,
} from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const avatar = props.location.state.avatar;

  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update: () => {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <div class='ui placeholder'>
              <div class='image'></div>
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <div class='ui fluid placeholder'>
                  <div class='very short line'></div>
                  <div class='short line'></div>
                  <div class='paragraph'>
                    <div class='line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src={`https://semantic-ui.com/images/${
                avatar !== '' ? avatar : 'avatar/large/molly.png'
              }`}
              // src={`https://semantic-ui.com/images/avatar/large/molly.png`}
              size='small'
              floated='right'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Popup
                  inverted
                  content='Comment on post'
                  trigger={
                    <Button
                      as='div'
                      labelPosition='right'
                      onClick={() => commentInputRef.current.focus()}>
                      <Button basic color='blue'>
                        <Icon name='comments' />
                      </Button>
                      <Label basic color='blue' pointing='left'>
                        {commentCount}
                      </Label>
                    </Button>
                  }
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Comments</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        placeholder='Say something...'
                        name='comment'
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim() === ''}
                        onClick={submitComment}>
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;

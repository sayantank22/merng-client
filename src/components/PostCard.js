import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const avatarPng = [
  'elyse',
  'kristy',
  'lena',
  'lindsay',
  'mark',
  'matthew',
  'molly',
  'patrick',
  'rachel',
];

const avatars = [
  'elliot',
  'steve',
  'jenny',
  'daniel',
  'ade',
  'chris',
  'christian',
  'helen',
  'joe',
  'justen',
  'laura',
  'matt',
  'stevie',
  'veronika',
  'elyse',
  'kristy',
  'lena',
  'lindsay',
  'mark',
  'matthew',
  'molly',
  'patrick',
  'rachel',
];

function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    comments,
    likes,
  },
}) {
  const { user } = useContext(AuthContext);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    if (avatarPng.includes(avatar)) {
      setAvatar(`avatar2/large/${avatar}.png`);
    } else {
      setAvatar(`avatar/large/${avatar}.jpg`);
    }
  }, []);

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={`https://semantic-ui.com/images/${avatar}`}
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta
            as={Link}
            to={{ pathname: `/posts/${id}`, state: { avatar } }}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <Popup
            inverted
            content='Comment on post'
            trigger={
              <Button as='div' labelPosition='right'>
                <Button
                  basic
                  color='blue'
                  as={Link}
                  to={{ pathname: `/posts/${id}`, state: { avatar } }}>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
            }
          />
          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default PostCard;

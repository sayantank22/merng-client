import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column style={{ marginBottom: 20 }}>
              <div class='ui raised segment'>
                <div class='ui placeholder'>
                  <div class='image header'>
                    <div class='very short line'></div>
                    <div class='short line'></div>
                    <div class='mdeuim line'></div>
                  </div>
                  <div class='paragraph'>
                    <div class='meduim line'></div>
                    <div class='full line'></div>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;

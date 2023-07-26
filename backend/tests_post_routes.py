"""posts routes tests."""

import os
from unittest import TestCase
from models import User, Post, connect_db, db
from freezegun import freeze_time

from sqlalchemy import DateTime
from datetime import datetime

from datetime import datetime
from freezegun import freeze_time

os.environ['DATABASE_URL'] = "postgresql:///blogly_testing"

from app import app


app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['FLASK_DEBUG'] = True

db.create_all()


class PostRouteTests(TestCase):
    """Tests for posts routes."""
    # @freeze_time("2022-01-01 12:00:00")
    def setUp(self):
        """Add post to database before every test."""
        
        db.drop_all()
        db.create_all()

        self.client = app.test_client()
 
        u1 = User(first_name='test_first_one', last_name='test_last_one')
        uid1 = 1111
        u1.id = uid1
       
        p1 = Post(title='hello', content='hello world', user_id=1111)
        p1id = 111
        p1.id = p1id

        db.session.add_all([u1,p1])
        db.session.commit()

        self.p1 = db.session.get(Post, p1id)
        self.u1 = db.session.get(User, uid1)

    def tearDown(self):
        """Do after every test."""
        db.session.rollback()

    def test_get_all_posts(self):
        """Test: add new post"""
        with self.client as c:
            resp = c.get(f"/users/{self.u1.id}/posts")
            self.assertEqual(resp.status_code, 200)
            created_at = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
            expected_resp = [
                {'content': 'hello world',
                 'created_at': created_at,
                 'id': 111, 'title': 'hello', 'user_id': 1111}]
            self.assertEqual(resp.json, expected_resp)

    def test_add_post_redirect(self):
        """Test: post is added to db and redirects"""
        with self.client as c:
            resp = c.post(f"/users/{self.u1.id}/posts/new",
                          json={
                                'title':'hello again',
                                'content': 'hello world again'
                          },)
            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, f"/users/{self.u1.id}/posts")

    # @freeze_time("2022-01-01 00:00:00")
    def test_add_post_follow(self):
        """Test: post is added to db and follows redirect"""
        with self.client as c:
            resp = c.post(f"/users/1111/posts/new",
                      json={
                          'title': 'hello again',
                          'content': 'hello world again'
                      },
                      follow_redirects=True
                      )
        created_at = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
        expected_resp = [{'content': 'hello world', 'created_at': created_at, 'id': 111, 'title': 'hello', 'user_id': 1111}, {
                         'content': 'hello world again', 'created_at': created_at, 'id': 1, 'title': 'hello again', 'user_id': 1111}]
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, expected_resp)

    def test_get_post(self):
        """Test: retrieve post of specific user"""
        with self.client as c:
            resp = c.get(f"/posts/{self.p1.id}")
            self.assertEqual(resp.status_code, 200)
            created_at = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
            expected_resp = {
                'content': 'hello world',
                'createdAt': created_at,
                'firstName': 'test_first_one',
                'id': 111,
                'imageUrl': None,
                'lastName': 'test_last_one',
                'title': 'hello',
                 'userId': 1111
                 }
            self.assertEqual(resp.json, expected_resp)

    def test_edit_post(self):
        """Test: correct post is retrieved to edit"""
        with self.client as c:
            resp = c.get(f"/posts/{self.p1.id}/edit")
            self.assertEqual(resp.status_code, 200)
            created_at = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
            expected_resp = {
                'content': 'hello world', 
                'createdAt': created_at,
                'id': 111,
                'title': 'hello',
                'userId': 1111
                 }
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.json, expected_resp)
    
    def test_edit_post(self):
        """Test: edit post with matching id"""
        with self.client as c:
            resp = c.patch(f"/posts/{self.p1.id}/edit", 
                json = {
                        'title':'update title',
                        'content': 'update content'
            })
        self.assertEqual(resp.status_code, 302)

    def test_edit_post(self):
        """Test: edit post with matching id"""
        with self.client as c:
            resp = c.patch(f"/posts/{self.p1.id}/edit",
                           json={
                               'title': 'update title',
                               'content': 'update content'
                           },
                           follow_redirects=True
                           )
        self.assertEqual(resp.status_code, 200)
        created_at = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
        expected_resp = [{
                        'content': 'update content', 
                        'created_at': created_at,
                        'id': 111,
                        'title': 'update title',
                        'user_id': 1111
                        }]
        self.assertEqual(resp.json, expected_resp)

    def test_delete_post_redirect(self):
        """Test: deletes post with matching id and redirects"""
        with self.client as c:
            resp = c.delete(f"/posts/{self.p1.id}/delete")
            self.assertEqual(resp.status_code, 302)
            # considering not hard coding the users route. Pull data from response?
            self.assertEqual(resp.location, "/users/1111/posts")
    
    def test_delete_post_follow(self):
        """Test: deletes post redirects to user pages corresponding to post"""
        with self.client as c:
            resp = c.delete(f"/posts/{self.p1.id}/delete", follow_redirects=True)
            self.assertEqual(resp.json, [])

            
# POST / users/[user-id]/posts/new
# Handle add form

# add post and redirect to the user detail page.

# GET / posts/[post-id]
# Show a post.

# GET / users/[user-id]/posts/new
# Show form to add a post for that user.

# Show buttons to edit and delete the post.

# GET / posts/[post-id]/edit
# Show form to edit a post, and to cancel(back to user page).

# POST / posts/[post-id]/edit
# Handle editing of a post. Redirect back to the post view.

# POST / posts/[post-id]/delete
# Delete the post.

"""Post model tests."""

import os
from unittest import TestCase

from models import User, Post, connect_db, db

os.environ['DATABASE_URL'] = "postgresql:///blogly_testing"

from app import app

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['FLASK_DEBUG'] = True

db.create_all()

class PostTestCase(TestCase):
    """Integration tests for Post model"""

    def setUp(self):
        """Add post to database before every test."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        u1 = User(first_name='test_first_one', last_name='test_last_one')
        uid1 = 1111
        u1.id = uid1

        # u2 = User(first_name='test_first_second', last_name='test_last_second')
        # uid2 = 2222
        # u2.id = uid2

        p1 = Post(title='hello', content='hello world', user_id=1111)
        p1id = 111
        p1.id = p1id

        # p2 = Post(title='hello again', content='hello world again', user_id=2222)
        # p2id = 222
        # p2.id = 22

        db.session.add_all([u1, p1])
        db.session.commit()

        self.p1 = db.session.get(Post, p1id)
        # self.p2 = db.session.get(Post, p2id)

    def tearDown(self):
        """Do after every test."""
    
    def test_post_model(self):
        """Does basic model work?"""
        self.assertIsInstance(self.p1, Post)
        self.assertEqual(self.p1.content, 'hello world')


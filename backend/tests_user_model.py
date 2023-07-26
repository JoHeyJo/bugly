"""User model tests."""
# run tests using these commands:

# (venv) $ python -m unittest tests_user_routes

# (venv) $ python -m unittest tests_user_routes.UserTestCase

# (venv) $ python -m unittest tests_user_routes.UserTestCase.test_user_model

import os
from unittest import TestCase

from models import User,connect_db, db

os.environ['DATABASE_URL'] = "postgresql:///blogly_testing"

from app import app

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['FLASK_DEBUG'] = True

db.create_all() 

class UserTestCase(TestCase):
    """Integration tests for User model"""

    def setUp(self):
        """Add users to database before every test."""
        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        u1 = User(first_name='test_first_one', last_name='test_last_one')
        uid1 = 1111
        u1.id = uid1

        u2 = User(first_name='test_first_second', last_name='test_last_second')
        uid2 = 2222
        u2.id  = uid2

        db.session.add_all([u1,u2])
        db.session.commit()

        self.u1 = db.session.get(User,uid1)
        self.u2 = db.session.get(User,uid2)

    def tearDown(self): 
         """Stuff to do after every test."""
         db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""
        self.assertIsInstance(self.u1, User)
        self.assertEqual(self.u1.first_name,'test_first_one')



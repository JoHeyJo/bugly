import os

# Production database URL
SQLALCHEMY_DATABASE_URI = os.environ.get("postgresql:///blogly_fs")

# Testing database URL
SQLALCHEMY_DATABASE_URI_TEST = os.environ.get("postgresql:///blogly_testing")

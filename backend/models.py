from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

bcrypt = Bcrypt()
db = SQLAlchemy()


# can contain a default img
# DEFAULT_IMAGE_URL = "https://tinyurl.com/y3rfozh8"

class User(db.Model):
    """User model."""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String, nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    project = db.relationship("Project", backref="user")

    posts = db.relationship("Post", backref="user")

    def __repr__(self):
        return f"< User #{self.email}: {self.first_name}, {self.last_name}>"
    # gives "special" functionality to certain methods to make them act as getters, setters, or deleters when we define properties in a class
    
    @classmethod
    def signup(cls, email, first_name, last_name, image_url, password):
        """Sign up user. Hashes password and adds user to system."""

        hashed_password = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(email=email, first_name=first_name, last_name=last_name, image_url=image_url, password=hashed_password)

        token = create_access_token(identity=email)

        db.session.add(user)
        return token

    @classmethod
    def authenticate(cls, email, password):
        """Find user with `username` and `password`.

        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If can't find matching user (or if password is wrong), returns False.
        """

        user = cls.query.filter_by(email=email).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                token = create_access_token(identity=email)
                return token
        return False

    @property
    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"

    def serialize(self):
        """Serialize to dict"""
        return {"id": self.id, "email": self.email, "first_name": self.first_name, "last_name": self.last_name, "image_url": self.image_url}
    
    
class Project(db.Model):
    """Project model."""

    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # user = db.relationship("User", backref="project")
    posts = db.relationship("Post", backref="project")
    details = db.relationship("Detail", backref="project")
    def serialize(self):
        """Serialize to dict"""
        return {"id": self.id, "name": self.name, "description": self.description, "user_id": self.user_id}
    

class ProjectTech(db.Model):
    """Mapping of a project to a technology"""

    __tablename__ = "projects_technologies"

    project_id = db.Column(db.Integer, 
                           db.ForeignKey("projects.id"), 
                           primary_key=True,
                           nullable=False)
    tech_id = db.Column(db.Integer, 
                        db.ForeignKey("technologies.id"), 
                        primary_key=True,
                        nullable=False)
    
    
class Detail(db.Model):
    """Detail model."""

    __tablename__ = "details"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    detail = db.Column(db.Text, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    def serialize(self):
        """Serialize to dict"""
        return { "id": self.id, "detail": self.detail, "project_id": self.project_id}

class Spec(db.Model):
    """Spec model."""

    __tablename__ = "specs"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    spec = db.Column(db.Text, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    def serialize(self):
        """Serialize to dict"""
        return { "id": self.id, "detail": self.spec, "project_id": self.project_id}
    
class Tech (db.Model):
    """Tech model. Projects can be assigned to this."""

    __tablename__ = "technologies"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tech = db.Column(db.String(50), nullable=False)
    projects = db.relationship('Project',
                               secondary='projects_technologies',
                               backref='technologies')

    def serialize(self):
        """Serialize to dict"""
        return {"id": self.id, "tech": self.tech }

    
class Post(db.Model):
    """Post model."""
    
    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    problem = db.Column(db.Text)
    solution = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        """Serialize to dict"""
        return {"id": self.id, "title": self.title, "content": self.content, "problem": self.problem, "solution": self.solution,  "created_at": self.created_at.strftime("%D, %Y, %I:%M %p"), "user_id": self.user_id, "project_id":self.project_id}


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)

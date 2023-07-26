from flask_jwt_extended.exceptions import JWTDecodeError
import os
from flask import Flask, request, redirect, jsonify, url_for
from models import db, connect_db, User, Post, Project
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension
# from werkzeug.exceptions import BadRequest
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta

######## Double check exception key works ##########
app = Flask(__name__)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_fs'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = 'i-have-a-secret'
app.config["JWT_SECRET_KEY"] = "super-duper-secret"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
app.app_context().push()
jwt = JWTManager(app)

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)
connect_db(app)

db.create_all()

# do this when you want to have your root route be a certain page/component
@app.get('/')
def root():
    """Homepage redirects to list of users."""

    return redirect("/users")


@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

##############################################################################
# User signup/login/logout

@app.post('/signup')
def signup():
    """    Create new user, add to DB and return token.
    Return error message if the there already is a user with that username. """
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    password = request.json["password"]
    email = request.json["email"]
    image = request.json.get("image") or None
    try:
        token = User.signup(
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email,
            image_url=image
        )
        db.session.commit()
        return jsonify({"token": token})

    except IntegrityError as e:
        pgerror = e.orig.diag.message_detail
        message = pgerror.split('DETAIL: ')[0].strip()
        return jsonify({"error": message}), 401
    
@app.post('/login')
def login():
    """Validates user credentials."""
    email = request.json['email']
    password = request.json['password']
    token = User.authenticate(email=email, password=password)
    try:
        if token:
            return jsonify({"token": token})
        else:
            return jsonify({"error": "Invalid login credentials."}), 401
    except IntegrityError as e:
        return jsonify({"error": e}), 401


######### User routes ########### ########### ########### ########### ###################### ########### ########### ########### ###########
@app.get("/users")
def users_all():
    """Retrieves all users in database"""
    try:
        # users = User.query.order_by(User.last_name, User.first_name).all()
        users = User.query.order_by(User.last_name, User.first_name)
        serialized = [User.serialize(user) for user in users]
        user_data = [{'id': user['id'], 'firstName':user['first_name'],
                      'lastName':user['last_name']} for user in serialized]
        return jsonify(user_data)
    except LookupError as error:
        print('Lookup error >>>>>>>>>', error)
        return jsonify({"error": error})


@app.get("/users/<id>")
def users_get(id):
    """Retrieves user with matching ID"""
    try:
        user = User.query.filter(User.email == id).first() if type(id) == str else User.query.get_or_404(int(id))

        serialized = User.serialize(user)
        user_data = {'id': serialized['id'], 'email': serialized['email'], 'firstName': serialized['first_name'],
                     'lastName': serialized['last_name'], 'imageUrl': serialized['image_url']}
        return jsonify(user_data)
    except LookupError as error:
        print('Lookup error >>>>>>>>>', error)
        return jsonify({"error": error})


@app.post("/users/new")
def users_add():
    """Adds new user to database"""
    try:
        first_name = request.json['firstName']
        last_name = request.json['lastName']
        user = User(first_name=first_name, last_name=last_name)
        db.session.add(user)
        db.session.commit()
        return redirect("/")
    except Exception as e:
        print("keyerror>>>>>>", e)
        return jsonify({"error": {str(e)}}), 401


@app.get('/users/<int:user_id>/edit')
def users_edit(user_id):
    """Retrieves user with matching ID to populate edit form"""
    user = User.query.get_or_404(user_id)
    serialized = User.serialize(user)
    user_data = {'id': serialized['id'], 'firstName': serialized['first_name'],
                 'lastName': serialized['last_name'], 'imageUrl': serialized['image_url']}
    return jsonify(user_data)


@app.patch("/users/<int:user_id>/edit")
def users_update(user_id):
    """Update user's information"""
    try:
        user = User.query.get_or_404(user_id)
        user.first_name = request.json['firstName']
        user.last_name = request.json['lastName']

        db.session.add(user)
        db.session.commit()

        return redirect(f"/users/{user_id}")

    except LookupError as error:
        print("Lookup error", error)
        return jsonify({"error": error})


@app.delete("/users/<int:user_id>/delete")
@jwt_required()
def user_delete(user_id):
    """Delete user"""
    jwt_identity = get_jwt_identity()

    user = User.serialize(User.query.get_or_404(user_id))

    if user['email'] != jwt_identity:
        return jsonify({"error": "Unauthorize access"}), 401

    user = User.query.get_or_404(user_id)
    posts = posts = Post.query.filter(Post.user_id == user_id).all()
    for post in posts:
        db.session.delete(post)
    db.session.delete(user)
    db.session.commit()
    return redirect("/")

######### Post routes ########### ########### ########### ########### ###################### ########### ########### ########### ###########
@app.get("/posts")
def posts_all():
    """Get all posts"""
    try:
        posts = Post.query.order_by(Post.created_at)
        # adding user data to each post
        posts_user = [dict(User.serialize(User.query.get(
            post.user_id)), **Post.serialize(post)) for post in posts]
        # `**` unpacks the two dicts and merges them into a single dictionary
        posts_user_data = [
            {
                'content': post['content'],
                'createdAt': post['created_at'],
                'firstName': post['first_name'],
                'lastName': post['last_name'],
                'id': post['id'],
                'imageUrl': post['image_url'],
                'title': post['title'],
                'userId': post['user_id'],
                'projectId': post['project_id'],
                'problem': post['problem'],
                'solution': post['solution']
            }
            for post in posts_user
        ]
        return posts_user_data
    except Exception as error:
        print("Lookup error", error)
        return jsonify({"error in posts_all =>": error})


@app.get("/users/<int:user_id>/posts")
def posts_all_user(user_id):
    """Get all user's posts"""
    try:
        posts = Post.query.filter(
            Post.user_id == user_id).order_by(Post.created_at)
        serialized = [Post.serialize(post) for post in posts]
        return jsonify(serialized)
    except LookupError as error:
        print('Lookup error >>>>>>>>>', error)
        return jsonify({"error": error})
    

@app.post("/users/<int:user_id>/posts/new")
@jwt_required()

def posts_add(user_id):
    """Adds new post"""
    try:
        title = request.json['title']
        content = request.json['content']
        problem = request.json['problem']
        solution = request.json['solution']
        post = Post(title=title, content=content, user_id=user_id,
                    problem=problem, solution=solution)

        db.session.add(post)
        db.session.commit()
        return redirect(f"/users/{user_id}/posts")
    except Exception as e:
        print("keyerror>>>>>>", e)
        return jsonify({"error": f"Missing {str(e)}"}), 401
    # refactor error handling so that any failed constraints trigger error

@app.get("/posts/<int:post_id>")
def posts_get(post_id):
    """Retrieves post"""
    try:
        post = Post.query.get_or_404(post_id)
        user = User.query.get_or_404(post.user_id)
        post_serialized = Post.serialize(post)
        user_serialized = User.serialize(user)
        # update() doesn't return new object. overwrites first object including data from both dicts
        user_serialized.update(post_serialized)
        user_data = {
            'content': user_serialized['content'],
            'createdAt': user_serialized['created_at'],
            'firstName': user_serialized['first_name'],
            'id': user_serialized['id'],
            'imageUrl': user_serialized['image_url'],
            'lastName': user_serialized['last_name'],
            'title': user_serialized['title'],
            'userId': user_serialized['user_id'],
            'problem': user_serialized['problem'],
            'solution': user_serialized['solution']
        }
        return jsonify(user_data)
    except LookupError as e:
        print("Lookup error", e)
        return jsonify({"error": e})


@app.get("/posts/<int:post_id>/edit")
def posts_edit(post_id):
    """Retrieves post data for update"""
    try:
        post = Post.query.get(post_id)
        serialized = Post.serialize(post)
        post_data = {'content': serialized['content'],
                     'createdAt': serialized['created_at'],
                     'id': serialized['id'],
                     'title': serialized['title'],
                     'userId': serialized['user_id'],
                     'problem': serialized['problem'],
                     'solution': serialized['solution']}
        return jsonify(post_data)
    except Exception as e:
        print("post_edit error =>", e)
        return jsonify({"error": f"Missing {str(e)}"})


@app.patch("/posts/<int:post_id>/edit")
@jwt_required()
def posts_update(post_id):
    """Updates post with new data"""

    jwt_email = get_jwt_identity()

    post = Post.serialize(
        Post.query.filter(Post.id == post_id).first())
    
    user = User.serialize(
        User.query.filter(User.id == post['user_id']).first())

    if user['email'] != jwt_email:
        return jsonify({"error": "Unauthorized access"}), 401
    try:
        post = Post.query.get_or_404(post_id)
        post.title = request.json['title']
        post.content = request.json['content']
        post.problem = request.json['problem']
        post.solution = request.json['solution']

        db.session.add(post)
        db.session.commit()

        return redirect(f"users/{post.user_id}/posts")
    except Exception as e:
        print("post_update error =>", e)
        return jsonify({"error": f"Missing {str(e)}"})


@app.delete("/posts/<int:post_id>/delete")
@jwt_required()
def posts_delete(post_id):
    """"Deletes post with corresponding id"""

    jwt_identity = get_jwt_identity()

    post = Post.serialize(Post.query.filter(Post.id == post_id).first())

    user = User.serialize(User.query.filter(User.id == post['user_id']).first())

    if user['email'] != jwt_identity:
        return jsonify({"error": "Unauthorize access"}), 401
    try:
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return redirect(f"/users/{post.user_id}/posts")
    except Exception as error:
        print(f"posts_delete error => {error}")
        return jsonify({"error": f"Missing {str(error)}"})

######### Project routes ########### ########### ########### ########### ###################### ########### ########### ########### ###########
@app.get("/projects/<int:project_id>/posts")
def project_get_posts(project_id):
    """Retrieves all post corresponding to project"""
    try:
        posts = Post.query.filter(Post.project_id==project_id)
        serialized = [Post.serialized(post) for post in posts]
        return jsonify(serialized)
    except Exception as e:
        print(f"Error in project_get_posts => {e}")
        return jsonify({"error": f"{str(e)}"})


@app.get("/projects/<int:project_id>")
def project_get(project_id):
    """Returns project corresponding to user"""
    try:
        project = Project.query.get_or_404(project_id)
        serialized = Project.serialize(project)
        project_data = {
            'id': serialized['id'],
            'name': serialized['name'],
            'description': serialized['description'],
            'userId': serialized['user_id'],
        }
        return jsonify(project_data)
    except Exception as e:
        print(f"Error in project_get => {e}")
        return jsonify({"error": f"{str(e)}"})

@app.get("/projects")
def projects_get_all():
    """Return all projects"""
    try:
        projects = Project.query.all()
        serialized = [Project.serialize(project) for project in projects]
        return jsonify(serialized)
    except Exception as e:
        print(f"Error in projects_get_all => {e}")
        return jsonify({"error": f"{str(e)}"})

@app.get("/users/<int:user_id>/projects")
def projects_get(user_id):
    """Retrieves all projects corresponding to user id"""
    try:
        projects = Project.query.filter(Project.user_id == user_id)
        serialized = [Project.serialize(project) for project in projects]
        print('>>>>>',serialized)
        return jsonify(serialized)
    except Exception as e:
        print('projects_get error =>', e)
        return jsonify({"error": f"{str(e)}"})


@app.post("/users/<int:user_id>/projects/new")
@jwt_required()
def projects_add(user_id):
    """Adds project corresponding to user"""

    jwt_email = get_jwt_identity()
    user_identity = User.serialize(
        User.query.filter(User.email == jwt_email).first())
    if user_identity['id'] != user_id:
        return jsonify({"error": "Unauthorized access"}), 401
    
    try:
        project = Project(
            name=request.json['name'],
            description=request.json['description'],
            user_id=user_id)
        db.session.add(project)
        db.session.commit()
        serialized = Project.serialize(project)
        return jsonify(serialized)
    except Exception as e:
        print('projects_add error =>', e)
        return jsonify({"error": f"Missing {str(e)}"}), 404
    

@app.post("/users/<int:user_id>/projects/<int:project_id>/posts/new")
@jwt_required()
def projects_posts_add(user_id, project_id):
    """Adds new posts corresponding to project"""

    jwt_email = get_jwt_identity()
    user_identity = User.serialize(User.query.filter(User.email == jwt_email).first())
    if user_identity['id'] != user_id:
        return jsonify({"error": "Unauthorized access"}), 401
    try:
        title = request.json['title']
        content = request.json['content']
        problem = request.json['problem']
        solution = request.json['solution']
        post = Post(title=title, content=content, user_id=user_id,
                    problem=problem, solution=solution, project_id=project_id)
        db.session.add(post)
        db.session.commit()
        posts = Post.query.filter(
            Post.user_id == user_id).order_by(Post.created_at)
        serialized = [Post.serialize(post) for post in posts]
        print('serialized', serialized)
        return jsonify(serialized)
    except Exception as e:
        print("keyerror>>>>>>", e)
        return jsonify({"error": f"Missing {str(e)}"}), 404


@app.get("/users/<int:user_id>/projects/<int:project_id>")
def projects_posts_get(user_id, project_id):
    try:
        posts = Post.query.filter(Post.project_id == project_id)
        serialized = [Post.serialize(post) for post in posts]
        return jsonify(serialized)
    except Exception as e:
        print('projects_posts_get error =>', e)
        return jsonify({"error": f"{str(e)}"})


@app.delete("/projects/<int:project_id>/delete")
@jwt_required()
def projects_delete(project_id):
    """Deletes project and all associate posts"""
    jwt_identity = get_jwt_identity()

    project = Project.serialize(Project.query.filter(Project.id == project_id).first())

    user = User.serialize(User.query.filter(
        User.id == project['user_id']).first())

    if user['email'] != jwt_identity:
        return jsonify({"error": "Unauthorize access"}), 401
    try:
        project = Project.query.get_or_404(project_id)
        posts = Post.query.filter(Post.project_id==project_id).all()
        for post in posts:
            db.session.delete(post)
            db.session.commit()
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message':'Project deleted'})
    except Exception as e:
        print('projects_delete error =>', e)
        return jsonify({"error": f"{str(e)}"})




# Error handling for missing or invalid JWT

# from flask_jwt_extended import jwt_required, JWTManager, get_jwt_identity

# app = Flask(__name__)
# jwt = JWTManager(app)

# @app.route('/protected')
# @jwt_required()
# def protected_route():
#     # Get the JWT identity
#     current_user = get_jwt_identity()
#     # Rest of your code...

# @app.errorhandler(Exception)
# def handle_jwt_errors(e):
#     if isinstance(e, JWTError):
#         # Handle JWT-related errors
#         response = {
#             'message': 'Invalid or missing token',
#             'error': str(e)
#         }
#         return jsonify(response), 401
#     else:
#         # Handle other exceptions
#         return 'Internal Server Error', 500


# try this out for error handling in the future

# @app.patch("/posts/<int:post_id>/edit")
# @jwt_required()
# def posts_update(post_id):
#     """Updates post with new data"""

#     try:
#         post = Post.query.get_or_404(post_id)
#         post.title = request.json['title']
#         post.content = request.json['content']
#         post.problem = request.json['problem']
#         post.solution = request.json['solution']

#         db.session.add(post)
#         db.session.commit()

#         return redirect(f"users/{post.user_id}/posts")
#     except JWTDecodeError as e:
#         print("JWTDecodeError:", e)
#         return jsonify({"error": "Invalid or expired token"}), 401
#     except Exception as e:
#         print("post_update error:", e)
#         return jsonify({"error": "An error occurred"}), 500

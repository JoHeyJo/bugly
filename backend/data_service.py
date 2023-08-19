from models import User, Post, Tech, Detail, ProjectTech
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

db = SQLAlchemy()

def combine_tech_and_detail(project_id):
    """Join data from two separate tables that don't reference each other"""
    detail_data = db.session.query(Detail).filter(Detail.project_id == project_id).all()
    tech_for_project = (db.session.query(Tech)
    .join(ProjectTech)
    .filter(ProjectTech.c.id == project_id)
    .all()
    )
    combined_data = {
        'details': [detail.serialize() for detail in detail_data],
        'techs': [tech.serialize() for tech in tech_for_project]
    }

    return jsonify(combined_data)

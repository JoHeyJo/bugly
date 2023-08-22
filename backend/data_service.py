from models import User, Post, Tech, Detail, ProjectTech, Project
from flask import jsonify
from app import db

def tech_and_detail(project_id):
    """Join data from two separate tables that don't reference each other"""
    detail_data = db.session.query(Detail.detail).filter(Detail.project_id == project_id).all()
    tech_data = db.session.query(Tech.tech).join(ProjectTech).join(Project).filter(Project.id == project_id).all()

    combined_data = {
        'details': [detail[0] for detail in detail_data],
        'tech': [tech[0] for tech in tech_data]
    }

    return jsonify(combined_data)

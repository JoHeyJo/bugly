from models import User, Post, Tech, Detail, ProjectTech, Project, Spec
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify


def tech_and_detail(db, project_id):
    """Join data from multiple tables that don't directly reference each other"""
    spec_data = db.session.query(Spec.spec).filter(Spec.project_id==project_id).all()
    detail_data = db.session.query(Detail.detail).filter(Detail.project_id==project_id).all()
    tech_data = db.session.query(Tech.tech, Tech.id).join(ProjectTech).join(Project).filter(Project.id==project_id).all()
    combined_data = {
        'details': [detail[0] for detail in detail_data],
        'spec': [spec[0] for spec in spec_data],
        'tech': [{'id': tech[1], 'tech': tech[0]} for tech in tech_data]
    }

    return jsonify(combined_data)

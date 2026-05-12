from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "school.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Model for Admission Form
class AdmissionForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.String(20), nullable=False)
    class_applying = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    address = db.Column(db.Text, nullable=False)
    parent_name = db.Column(db.String(100), nullable=False)
    parent_phone = db.Column(db.String(20), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<AdmissionForm {self.name}>'

# Create database tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/facilities')
def facilities():
    return render_template('facilities.html')

@app.route('/classes')
def classes():
    return render_template('classes.html')

@app.route('/fees')
def fees():
    return render_template('fees.html')

@app.route('/admission')
def admission():
    return render_template('admission.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/api/submit-admission', methods=['POST'])
def submit_admission():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'dateOfBirth', 'classApplying', 'phone', 'email', 'address', 'parentName', 'parentPhone']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'error': f'{field} is required'}), 400
        
        # Create new admission form submission
        admission_form = AdmissionForm(
            name=data['name'],
            date_of_birth=data['dateOfBirth'],
            class_applying=data['classApplying'],
            phone=data['phone'],
            email=data['email'],
            address=data['address'],
            parent_name=data['parentName'],
            parent_phone=data['parentPhone']
        )
        
        db.session.add(admission_form)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Admission form submitted successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/admissions', methods=['GET'])
def get_admissions():
    admissions = AdmissionForm.query.all()
    return jsonify([{
        'id': a.id,
        'name': a.name,
        'date_of_birth': a.date_of_birth,
        'class_applying': a.class_applying,
        'phone': a.phone,
        'email': a.email,
        'address': a.address,
        'parent_name': a.parent_name,
        'parent_phone': a.parent_phone,
        'submitted_at': a.submitted_at.strftime('%Y-%m-%d %H:%M:%S')
    } for a in admissions])

if __name__ == '__main__':
    app.run(debug=True, port=5000)

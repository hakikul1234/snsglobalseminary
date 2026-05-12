# Excellence Academy - School Website

A modern, fully-featured school website built with Flask and SQLite. This project includes a responsive design with multiple pages, an online admission form, and a database to manage student applications.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **7 Main Pages**:
  - Home - Welcome page with school highlights
  - About - School history, mission, vision, and leadership
  - Facilities - Detailed information about school amenities
  - Classes - Class structure and curriculum details
  - Fees - Fee structure and payment policies
  - Admission - Online admission form with validation
  - Contact - Contact information and inquiry form

- **Key Functionalities**:
  - Online admission form with validation
  - SQLite database for storing form submissions
  - Responsive navigation with mobile hamburger menu
  - Interactive elements and smooth animations
  - Professional color scheme (Blue, White, Golden-Yellow)
  - High-quality placeholder images
  - API endpoints for form submissions

## Tech Stack

- **Backend**: Python Flask
- **Database**: SQLite
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with responsive design
- **Form Handling**: Client-side validation + Server-side validation

## Project Structure

```
excellence-academy/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css              # Main stylesheet
│   ├── js/
│   │   └── script.js              # JavaScript for interactivity
│   └── images/
│       ├── school.jpg             # School building image
│       ├── classroom.jpg          # Classroom image
│       ├── library.jpg            # Library image
│       ├── computer-lab.jpg       # Computer lab image
│       ├── science-lab.jpg        # Science lab image
│       ├── sports.jpg             # Sports complex image
│       └── auditorium.jpg         # Auditorium image
└── templates/
    ├── base.html                  # Base template (header, footer, nav)
    ├── index.html                 # Home page
    ├── about.html                 # About page
    ├── facilities.html            # Facilities page
    ├── classes.html               # Classes page
    ├── fees.html                  # Fees page
    ├── admission.html             # Admission page with form
    └── contact.html               # Contact page
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- A terminal/command prompt

### Step-by-Step Setup

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd excellence-academy

   # If downloaded as zip, extract and navigate to the folder
   cd excellence-academy
   ```

2. **Create a Virtual Environment** (Recommended)
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**
   ```bash
   python app.py
   ```

5. **Access the Website**
   - Open your web browser
   - Navigate to `http://localhost:5000`
   - You should see the Excellence Academy homepage

## Usage

### Browsing the Website
- Use the navigation menu to explore different sections
- On mobile devices, click the hamburger menu (☰) to toggle navigation
- Click "Apply Now" or go to the Admission page to submit an application

### Submitting an Admission Form
1. Go to the **Admission** page
2. Fill in all required fields (marked with *)
3. The form validates input in real-time
4. Click "Submit Application" to submit
5. Upon successful submission, a confirmation message appears
6. The data is saved to the database

### Accessing Submitted Forms
The application data is stored in `school.db` (SQLite database). To view submissions:

1. **Using Python REPL** (Advanced)
   ```python
   from app import app, AdmissionForm, db
   
   with app.app_context():
       submissions = AdmissionForm.query.all()
       for form in submissions:
           print(f"Name: {form.name}, Class: {form.class_applying}")
   ```

2. **Using the API Endpoint**
   ```bash
   # Make a GET request to see all submissions
   curl http://localhost:5000/api/admissions
   ```

## Customization

### Changing School Information
Edit the following files to customize information:
- **School Name**: Change in `templates/base.html` (logo section)
- **Contact Details**: Update in `templates/contact.html`
- **Fees Structure**: Modify the table in `templates/fees.html`
- **Classes Offered**: Edit in `templates/classes.html`

### Modifying Colors
The color scheme is defined in `static/css/style.css`:
```css
:root {
  --primary-blue: #1e3a8a;      /* Main blue */
  --light-blue: #3b82f6;        /* Light blue */
  --golden: #fbbf24;            /* Golden-yellow */
  --white: #ffffff;             /* White */
  --light-gray: #f3f4f6;       /* Light gray */
  --dark-gray: #4b5563;        /* Dark gray */
  --text-dark: #1f2937;        /* Text color */
}
```

### Replacing Images
Replace image files in `static/images/` with your own images:
- Keep the same filenames
- Supported formats: JPG, PNG, WebP
- Recommended dimensions:
  - Facility cards: 400x300px
  - Full-width images: 1200x400px

### Adding New Pages
1. Create a new HTML file in `templates/`
2. Use the base template: `{% extends "base.html" %}`
3. Add a route in `app.py`:
   ```python
   @app.route('/newpage')
   def newpage():
       return render_template('newpage.html')
   ```
4. Update navigation in `templates/base.html`

## API Endpoints

### Admission Form Submission
- **URL**: `/api/submit-admission`
- **Method**: POST
- **Content-Type**: application/json
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "dateOfBirth": "2010-05-15",
    "classApplying": "grade5",
    "phone": "+91-9876543210",
    "email": "john@example.com",
    "address": "123 Main Street",
    "parentName": "Jane Doe",
    "parentPhone": "+91-9876543211"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Admission form submitted successfully!"
  }
  ```

### Get All Submissions
- **URL**: `/api/admissions`
- **Method**: GET
- **Response**: JSON array of all submissions

## Form Validation

### Client-Side Validation
- All required fields must be filled
- Email validation for email format
- Phone validation for valid phone numbers
- Real-time error messages as user types

### Server-Side Validation
- All fields are validated on the server
- Phone numbers are checked for valid format
- Email addresses are verified
- Data integrity is maintained

## Troubleshooting

### Port Already in Use
If port 5000 is already in use:
```python
# Edit the last line in app.py
app.run(debug=True, port=5001)  # Use a different port like 5001
```

### Database Errors
If you encounter database errors:
```bash
# Delete the existing database
rm school.db

# Run the app again (it will create a new database)
python app.py
```

### Static Files Not Loading
- Ensure the `static/` folder structure is correct
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check that Flask is serving files correctly

### Form Not Submitting
- Open browser console (F12) to check for JavaScript errors
- Verify all required fields are filled
- Check that Flask is running without errors
- Ensure JSON data is formatted correctly

## Performance Optimization

### For Production Deployment
1. Disable debug mode:
   ```python
   app.run(debug=False)
   ```

2. Use a production WSGI server (Gunicorn):
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```

3. Add a database backup system
4. Implement rate limiting for API endpoints
5. Add HTTPS/SSL certificate

## Database Backup

To backup your admission data:
```bash
# Simple copy of database file
cp school.db school_backup.db

# Or export to CSV using Python
python -c "
from app import app, AdmissionForm, db
import csv

with app.app_context():
    with open('admissions.csv', 'w') as f:
        writer = csv.writer(f)
        writer.writerow(['Name', 'DOB', 'Class', 'Phone', 'Email', 'Address', 'Parent Name', 'Parent Phone', 'Date'])
        for form in AdmissionForm.query.all():
            writer.writerow([form.name, form.date_of_birth, form.class_applying, form.phone, form.email, form.address, form.parent_name, form.parent_phone, form.submitted_at])
"
```

## Future Enhancements

Potential features to add:
- [ ] User login system for parents
- [ ] Student grades and progress portal
- [ ] Event calendar
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Photo gallery
- [ ] News and announcements
- [ ] Alumni portal
- [ ] API authentication

## License

This project is created for educational purposes. Feel free to use and modify it for your school.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the code comments
3. Check Flask documentation: https://flask.palletsprojects.com/
4. Check SQLAlchemy documentation: https://docs.sqlalchemy.org/

---

**Built with ❤️ for Excellence Academy**

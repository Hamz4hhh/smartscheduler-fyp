import pymysql
import random
import xml.etree.ElementTree as ET

# DB config
db_config = {
    "host": "localhost",
    "user": "root",           # or your MySQL username
    "password": "",           # your MySQL password
    "database": "unitime_db"
}

conn = pymysql.connect(**db_config)
cursor = conn.cursor(pymysql.cursors.DictCursor)

# Fetch data
cursor.execute("SELECT * FROM courses")
courses = cursor.fetchall()

cursor.execute("SELECT * FROM instructors")
instructors = cursor.fetchall()

cursor.execute("SELECT * FROM rooms")
rooms = cursor.fetchall()

cursor.execute("SELECT * FROM slots")
slots = cursor.fetchall()

# XML root
timetable = ET.Element("timetable", campus="main", year="2025", term="1")

# ✅ Add buildings block first
buildings_el = ET.SubElement(timetable, "buildings")
ET.SubElement(buildings_el, "building", {
    "id": "18",
    "abbreviation": "M",
    "name": "Main Building"
})

# Rooms
rooms_el = ET.SubElement(timetable, "rooms")
for r in rooms:
    building_id = r.get("building_id")
    if not building_id or str(building_id).strip() == "":
        building_id = 18  # default fallback

    ET.SubElement(rooms_el, "room", {
        "id": str(r["id"]),
        "name": r["name"] or f"Room{r['id']}",
        "building": str(building_id),
        "roomNumber": r["room_number"],
        "capacity": str(r["capacity"]),
        "type": r["room_type"]
    })

# Instructors
instructors_el = ET.SubElement(timetable, "instructors")
for i in instructors:
    full_name = f"{i['first_name'] or ''} {i['last_name'] or ''}".strip()
    ET.SubElement(instructors_el, "instructor", {
        "id": str(i["id"]),
        "name": full_name or f"Instructor{i['id']}"
    })

# Courses
courses_el = ET.SubElement(timetable, "courses")
for c in courses:
    ET.SubElement(courses_el, "course", {
        "id": str(c["id"]),
        "subject": f"Dept{c['dept_id']}",
        "courseNbr": c["course_code"],
        "name": c["course_name"],
        "limit": str(c["credit_hours"] * 10)
    })

# Classes (randomly assigned)
classes_el = ET.SubElement(timetable, "classes")
for c in courses:
    instructor = random.choice(instructors)
    room = random.choice(rooms)
    slot = random.choice(slots)

    ET.SubElement(classes_el, "class", {
        "id": f"class-{c['id']}",
        "course": str(c["id"]),
        "instructor": str(instructor["id"]),
        "room": str(room["id"]),
        "time": slot["name"]
    })

# Save and print
xml_string = ET.tostring(timetable, encoding="unicode")
print(xml_string)

with open("data/timetable.xml", "w", encoding="utf-8") as f:
    f.write(xml_string)

cursor.close()
conn.close()
print("✅ timetable.xml generated successfully.")

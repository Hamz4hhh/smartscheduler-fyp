# routes/solve.py
from fastapi import APIRouter
from subprocess import run, PIPE
import os

router = APIRouter()

@router.post("/solve-timetable")
def solve_timetable():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(base_dir, ".."))

    # JAR paths
    lib_dir = os.path.join(root_dir, "libs")
    jar_files = [
        "cpsolver-all-1.4.jar",
        "log4j-core-2.20.0.jar",
        "log4j-api-2.20.0.jar",
        "dom4j-2.1.4.jar"
    ]
    # Windows uses semicolon for classpath separator
    classpath = ";".join([os.path.join(lib_dir, jar) for jar in jar_files])

    # Solver files
    props = os.path.join(root_dir, "data", "timetable.properties")
    xml = os.path.join(root_dir, "data", "timetable.xml")

    # Run command
    cmd = [
        "java",
        "-Xmx2g",
        "-cp",
        classpath,
        "org.cpsolver.coursett.Test",
        props,
        xml
    ]

    result = run(cmd, stdout=PIPE, stderr=PIPE, text=True)

    if result.returncode != 0:
        return {"error": result.stderr}

    return {"output": result.stdout}

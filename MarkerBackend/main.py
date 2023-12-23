from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm.exc import UnmappedInstanceError
from model.database import DBSession
from model import models
from schemas import MarkInput
import socketio


@asynccontextmanager
async def lifespan(app: FastAPI):
    sio.disconnect()

app = FastAPI(lifespan=lifespan)
sio = socketio.SimpleClient()
sio.connect('http://localhost:5000')


origins = [
    "http://localhost:5173" # or add your own front-end's domain name
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/markobjs")
def read_markobjs():
    db = DBSession()
    try:
        markobjs = db.query(models.Note).all()
    finally:
        db.close()
    return markobjs

@app.post("/markobj")
def add_markobj(markobj: MarkInput):
    db = DBSession()
    try:
        if len(markobj.title) == 0 or len(markobj.markobj_body) == 0:
            raise HTTPException(
                status_code=400, detail={
                    "status": "Error 400 - Bad Request",
                    "msg": "The Markobj's 'title' or 'markobj-body' can't be empty."
                })
        new_markobj = models.Markobj(
            title=markobj.title, markobj_body=markobj.markobj_body
        )
        db.add(new_markobj)
        db.commit()
        db.refresh(new_markobj)
    finally:
        db.close()
    return new_markobj

@app.post("/mark/{markobj_id}")
def mark_markobj(markobj_id: int):
    db = DBSession()
    try:
        markobj = db.query(models.MarkObj).filter(models.MarkObj.id == markobj_id).first()
    finally:
        db.close()
    sio.emit('mark message', {'msg' : markobj.markobj_body})


@app.put("/markobj/{markobj_id}")
def update_markobj(markobj_id: int, updated_markobj: MarkInput):
    if len(updated_markobj.title) == 0 or len(updated_markobj.markobj_body) == 0:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": "The Markobj's 'title' or 'markobj-body' can't be empty."
        })
    db = DBSession()
    try:
        markobj = db.query(models.Markobj).filter(models.Markobj.id == markobj_id).first()
        markobj.title = updated_markobj.title
        markobj.markobj_body = updated_markobj.markobj_body
        db.commit()
        db.refresh(markobj)
    finally:
        db.close()
    return markobj

@app.delete("/markobj/{markobj_id}")
def delete_markobj(markobj_id: int):
    db = DBSession()
    try:
        markobj = db.query(models.MarkObj).filter(models.MarkObj.id == markobj_id).first()
        db.delete(markobj)
        db.commit()
    except UnmappedInstanceError:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": f"Markobj with 'id': '{markobj_id} doesn't exist."
        })
    finally:
        db.close()
    return {
        "status": "200",
        "msg": "Markobj deleted successfully"
    }



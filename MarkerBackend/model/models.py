from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Markobj(Base):

    __tablename__ = "markobjs"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    markobj_body = Column(String)

    def __repr__(self):
        return f'MarkObj(id={self.id}, title={self.title}, markobj_body={self.markobj_body})'
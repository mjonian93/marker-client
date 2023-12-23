from pydantic import BaseModel


class MarkInput(BaseModel):
    title: str = ''
    markobj_body: str = ''
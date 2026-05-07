from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True, nullable=True)
    nickname = Column(String, nullable=True)
    role = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    streak = Column(Integer, default=0)
    last_streak_date = Column(String, nullable=True)

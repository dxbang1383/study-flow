from pydantic import BaseModel, field_validator
from typing import Optional
import re

class UserCreate(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    nickname: Optional[str] = None
    role: Optional[str] = None

    @field_validator('username')
    @classmethod
    def username_length(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return v

    @field_validator('password')
    @classmethod
    def password_complexity(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one number')
        if not re.search(r'[@$!%*?&]', v):
            raise ValueError('Password must contain at least one special character (@$!%*?&)')
        return v

    @field_validator('email')
    @classmethod
    def email_format(cls, v):
        if v is not None and v.strip() != "":
            if not re.match(r'^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$', v):
                raise ValueError('Invalid email format')
        return v

class UserUpdate(BaseModel):
    email: Optional[str] = None
    nickname: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None
    avatar: Optional[str] = None
    streak: Optional[int] = None
    last_streak_date: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    nickname: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None
    streak: int = 0
    last_streak_date: Optional[str] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

from sqlalchemy.orm import Session

from app.models.user import User
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.repositories.user_repository import UserRepository
from app.schemas.auth import RegisterRequest, LoginRequest

class AuthService:

    def __init__(self):
        self.user_repository = UserRepository()

    def register_user(
            self,
            db: Session,
            request: RegisterRequest,
    ):
        # Register a new user

        existing_user = self.user_repository.get_by_email(
            db, 
            request.email,
        )

        if existing_user:
            raise ValueError("Email already registered")

        user = User(
            email=request.email,
            hashed_password=hash_password(request.password),
            full_name=request.full_name,
        )

        return self.user_repository.create(
            db,
            user,
        )

    def login(
            self,
            db: Session,
            request: LoginRequest,
    ):
        # Authenticate user and return access token

        user = self.user_repository.get_by_email(
            db, 
            request.email,
        )

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(request.password, user.hashed_password):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {
                'sub': user.email,
            }
        )

        return token
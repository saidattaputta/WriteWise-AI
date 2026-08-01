from app.core.config import settings

def get_app_info():
    return {
        "app_name": settings.APP_NAME,
        "app_version": settings.APP_VERSION,
        "app_description": settings.APP_DESCRIPTION,
    }


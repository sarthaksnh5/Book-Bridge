from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, full_name, mobile_number, password=None):
        """Create and save a user with the given email, and password."""
        if not email:
            raise ValueError("Users must have an email address")

        if not full_name:
            raise ValueError("Full name is required")

        if not mobile_number:
            raise ValueError("Mobile number is required")

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
            mobile_number=mobile_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password, full_name, mobile_number):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            full_name=full_name,
            mobile_number=mobile_number,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, full_name, mobile_number):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            full_name=full_name,
            mobile_number=mobile_number,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


user_type_choices= (
    ('Admin', 'Admin'),
    ('Teacher', 'Teacher'),
    ('Student', 'Student')
)

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email_address", unique=True, max_length=255)
    full_name = models.CharField(max_length=60)
    mobile_number = models.CharField(max_length=10)
    user_type = models.CharField(max_length=255, choices=user_type_choices)

    is_online = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "mobile_number"]

    objects = UserManager()

    def get_username(self) -> str:
        return self.full_name

    def get_full_name(self):
        return self.full_name

    def __str__(self) -> str:
        return self.full_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @staticmethod
    def set_user_online(user, status):
        user.is_online = status
        user.save()

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

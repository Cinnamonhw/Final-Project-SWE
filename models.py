from collections import UserList
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Users(db.Model):
    """User table to handle the user logins"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    is_active = db.Column(db.Boolean)
    is_authenticated = db.Column(db.Boolean)

    def get_id(self):
        """get user id"""
        return self.id

    def signin(uname, pwd):
        """Adding a new user to the User database"""
        user = Users.query.filter_by(username=uname).first()
        if not user:
            return 1
        elif not check_password_hash(user.password, pwd):
            return 2
        else:
            return user

    def signup(uname, pwd):
        """Adding a new user to the User database"""
        new_user = Users(
            username=uname,
            password=generate_password_hash(pwd, method="sha256"),
            is_active=True,
            is_authenticated=True,
        )
        db.session.add(new_user)
        db.session.commit()

    def get_username(user_id):
        """Returns the username for a given user_id"""
        user = Users.query.filter_by(id=user_id).first()
        if not user:
            return "anonymous"
        else:
            return user.username


class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    # profile_pic = db.Column(db.BLOB)

    def updateUserProfile(user_id, email, first_name, last_name, profile_pic):
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            return "Profile Not Found"
        else:
            if email != "":
                profile.email = email
            if first_name != "":
                profile.first_name = first_name
            if last_name != "":
                profile.last_name = last_name
            # if profile_pic is not None:
            #     profile.profile_pic = profile_pic
            db.session.commit()
            return "Profile Successfully Updated"

    def getUserProfile(user_id):
        userProfile = UserProfile.query.filter_by(user_id=user_id).first()
        if not userProfile:
            return "Profile Not Found"
        else:
            return userProfile


class Lists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    list_name = db.Column(db.String(100), nullable=False)
    media_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))

    def addList(user_id, list_name, media_type, description):
        new_list = Lists(
            user_id=user_id,
            list_name=list_name,
            media_type=media_type,
            description=description,
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.id

    def editList(id, list_name, description):
        list = Lists.query.filter_by(id=id).first()
        if not list:
            return "List Not Found"
        else:
            if list_name != "":
                list.list_name = list_name
            if description != "":
                list.description = description
            db.session.commit()
            return "List Updated"

    def deleteList(id):
        Lists.query.filter_by(id=id).delete()
        db.session.commit()

    def getUserLists(user_id):
        lists = db.session.query(Lists).filter_by(user_id=user_id).all()
        if not lists:
            return []
        else:
            my_lists = []
            for list in lists:
                id = list.id
                user_id = list.user_id
                list_name = list.list_name
                media_type = list.media_type
                description = list.description
                list_content = ListItems.getListItems(id)
                my_lists.append(
                    {
                        "id": id,
                        "user_id": user_id,
                        "list_name": list_name,
                        "media_type": media_type,
                        "description": description,
                        "list_content": list_content,
                    }
                )

            return my_lists


class ListItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, nullable=False)
    media_id = db.Column(
        db.String(50), nullable=False
    )  # may need to change to string depending on IDs given by API
    rating = db.Column(db.Integer)

    def addListItem(list_id, media_id):
        listItem = ListItems.query.filter_by(list_id=list_id, media_id=media_id).first()
        if not listItem:
            newListItem = ListItems(list_id=list_id, media_id=media_id)
            db.session.add(newListItem)
            db.session.commit()
            return newListItem.id
        else:
            return -1

    def deleteListItem(id):
        ListItems.query.filter_by(id=id).delete()
        db.session.commit()

    def getListItems(id):
        items = ListItems.query.filter_by(list_id=id).all()
        list_items = []
        for item in items:
            id = item.id
            list_id = item.list_id
            media_id = item.media_id
            list_items.append(
                {
                    "id": id,
                    "list_id": list_id,
                    "media_id": media_id,
                }
            )

        return list_items


class ListSharedWith(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, nullable=False)
    # Only user_id OR email need to be populated
    user_id = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def addSharedWith(list_id, user_id, email):
        if user_id != "":
            shared = ListSharedWith.query.filter_by(
                list_id=list_id, user_id=user_id
            ).first()
            if not shared:
                newShared = ListSharedWith(list_id=list_id, user_id=user_id, email="")
                db.session.add(newShared)
            else:
                return "List already shared with user"
        else:
            shared = ListSharedWith.query.filter_by(
                list_id=list_id, email=email
            ).first()
            if not shared:
                newShared = ListSharedWith(list_id=list_id, user_id="", email=email)
                db.session.add(newShared)
            else:
                return "List already shared with email"

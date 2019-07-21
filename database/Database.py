import pymysql


class Database:

    def __init__(self):
        host = "127.0.0.1"
        user = "root"
        password = "password"
        db = "chat"

        self.con = pymysql.connect(host=host, user=user, password=password, db=db,
                                   cursorclass=pymysql.cursors.DictCursor)

    def get_user(self, username, password=None):
        if not password:
            with self.con.cursor() as cursor:
                sql = "SELECT * FROM `user` WHERE `username` = %s"
                cursor.execute(sql, username)
                result = cursor.fetchone()
            return result
        else:
            with self.con.cursor() as cursor:
                sql = "SELECT * FROM `user` WHERE `username` = %s AND `password` = %s"
                cursor.execute(sql, (username, password))
                result = cursor.fetchone()
            return result

    def get_users(self):
        with self.con.cursor() as cursor:
            sql = "SELECT * FROM `user`"
            cursor.execute(sql)
            result = cursor.fetchall()
        return result

    def get_user_particp(self, username_id):
        with self.con.cursor() as cursor:
            sql = "SELECT * FROM `participants` WHERE `user_id` = %s"
            cursor.execute(sql, username_id)
            participants = cursor.fetchall()
        return participants

    def get_user_rooms(self, username_id):
        participants = self.get_user_particp(username_id)
        rooms = []
        for room in participants:
            with self.con.cursor() as cursor:
                sql = "SELECT * FROM `room` WHERE `id` = %s"
                cursor.execute(sql, room['room_id'])
                _room = cursor.fetchone()
                if _room:
                    rooms.append(_room)

        return rooms

    def get_user_messages(self, room_id):
        with self.con.cursor() as cursor:
            sql = 'SELECT * FROM `message` WHERE `room_id` = %s'
            cursor.execute(sql, room_id)
            messages = cursor.fetchall()
        return messages

    def add_user(self, username, password):
        with self.con.cursor() as cursor:
            sql = "INSERT INTO  `user` (`username`, `password`) VALUES (%s, %s)"
            cursor.execute(sql, (username, password))
        self.con.commit()

    def add_room(self, name):
        with self.con.cursor() as cursor:
            sql = "INSERT INTO `room` (`name`) VALUE (%s)"
            cursor.execute(sql, name)
            room_id = cursor.lastrowid
        self.con.commit()
        return room_id

    def delete_room(self, room_id):
        with self.con.cursor() as cursor:
            sql = "DELETE FROM `participants` WHERE `room_id` = %s"
            cursor.execute(sql, room_id)
            sql = "DELETE FROM `room` WHERE `id` = %s"
            cursor.execute(sql, room_id)
        self.con.commit()

    def add_participant(self, room_id, username_id):
        with self.con.cursor() as cursor:
            sql = "INSERT INTO `participants` (`room_id`, `user_id`) VALUE (%s, %s)"
            cursor.execute(sql, (room_id, username_id))
        self.con.commit()

    def remove_participant(self, room_id, username_id):
        with self.con.cursor() as cursor:
            sql = "DELETE FROM `participants` WHERE `room_id` = %s and `user_id` = %s"
            cursor.execute(sql, (room_id, username_id))
        self.con.commit()

    def send_message(self, room_id, username_id, message):
        with self.con.cursor() as cursor:
            sql = "INSERT INTO `message` (`room_id`, `user_id`, `message`) VALUE (%s, %s, %s)"
            cursor.execute(sql, (room_id, username_id, message))
        self.con.commit()

import pymysql


class Database:
    def __init__(self):
        host = "127.0.0.1"
        user = "root"
        password = "password"
        db = "test"

        self.con = pymysql.connect(host=host, user=user, password=password, db=db,
                                   cursorclass=pymysql.cursors.DictCursor)

    def list_user(self):
        with self.con.cursor() as cursor:
            sql = "SELECT * FROM `user`"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result

    def add_user(self, name, password):
        with self.con.cursor() as cursor:
            sql = "INSERT INTO `user` (`name`, `password`) VALUES (%s, %s)"
            cursor.execute(sql, (name, password))
            self.con.commit()

import psycopg2
from sqlalchemy import create_engine


# def create_table(table_name, dbname, user, pwd="pass"):
#     """ Connect to the PostgreSQL database server """
#     conn = None
#     create_command = (
#         """
#         CREATE TABLE """ + table_name + """ (
#             title VARCHAR(255) NOT NULL,
#             type VARCHAR(255) NOT NULL,
#             PRIMARY KEY (type),
#             position INTEGER NOT NULL
#         )
#         """)
    
#     data = [("bank-draft", "Bank Draft", 0), 
#     ("bill-of-lading", "Bill of Lading", 1 ), 
#     ("invoice", "Invoice", 2), 
#     ("bank-draft-2", "Bank Draft 2", 3), 
#     ("bill-of-lading-2", "Bill of Lading 2", 4)]

#     insert = "INSERT INTO " + table_name + "(title, type, position) VALUES(%s, %s, %s)"

#     try:
#         # connect to the PostgreSQL server
#         print('Connecting to the PostgreSQL database...')
#         conn = psycopg2.connect(database=dbname, user=user, password=pwd, host="localhost", port=5432)
		
#         # create a cursor
#         cur = conn.cursor()

#         cur.execute("select exists(select * from information_schema.tables where table_name=%s)", (table_name,))

#         if not cur.fetchone()[0]:
#             print("Creating table...")
#             cur.execute(create_command)
#         else:
#             print("Table already exists...")

#         # delete all existing entries
#         cur.execute("DELETE FROM " + table_name + ";")

#         # execute the INSERT statement
#         cur.executemany(insert, data)

#         # cur.execute("SELECT * from " + table_name + ";")

#         # # Fetch all rows from database
#         # record = cur.fetchall()

#         # print("Data from table:- ", record)
# 	    # close the communication with the PostgreSQL
#         cur.close()

#         conn.commit()
#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)
#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed.')



# def fetch_all(table_name, dbname, user, pwd=""):
#     conn = None

#     try:
#         # connect to the PostgreSQL server
#         print('Connecting to the PostgreSQL database...')
#         conn = psycopg2.connect(database=dbname, user=user, password=pwd, host="localhost", port=5432)
		
#         # create a cursor
#         cur = conn.cursor()

#         cur.execute("SELECT * from " + table_name + ";")

#         # Fetch all rows from database
#         records = cur.fetchall()

#         print("Data from table:- ", records)
# 	    # close the communication with the PostgreSQL
#         cur.close()

#         return records

#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)
#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed.')


# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy import create_engine, Sequence
# from sqlalchemy import String, Integer, Float, Boolean, Column
# from sqlalchemy.orm import sessionmaker

# Base = declarative_base()

# class Cards(db.Model):
#     __tablename__ = 'Cards'
#     type = db.Column(db.String, primary_key=True)
#     title = db.Column(db.String, nullable=False)
#     position = db.Column(db.Integer, nullable=False)

#     def __repr__(self):
#         return '<Card %r>' % (self.title)


# db_string = 'postgres://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
# engine = create_engine(db_string)
# Session = sessionmaker(bind=engine)
# session = Session()

# for class_instance in session.query(Cards).all():
#     print(vars(class_instance))

# session.close()

def connect(db_name, db_user, db_pass, db_host, db_port, table_name):
    # Connecto to the database
    db_string = 'postgres://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
    db = create_engine(db_string)

    data = [("bank-draft", "Bank Draft", 0), 
    ("bill-of-lading", "Bill of Lading", 1 ), 
    ("invoice", "Invoice", 2), 
    ("bank-draft-2", "Bank Draft 2", 3), 
    ("bill-of-lading-2", "Bill of Lading 2", 4)]

    db.execute("DELETE FROM " + table_name + ";")
    insert = "INSERT INTO " + table_name + "(title, type, position) VALUES(%s, %s, %s)"
    db.execute(insert, data)

# def get_all():
#     users = Cards.query.all()

#     for user in users:
#         print(user.username)
#         print(user.reg_date)
#         print(f"<id={user.id}, username={user.username}>")

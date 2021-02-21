import uvicorn
import psycopg2

from starlette.applications import Starlette
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

def create_table(dbname, user, pwd=""):
    """ Connect to the PostgreSQL database server """
    conn = None
    create_command = (
        """
        CREATE TABLE mytable (
            title VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            PRIMARY KEY (type),
            position INTEGER NOT NULL
        )
        """)
    
    data = [("bank-draft", "Bank Draft", 0), 
    ("bill-of-lading", "Bill of Lading", 1 ), 
    ("invoice", "Invoice", 2), 
    ("bank-draft-2", "Bank Draft 2", 3), 
    ("bill-of-lading-2", "Bill of Lading 2", 4)]

    insert = "INSERT INTO mytable(title, type, position) VALUES(%s, %s, %s)"

    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(database=dbname, user=user, password=pwd, host="localhost", port=5432)
		
        # create a cursor
        cur = conn.cursor()

        cur.execute("select exists(select * from information_schema.tables where table_name=%s)", ('mytable',))

        if not cur.fetchone()[0]:
            print("Creating table...")
            cur.execute(create_command)
        else:
            print("Table already exists...")

        # delete all existing entries
        cur.execute("DELETE FROM mytable;")

        # execute the INSERT statement
        cur.executemany(insert, data)

        cur.execute("SELECT * from mytable;")

        # Fetch all rows from database
        record = cur.fetchall()

        print("Data from table:- ", record)
	    # close the communication with the PostgreSQL
        cur.close()

        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

create_table(dbname="db-react", user="andreibadoi")

app = Starlette()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"]
)


@app.route("/")
class Hello(HTTPEndpoint):
    def get(self, request):
        msg = f"Hello Andrei from backend!"
        return JSONResponse({"message": msg}, status_code=200)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
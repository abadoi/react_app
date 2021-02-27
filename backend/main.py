import uvicorn
import psycopg2
import asyncio
import sqlalchemy
from databases import Database

from starlette.applications import Starlette
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route

#TODO: 
db_name='db-react'
db_user='andreibadoi'
db_pass='pass'
db_host='db'
db_port='5432'
db_string = 'postgres://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)

DATABASE_URL = db_string 

# Database table definitions.
metadata = sqlalchemy.MetaData()

cards = sqlalchemy.Table(
    "cards",
    metadata,
    sqlalchemy.Column("type", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("title", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("position", sqlalchemy.Integer, primary_key=True, nullable=False),
)

database = Database(DATABASE_URL)

async def insert_many():
    data = [{"type": "bank-draft", "title" : "Bank Draft", "position": 0}, 
    {"type": "bill-of-lading", "title" : "Bill of Lading", "position": 1}, 
    {"type": "invoice", "title" : "Invoice", "position": 2},  
    {"type": "bank-draft-2", "title" : "Bank Draft 2", "position": 3}, 
    {"type": "bill-of-lading-2", "title" : "Bill of Lading 2", "position": 4}, 
    ]
    insert = "INSERT INTO cards(title, type, position) VALUES (:title, :type, :position)"
    await database.execute_many(query=insert, values=data)


def homepage(request):
    msg = f"Hello Andrei from backend!"
    return JSONResponse({"message": msg}, status_code=200)

async def list_cards(request):
    query = cards.select()
    results = await database.fetch_all(query)
    content = [
        {
            "title": result["title"],
            "type": result["type"],
            "position": result["position"]
        }
        for result in results
    ]
    print(content)
    return JSONResponse({"cards": content}, status_code=200)

routes = [
    Route("/", endpoint=homepage),
    Route("/get", endpoint=list_cards, methods=["GET"]),
]

app = Starlette(
    routes=routes,
    on_startup=[database.connect, insert_many],
    on_shutdown=[database.disconnect])
    
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"]
)


if __name__ == "__main__":
    print('Hello. Application started')
    # connect(db_name='db-react', db_user='andreibadoi', db_pass='pass', db_host='db', db_port='5432', table_name='cards')
    # create_table(table_name= "cards", dbname="db-react", user="andreibadoi")
    uvicorn.run(app, host="0.0.0.0", port=8000)
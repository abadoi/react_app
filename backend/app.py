import uvicorn
import psycopg2
import asyncio

from starlette.applications import Starlette
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from dbservice import create_table, fetch_all

create_table(table_name= "mytable", dbname="db-react", user="andreibadoi")

app = Starlette()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"]
)

@app.route("/")
def homepage(request):
    msg = f"Hello Andrei from backend!"
    return JSONResponse({"message": msg}, status_code=200)

@app.route("/get")
def get(request):
    # data_req = request.json()
    cards = fetch_all(table_name= "mytable", dbname="db-react", user="andreibadoi")
    print (cards)
    return JSONResponse({"cards": cards}, status_code=200)

# @app.route("/")
# class Hello(HTTPEndpoint):
#     def get(self, request):
#         msg = f"Hello Andrei from backend!"
#         return JSONResponse({"message": msg}, status_code=200)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
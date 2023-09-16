'''
links 

treat varicose veins
https://youtu.be/va2Z-oTPFP0?si=FlbMzZWGOTkvS8Yb

power of amla
https://youtu.be/emgPiNk3Ctg?si=uPvjDTC1q6KrplyZ

turmeric: natural antibiotic
https://youtu.be/K1EbMbXpjs0?si=JFVnpusWA0hWVbte

ayurvedic diet for balencing doshas
https://youtu.be/_sZkqnW71Jg?si=O7GL3Vm_n0kHxaA8
'''

import sqlite3
class db:
    def connect_db():
        connection= sqlite3.connect('mydb.db')
        try:
            with open('schema.sql') as f:
                print('schema found!')
                connection.executescript(f.read())
        except Exception:
            print("creating permanant database without table schema")
        connection.execute('PRAGMA foreign_keys = ON')
        # problem with foreign keys is that the python version is 3.10.someti=hing and foreign keys need 3.11 or later
        # TL;DR you cannot have foreign key support until you upgrade to py3.11
        connection.commit()
        connection.close()

    def connect_mem():    
        cx=sqlite3.connect(":memory:")
        try:
            with open('temp_schema.sql') as f:
                print('schema found!')
                cx.executescript(f.read())
        except Exception:
            print("creating memory database without table schema")
        cx.execute('PRAGMA foreign_keys = ON')
        cx.commit()
        cx.close()

    def get_db_connection(location):
        if location == 'db':
            conn = sqlite3.connect('mydb.db')
            conn.row_factory = sqlite3.Row
            return conn
        elif location == 'mem':
            conn = sqlite3.connect(':memory:')
            return conn

    def ret(list,row):
        return list[row-1]    
    # the ret function used here will take the list and index number and return individual dictionary     

    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d
# dict factory takes the sql row obj and turns it into dictionary
# multiple rows make a list of dictonaries
# https://stackoverflow.com/questions/3300464/how-can-i-get-dict-from-sqlite-query

db.connect_db()

 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

db.create_all()
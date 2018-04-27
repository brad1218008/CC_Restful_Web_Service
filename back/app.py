#!/usr/bin/python
from flask import Flask, jsonify, Response
import json
import requests
import urllib
import json
import xml.etree.ElementTree as ET
import xmltodict
import pandas
from pymongo import MongoClient
from datetime import datetime
import sys
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient('localhost',27017) 
db = client['CC']
coll = db['salary']

many_docs = coll.find()
for doc in many_docs:
	salary = doc

salary =  dumps(salary)
salary = salary.decode('unicode-escape')

db = client['CC']
coll = db['born']

born = '['

many_docs = coll.find()
for doc in many_docs:
	temp = doc
	temp = dumps(temp)
	born += temp.decode('unicode-escape')
	born += ','
	
born = born[:-1]
born += ']'

db = client['CC']
coll = db['dead']

dead = '['

hoeffding1 = open("json/hoeffding1.json").read()
hoeffding2 = open("json/hoeffding2.json").read()
mann = open("json/mann.json").read()
mcnemar = open("json/mcnemar.json").read()

many_docs = coll.find()
for doc in many_docs:
	temp = doc
	temp = dumps(temp)
	dead += temp.decode('unicode-escape')
	dead += ','
	
dead = dead[:-1]
dead += ']'

@app.route('/', methods=['GET'])
def get_tasks():
	global salary
	resp = Response(salary)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/people', methods=['GET'])
def get_people():
	global born
	resp = Response(born)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/nopeople', methods=['GET'])
def get_nopeople():
	global dead
	resp = Response(dead)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/hoeffding1', methods=['GET'])
def get_hoeffding1():
	global hoeffding1
	resp = Response(hoeffding1)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/hoeffding2', methods=['GET'])
def get_hoeffding2():
	global hoeffding2
	resp = Response(hoeffding2)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/mann', methods=['GET'])
def get_mann():
	global mann
	resp = Response(mann)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/mcnemar', methods=['GET'])
def get_mcnemar():
	global mcnemar
	resp = Response(mcnemar)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

if __name__ == '__main__':
	
    app.run(host='0.0.0.0', debug=True)

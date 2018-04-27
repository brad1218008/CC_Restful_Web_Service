from pymongo import MongoClient
from datetime import datetime
import sys
import requests
import urllib
import json
import xml.etree.ElementTree as ET
import xmltodict
import pandas
from lxml import etree
from bson.json_util import dumps

bornTables = pandas.read_html("http://statis.moi.gov.tw/micst/stmain.jsp?sys=220&ym=8700&ymt=10500&kind=21&type=1&funid=c0120101&cycle=4&outmode=0&compmode=0&outkind=1&fld4=1&codspc0=0,2,3,2,6,1,9,1,12,1,15,15,&rdm=ceppbtql")

bornTable = bornTables[1]

deadTables = pandas.read_html("http://statis.moi.gov.tw/micst/stmain.jsp?sys=220&ym=8700&ymt=10500&kind=21&type=1&funid=c0120201&cycle=4&outmode=0&compmode=0&outkind=1&fld4=1&codspc0=0,2,3,2,6,1,9,1,12,1,15,14,&rdm=hf6pfAlV")

deadTable = deadTables[1]

res = urllib.urlopen("https://www.dgbas.gov.tw/public/data/open/localstat/009-%A6U%BF%A4%A5%AB%A7O%A5%AD%A7%A1%A8C%A4%E1%A9%D2%B1o%A6%AC%A4J%C1%60%ADp.xml")

sa = res.read()
o = xmltodict.parse(sa)
salary =  json.dumps(o)
salary = salary.decode('unicode-escape')


if __name__ == '__main__':
	client = MongoClient('localhost',27017) 
	db = client['CC']
	coll = db['test']

	data = ''
	for i in range(1998,2017):
		data += '{"Year":"'+str(i)+'"'
		for j in range(1,22):
			data += ',"'+bornTable[j][1]+'":"'+bornTable[j][i-1996]+'"'
		data += '}'
		coll.insert_one(json.loads(data))  
		data = ''
		
	db = client['CC']
	coll = db['dead']
	
	data = ''
	for i in range(1998,2017):
		data += '{"Year":"'+str(i)+'"'
		for j in range(1,22):
			data += ',"'+deadTable[j][1]+'":"'+deadTable[j][i-1996]+'"'
		data += '}'
		coll.insert_one(json.loads(data))
		data = ''
	
	db = client['CC']
	coll = db['salary']
	
	coll.insert_one(json.loads(salary))

	born = '['
	many_docs = coll.find()
	for doc in many_docs:
		temp = doc
		temp = dumps(temp)
		born += temp.decode('unicode-escape')
	born += ']'
	print born

	
#	many_docs = coll.find()
#	for doc in many_docs:
#		salary = doc
#	
#	from bson.json_util import dumps
#	
#	salary =  dumps(salary)
#	salary = salary.decode('unicode-escape')
#	
#	print salary
		
	
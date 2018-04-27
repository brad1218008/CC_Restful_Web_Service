import requests
import urllib
import json
import xml.etree.ElementTree as ET
import xmltodict
import pandas
from lxml import etree

#res = urllib.urlopen("https://www.dgbas.gov.tw/public/data/open/localstat/009-%A6U%BF%A4%A5%AB%A7O%A5%AD%A7%A1%A8C%A4%E1%A9%D2%B1o%A6%AC%A4J%C1%60%ADp.xml")
#
#sa = res.read()
#
##root = ET.fromstring(sa)
#
#o = xmltodict.parse(sa)
#print json.dumps(o)


tables = pandas.read_html("http://statis.moi.gov.tw/micst/stmain.jsp?sys=220&ym=8700&ymt=10500&kind=21&type=1&funid=c0120101&cycle=4&outmode=0&compmode=0&outkind=1&fld0=1&codspc0=1,1,3,2,6,1,9,1,12,1,15,15,&rdm=eije5aq4")

dataTable = tables[1]

data = '['

for i in range(1998,2017):
	data += '{"Year":"'+str(i)+'"'
	for j in range(1,22):
		data += ',"'+dataTable[j][1]+'":"'+dataTable[j][i-1996]+'"'
	data += '},'

data = data[:-1]
data += ']'

g = json.loads(data)

g = json.dumps(g)
g = g.decode('unicode-escape')

print g
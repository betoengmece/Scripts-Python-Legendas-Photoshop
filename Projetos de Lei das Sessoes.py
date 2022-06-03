

import re
import requests
import pandas
from bs4 import BeautifulSoup
from datetime import datetime
import json
#import win32com.client
 

print("tentando funcionar")

r= requests.get("http://www1.cml.pr.gov.br/cml/site/pautapri.xhtml")
c=r.content
soup=BeautifulSoup(c,"html.parser")
all = soup.find_all("div",{"class":"titulo_pagina"})
l=[]
l2=[]
for item in all:
    a=item.text.replace("\n","")
    a = a.replace("  ","")

    l.append(a)




a



lista = []

for i in range(len(l)):
    lista.append({})
    lista[i]["id"] = i
    lista[i]["title"] = l[i]


lista



s = json.dumps(lista,ensure_ascii=True)

#python "C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/SCRIPT/Projetos de Lei das Reunioes.py
with open("C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/SCRIPT/lessons.json","w") as f:
    f.write(s)


print("terminou execucao")
#psApp = win32com.client.Dispatch("Photoshop.Application")


#psApp.Open(r"C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/Legenda em lote.psd")


#psApp.Open(r"C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/SCRIPT/Gerar_legendas_em_lote.jsx")


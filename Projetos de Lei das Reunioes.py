

import re
#import requests
import pandas
from bs4 import BeautifulSoup
from datetime import datetime
import json
#import win32com.client
 


#r= requests.get("http://www1.cml.pr.gov.br/cml/site/pautapri.xhtml")
#r = open("Câmara Municipal de Londrina.html")
r = open("C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/SCRIPT/Câmara Municipal de Londrina.html")
print("tentando funcionar")
#c=r.content
soup=BeautifulSoup(r,"html.parser")
all = soup.find_all("div",{"class":"titulo_pagina"})
l=[]
l2=[]
for item in all:
    a=item.text.replace("\n","")
    a = a.replace("  ","")
    a = a.replace('PL','Projeto de Lei nº ')
    a = a.replace('PR','Projeto de Resolução nº ')
    a = a.replace('MC','Matéria de Contas nº ')
    a = a.replace('PE','Projeto de Emenda nº ')
    a = a[:-4] + '/' + a[-4:]
    b = list(a)
    del b[-10:-8]
    a =''.join(b)
    
    
    

    l.append(a)




a



lista = []

for i in range(len(l)):
    lista.append({})
    lista[i]["id"] = i
    lista[i]["title"] = l[i]


lista



s = json.dumps(lista,ensure_ascii=True)


with open("C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/SCRIPT/Projetos reunioes.json","w") as f:
    f.write(s)

r.close()

#psApp = win32com.client.Dispatch("Photoshop.Application")


#psApp.Open(r"C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/Legenda em lote.psd")


#psApp.Open(r"C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/SCRIPT/Gerar_legendas_em_lote.jsx")


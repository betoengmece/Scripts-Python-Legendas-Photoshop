
import re
import requests
from bs4 import BeautifulSoup
import pandas

from datetime import date

data_atual = date.today()
data_em_texto = data_atual.strftime("%d/%m/%Y")
data_em_texto2 = data_atual.strftime("%d-%m-%Y")

# In[203]:


r= requests.get("http://www1.cml.pr.gov.br/cml/site/reuniaocomissao.xhtml",verify = False)
c = r.content
soup=BeautifulSoup(c,"lxml")


# In[204]:


lista =[]
for paragrafo in soup.find_all("p",{"class":"corpo_noticia"}):
    lista.append(paragrafo.text.replace("\n",""))


# In[226]:


l=[]
palavras_chave=["Política Urbana","Seguridade Social","Educação",
                "Direitos Humanos","Justiça","Administração","Desenvolvimento Econômico",
                "Segurança Pública","Bem Estar Animal", "Finanças e Orçamento",
                "Adolescente","Doação de Bens Públicos","Direitos da Mulher", "Mesa Executiva", "Acessibilidade"]

for reuniao in lista:
    acumula = []
    if re.search("Conjunto",reuniao,re.IGNORECASE): #testa se é uma reuniao em conjunto
        for index in palavras_chave:                #verifica que reuniao é usando as palavras - chave

            valor = re.search(index,reuniao,re.IGNORECASE)
            if valor != None and index != "Adolescente": 
                acumula.append(index)
            elif valor != None and index == "Adolescente":
                acumula.append("Criança e Adolescente")
                
        if len(acumula) == 2:
            l.append("  ")
            l.append("Reunião Ordinária em Conjunto({}/{}) - {}".format(acumula[0],acumula[1],data_em_texto))
            
        elif len(acumula) == 3:
            l.append("  ")
            l.append("Reunião Ordinária em Conjunto({}/{}/{}) - {}".format(acumula[0],acumula[1],acumula[2],data_em_texto))
            
        else:
            l.append("ERRROOOOOO, mtas reuniao juntas em conjunto teste {}".format(acumula))
    else:
        formatando = reuniao[27:30] + " Reunião Ordinária da "+ reuniao[30:].replace("  ","") + " - " + data_em_texto
        l.append("  ")
        l.append(formatando)
        


# In[227]:


df = pandas.DataFrame(l)
l


# In[217]:
nome = "formatado - {}.txt".format(data_em_texto2)

df.to_csv(nome , index = False, encoding='utf-8',header = False)


# In[218]:


df


# In[220]:


len(acumula)


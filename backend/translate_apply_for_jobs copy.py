import os
from googleapiclient.discovery import build
from config import translate_api
from bs4 import BeautifulSoup
import json

# Set up translation client
translate_client = build("translate", "v2", developerKey=translate_api)


# Set up paths
blog_name_en = "apply-for-jobs"
blog_name_new = "apply-for-jobs"
en_path = f"public/{blog_name_en}.html"
new_lang="ar"
new_path = f"public/{new_lang}/{blog_name_new}.html"

# Read in HTML content
with open(en_path, "r" , encoding="utf8") as f:
    soup = BeautifulSoup(f, 'html.parser')

# Load the JSON file
with open('backend/apply-for-jobs.json') as f:
    data = json.load(f)

# Find all anchor elements with ids link_1, link_2, etc.
for i in range(1, 10):
    anchor_id = 'link_' + str(i)
    anchor = soup.find('a', {'id': anchor_id})

    # If the anchor element exists, replace its href with the first item in the JSON array
    if anchor:
        anchor['href'] = data[new_lang][i-1]

# Translate the text content
for element in soup.find_all(["h1", "h2", "span", "p", "a"]):
    element_content = element.get_text()
    translation = translate_client.translations().list(
        q=element_content, target=new_lang
    ).execute()
    translated_text = translation["translations"][0]["translatedText"]
    element.string = translated_text

# Translate the image alt text
for element in soup.find_all("img"):
    if element.has_attr("alt"):
        element_content = element["alt"]
        translation = translate_client.translations().list(
            q=element_content, target=new_lang
        ).execute()
        translated_text = translation["translations"][0]["translatedText"]
        element["alt"] = translated_text

# Translate the title element
title_element = soup.find("title")
title_content = title_element.get_text()
translation = translate_client.translations().list(
    q=title_content, target=new_lang
).execute()
translated_text = translation["translations"][0]["translatedText"]
title_element.string = translated_text

# Translate the meta description
meta_element = soup.find("meta", attrs={"name": "description"})
if meta_element is not None:
    meta_content = meta_element["content"]
    translation = translate_client.translations().list(
        q=meta_content, target=new_lang
    ).execute()
    translated_text = translation["translations"][0]["translatedText"]
    meta_element["content"] = translated_text

html_content = soup.prettify()
print(html_content)
# Write the translated HTML content to a new file
with open(new_path, "w", encoding="utf8") as f:
    f.write(html_content)